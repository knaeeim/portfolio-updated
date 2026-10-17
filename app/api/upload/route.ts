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

        let publicUrl = "";

        // Attempt local disk write (works in local development)
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, buffer);
            publicUrl = `/uploads/${filename}`;
        } catch (fsErr: any) {
            // EROFS on Vercel / serverless: fallback to base64 Data URL so upload never fails
            const mimeType = file.type || "image/png";
            publicUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
        }

        return NextResponse.json({
            message: "File uploaded successfully",
            url: publicUrl,
            filename: filename,
            size: file.size,
        });
    } catch (error: any) {
        console.error("Upload handler error:", error);
        return NextResponse.json({ error: error?.message || "Failed to upload file" }, { status: 500 });
    }
}
