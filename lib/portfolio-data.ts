import fs from "fs";
import path from "path";
import { getMongoDb, isMongoConfigured } from "./mongodb";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-content.json");
const TMP_PATH = path.join("/tmp", "portfolio-content.json");

// In-memory cache across serverless warm invocations
let inMemoryCache: any = null;

function getLocalFilePortfolioData(): any {
    try {
        if (fs.existsSync(TMP_PATH)) {
            const rawTmp = fs.readFileSync(TMP_PATH, "utf-8");
            return JSON.parse(rawTmp);
        }
    } catch {
        // continue
    }

    try {
        if (fs.existsSync(DATA_PATH)) {
            const raw = fs.readFileSync(DATA_PATH, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error("Error reading local portfolio data:", err);
    }

    return null;
}

export async function getPortfolioData(): Promise<any> {
    // 1. If MongoDB is configured, fetch live cloud data
    if (isMongoConfigured()) {
        try {
            const db = await getMongoDb();
            if (db) {
                const doc = await db.collection("content").findOne({ _id: "portfolio_main" as any });
                if (doc) {
                    const { _id, updatedAt, ...cleanDoc } = doc as any;
                    const localData = getLocalFilePortfolioData();
                    const mergedProjects = [...(cleanDoc?.projects || [])];
                    if (localData?.projects) {
                        for (const lp of localData.projects) {
                            if (!mergedProjects.some((p: any) => p.id === lp.id)) {
                                mergedProjects.push(lp);
                            }
                        }
                    }

                    const userProjects = cleanDoc?._hasCustomizedProjects && Array.isArray(cleanDoc.projects)
                        ? cleanDoc.projects
                        : (mergedProjects.length > 0 ? mergedProjects : (localData?.projects || []));

                    const mergedDoc = {
                        ...(localData || {}),
                        ...cleanDoc,
                        general: { ...(localData?.general || {}), ...(cleanDoc?.general || {}) },
                        hero: { ...(localData?.hero || {}), ...(cleanDoc?.hero || {}) },
                        research: { ...(localData?.research || {}), ...(cleanDoc?.research || {}) },
                        about: { ...(localData?.about || {}), ...(cleanDoc?.about || {}) },
                        education: { ...(localData?.education || {}), ...(cleanDoc?.education || {}) },
                        projects: userProjects,
                        experience: Array.isArray(cleanDoc?.experience) && cleanDoc.experience.length > 0
                            ? cleanDoc.experience
                            : (localData?.experience || []),
                        skills: Array.isArray(cleanDoc?.skills) && cleanDoc.skills.length > 0
                            ? cleanDoc.skills
                            : (localData?.skills || []),
                    };
                    inMemoryCache = mergedDoc;
                    return mergedDoc;
                }

                // If document does not exist yet, seed initial data from local JSON into MongoDB
                const initialData = getLocalFilePortfolioData();
                if (initialData) {
                    await db.collection("content").insertOne({
                        _id: "portfolio_main" as any,
                        ...initialData,
                        updatedAt: new Date(),
                    });
                    inMemoryCache = initialData;
                    return initialData;
                }
            }
        } catch (mongoErr) {
            console.error("MongoDB fetch error, falling back to cache/local:", mongoErr);
        }
    }

    // 2. In-memory priority
    if (inMemoryCache) {
        return inMemoryCache;
    }

    // 3. Fallback to local files
    const local = getLocalFilePortfolioData();
    if (local) {
        inMemoryCache = local;
        return local;
    }

    return null;
}

export async function syncToGitHubRepo(
    jsonString: string,
    token: string,
    repo: string = "knaeeim/portfolio-updated",
    filePath: string = "data/portfolio-content.json"
): Promise<{ success: boolean; error?: string }> {
    try {
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
        const headers = {
            Authorization: `Bearer ${token.trim()}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Admin-Studio",
        };

        // 1. Get current file sha
        let sha: string | undefined;
        try {
            const getRes = await fetch(apiUrl, { headers, cache: "no-store" });
            if (getRes.ok) {
                const fileInfo = await getRes.json();
                sha = fileInfo.sha;
            }
        } catch (fetchErr) {
            console.warn("Could not retrieve file SHA from GitHub:", fetchErr);
        }

        // 2. Commit file to repo
        const putRes = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "chore(data): update portfolio content via Admin Studio",
                content: Buffer.from(jsonString).toString("base64"),
                branch: "main",
                ...(sha ? { sha } : {}),
            }),
        });

        if (!putRes.ok) {
            const errJson = await putRes.json().catch(() => null);
            return {
                success: false,
                error: errJson?.message || `GitHub returned status ${putRes.status}`,
            };
        }

        return { success: true };
    } catch (err: any) {
        return { success: false, error: err?.message || "GitHub API network error" };
    }
}

export async function savePortfolioData(
    data: any,
    githubToken?: string
): Promise<{
    success: boolean;
    savedToMongo: boolean;
    persistedLocally: boolean;
    isReadOnly: boolean;
    syncedToGitHub: boolean;
    gitHubError?: string;
    error?: string;
}> {
    try {
        // Strip security credentials and temporary client fields
        const cleanData = { ...data, _hasCustomizedProjects: true };
        delete cleanData.security;
        delete cleanData._githubToken;
        delete cleanData._id;

        const jsonString = JSON.stringify(cleanData, null, 2);
        inMemoryCache = cleanData;

        let savedToMongo = false;
        let persistedLocally = false;
        let isReadOnly = false;

        // Attempt 1: If MongoDB is configured, save directly to MongoDB Atlas
        if (isMongoConfigured()) {
            try {
                const db = await getMongoDb();
                if (db) {
                    await db.collection("content").updateOne(
                        { _id: "portfolio_main" as any },
                        {
                            $set: {
                                ...cleanData,
                                updatedAt: new Date(),
                            },
                        },
                        { upsert: true }
                    );
                    savedToMongo = true;
                }
            } catch (mongoSaveErr) {
                console.error("Failed to save to MongoDB:", mongoSaveErr);
            }
        }

        // Attempt 2: Write to local disk if filesystem is writable (local development)
        try {
            const dir = path.dirname(DATA_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(DATA_PATH, jsonString, "utf-8");
            persistedLocally = true;
        } catch (err: any) {
            // EROFS on Vercel / AWS Lambda
            isReadOnly = true;
            try {
                fs.writeFileSync(TMP_PATH, jsonString, "utf-8");
            } catch (tmpErr) {
                console.error("Error writing to /tmp:", tmpErr);
            }
        }

        // Attempt 3: If GitHub Token provided, commit to GitHub as well
        const activeToken = githubToken?.trim() || process.env.GITHUB_TOKEN?.trim();
        let syncedToGitHub = false;
        let gitHubError: string | undefined;

        if (activeToken) {
            const ghRes = await syncToGitHubRepo(jsonString, activeToken);
            syncedToGitHub = ghRes.success;
            if (!ghRes.success) {
                gitHubError = ghRes.error;
            }
        }

        return {
            success: true,
            savedToMongo,
            persistedLocally,
            isReadOnly,
            syncedToGitHub,
            gitHubError,
        };
    } catch (err: any) {
        console.error("Critical error in savePortfolioData:", err);
        return {
            success: false,
            savedToMongo: false,
            persistedLocally: false,
            isReadOnly: false,
            syncedToGitHub: false,
            error: err?.message || "Failed to save portfolio data",
        };
    }
}
