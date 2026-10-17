import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize and ensure unique filename
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);

        const publicUrl = `/uploads/${filename}`;
        return NextResponse.json({
            message: "File uploaded successfully",
            url: publicUrl,
            filename: filename,
            size: file.size,
        });
    } catch (error) {
        console.error("Upload handler error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
