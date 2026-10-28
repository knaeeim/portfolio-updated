import fs from "fs";
import path from "path";
import { cache } from "react";
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

export const getPortfolioData = cache(async function getPortfolioData(): Promise<any> {
    // 1. If MongoDB is configured, fetch live cloud data
    if (isMongoConfigured()) {
        try {
            const db = await getMongoDb();
            if (db) {
                const doc = await db.collection("content").findOne({ _id: "portfolio_main" as any });
                if (doc) {
                    const { _id, updatedAt, ...cleanDoc } = doc as any;
                    const localData = getLocalFilePortfolioData();

                    // Reconcile MongoDB projects with local projects
                    const localProjects: any[] = localData?.projects || [];
                    const dbProjects: any[] = Array.isArray(cleanDoc?.projects) ? cleanDoc.projects : [];

                    let userProjects: any[] = [];
                    if (dbProjects.length === 0) {
                        userProjects = localProjects;
                    } else {
                        const dbProjectIds = new Set(dbProjects.map((p: any) => p.id));
                        const updatedDbProjects = dbProjects.map((p: any) => {
                            const localMatch = localProjects.find((lp: any) => lp.id === p.id);
                            if (!localMatch) return p;
                            if (p.id === "shankhapushpi-ecommerce" || p.id === "devojyoti-dutta") {
                                return {
                                    ...p,
                                    ...localMatch,
                                    liveLink: p.liveLink || localMatch.liveLink,
                                    adminLink: p.adminLink || localMatch.adminLink,
                                };
                            }
                            return {
                                ...localMatch,
                                ...p,
                            };
                        });

                        // Add any missing local projects (e.g. shankhapushpi-ecommerce at the front)
                        for (const lp of localProjects) {
                            if (!dbProjectIds.has(lp.id)) {
                                if (lp.isFlagship) {
                                    updatedDbProjects.unshift(lp);
                                } else {
                                    updatedDbProjects.push(lp);
                                }
                            }
                        }
                        userProjects = updatedDbProjects;

                        // Asynchronously persist new flagship projects to MongoDB Atlas
                        if (!dbProjectIds.has("shankhapushpi-ecommerce")) {
                            db.collection("content").updateOne(
                                { _id: "portfolio_main" as any },
                                { $set: { projects: userProjects, updatedAt: new Date() } }
                            ).catch((syncErr) => console.error("Auto-syncing projects to MongoDB failed:", syncErr));
                        }
                    }

                    const mergedDoc = {
                        ...(localData || {}),
                        ...cleanDoc,
                        general: { ...(localData?.general || {}), ...(cleanDoc?.general || {}) },
                        hero: { ...(localData?.hero || {}), ...(cleanDoc?.hero || {}) },
                        research: {
                            ...(localData?.research || {}),
                            ...(cleanDoc?.research || {}),
                            pillars: Array.isArray(cleanDoc?.research?.pillars) && cleanDoc.research.pillars.length > 0
                                ? cleanDoc.research.pillars
                                : (localData?.research?.pillars || []),
                            architectureSteps: Array.isArray(cleanDoc?.research?.architectureSteps) && cleanDoc.research.architectureSteps.length > 0
                                ? cleanDoc.research.architectureSteps
                                : (localData?.research?.architectureSteps || []),
                            techStack: Array.isArray(cleanDoc?.research?.techStack) && cleanDoc.research.techStack.length > 0
                                ? cleanDoc.research.techStack
                                : (localData?.research?.techStack || []),
                            metrics: Array.isArray(cleanDoc?.research?.metrics) && cleanDoc.research.metrics.length > 0
                                ? cleanDoc.research.metrics
                                : (localData?.research?.metrics || []),
                        },
                        about: {
                            ...(localData?.about || {}),
                            ...(cleanDoc?.about || {}),
                            pillars: Array.isArray(cleanDoc?.about?.pillars) && cleanDoc.about.pillars.length > 0
                                ? cleanDoc.about.pillars
                                : (localData?.about?.pillars || []),
                            timeline: Array.isArray(cleanDoc?.about?.timeline) && cleanDoc.about.timeline.length > 0
                                ? cleanDoc.about.timeline
                                : (localData?.about?.timeline || []),
                        },
                        education: {
                            ...(localData?.education || {}),
                            ...(cleanDoc?.education || {}),
                            degrees: Array.isArray(cleanDoc?.education?.degrees) && cleanDoc.education.degrees.length > 0
                                ? cleanDoc.education.degrees
                                : (Array.isArray(localData?.education?.degrees) ? localData.education.degrees : undefined),
                            courses: Array.isArray(cleanDoc?.education?.courses) && cleanDoc.education.courses.length > 0
                                ? cleanDoc.education.courses
                                : (localData?.education?.courses || []),
                        },
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
});

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
