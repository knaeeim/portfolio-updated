import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPortfolioData, savePortfolioData, clearPortfolioCache } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        clearPortfolioCache();
        const data = await getPortfolioData();
        if (!data) {
            return NextResponse.json({ error: "No portfolio data found" }, { status: 404 });
        }
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
                "CDN-Cache-Control": "no-store",
                "Vercel-CDN-Cache-Control": "no-store",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        if (!payload) {
            return NextResponse.json({ error: "Payload missing" }, { status: 400 });
        }

        // Support githubToken passed in header or payload
        const headerToken = request.headers.get("x-github-token");
        const bodyToken = payload._githubToken;
        const githubToken = headerToken || bodyToken;

        const result = await savePortfolioData(payload, githubToken);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Failed to persist portfolio data" },
                { status: 500 }
            );
        }

        // Clear in-memory server cache and purge Next.js route caches across the entire site
        clearPortfolioCache();
        try {
            revalidatePath("/", "layout");
            revalidatePath("/");
            revalidatePath("/projects/[id]", "layout");
        } catch (revErr) {
            console.warn("revalidatePath error:", revErr);
        }

        let userMessage = "Portfolio successfully updated and saved!";
        if (result.savedToMongo) {
            userMessage = "Portfolio saved to MongoDB Atlas! Live site is instantly updated without any rebuild.";
        } else if (result.syncedToGitHub) {
            userMessage = "Portfolio saved and committed to GitHub! Vercel is now deploying your changes live.";
        } else if (result.isReadOnly) {
            userMessage = "Saved to runtime memory! (Add MONGODB_URI to Vercel for instant cloud persistence).";
        }

        return NextResponse.json({
            message: userMessage,
            data: payload,
            persistedLocally: result.persistedLocally,
            isReadOnly: result.isReadOnly,
            syncedToGitHub: result.syncedToGitHub,
            gitHubError: result.gitHubError,
        });
    } catch (error: any) {
        console.error("POST /api/portfolio error:", error);
        return NextResponse.json(
            { error: error?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
