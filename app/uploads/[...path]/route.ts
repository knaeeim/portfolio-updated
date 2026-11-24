import { readFile } from "fs/promises";
import path from "path";

// Next.js only serves public/ files that existed at build time; this serves images uploaded after the build.
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// SVG/HTML are deliberately absent: served inline from this origin they could run scripts.
const IMAGE_TYPES: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".avif": "image/avif",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const { path: parts } = await params;
    const filePath = path.join(UPLOAD_DIR, ...parts);
    const type = IMAGE_TYPES[path.extname(filePath).toLowerCase()];

    if (!type || !filePath.startsWith(UPLOAD_DIR + path.sep)) {
        return new Response("Not found", { status: 404 });
    }

    try {
        const data = await readFile(filePath);
        return new Response(new Uint8Array(data), {
            headers: {
                "Content-Type": type,
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}
