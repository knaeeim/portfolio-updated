import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-content.json");
const TMP_PATH = path.join("/tmp", "portfolio-content.json");

// In-memory cache across serverless warm invocations
let inMemoryCache: any = null;

export function getPortfolioData() {
    // 1. In-memory priority
    if (inMemoryCache) {
        return inMemoryCache;
    }

    // 2. /tmp priority (for Vercel serverless where DATA_PATH is read-only)
    try {
        if (fs.existsSync(TMP_PATH)) {
            const rawTmp = fs.readFileSync(TMP_PATH, "utf-8");
            inMemoryCache = JSON.parse(rawTmp);
            return inMemoryCache;
        }
    } catch {
        // Fall through to DATA_PATH
    }

    // 3. Main filesystem file
    try {
        if (fs.existsSync(DATA_PATH)) {
            const raw = fs.readFileSync(DATA_PATH, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error("Error reading portfolio data:", err);
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
    persistedLocally: boolean;
    isReadOnly: boolean;
    syncedToGitHub: boolean;
    gitHubError?: string;
    error?: string;
}> {
    try {
        // Strip security credentials and temporary client fields
        const cleanData = { ...data };
        delete cleanData.security;
        delete cleanData._githubToken;

        const jsonString = JSON.stringify(cleanData, null, 2);
        inMemoryCache = cleanData;

        let persistedLocally = false;
        let isReadOnly = false;

        // Attempt 1: Write to local git repo (works locally in development)
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

        // Attempt 2: If GitHub Token provided (env or param), sync to GitHub to trigger Vercel deploy
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
            persistedLocally,
            isReadOnly,
            syncedToGitHub,
            gitHubError,
        };
    } catch (err: any) {
        console.error("Critical error in savePortfolioData:", err);
        return {
            success: false,
            persistedLocally: false,
            isReadOnly: false,
            syncedToGitHub: false,
            error: err?.message || "Failed to save portfolio data",
        };
    }
}
