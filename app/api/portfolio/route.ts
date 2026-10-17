import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const data = getPortfolioData();
        if (!data) {
            return NextResponse.json({ error: "No portfolio data found" }, { status: 404 });
        }
        return NextResponse.json(data);
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

        const success = savePortfolioData(payload);
        if (!success) {
            return NextResponse.json({ error: "Failed to persist portfolio data" }, { status: 500 });
        }

        return NextResponse.json({ message: "Portfolio successfully updated", data: payload });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
