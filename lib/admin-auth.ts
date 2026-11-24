import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

const SECRET_PATH = path.join(process.cwd(), "data", "admin-security.json");
const TMP_SECRET_PATH = path.join("/tmp", "admin-security.json");
export const DEFAULT_PASSWORDS = ["admin", "admin123", "webzen2026"];

let inMemoryPassword: string | null = null;

export async function getStoredPassword(): Promise<string> {
    // 1. Environment variable priority (production / local .env.local)
    if (process.env.ADMIN_PASSWORD) {
        return process.env.ADMIN_PASSWORD.trim();
    }

    // 2. In-memory runtime priority
    if (inMemoryPassword) {
        return inMemoryPassword;
    }

    // 3. MongoDB priority if configured
    if (isMongoConfigured()) {
        try {
            const db = await getMongoDb();
            if (db) {
                const doc = await db.collection("auth").findOne({ _id: "admin_password" as any });
                if (doc?.adminPassword) {
                    const pass = (doc.adminPassword as string).trim();
                    inMemoryPassword = pass;
                    return pass;
                }
            }
        } catch (mongoErr) {
            console.error("MongoDB auth read error:", mongoErr);
        }
    }

    // 4. /tmp fallback priority
    try {
        if (fs.existsSync(TMP_SECRET_PATH)) {
            const raw = fs.readFileSync(TMP_SECRET_PATH, "utf-8");
            const data = JSON.parse(raw);
            if (data?.adminPassword) {
                const pass = data.adminPassword.trim();
                inMemoryPassword = pass;
                return pass;
            }
        }
    } catch {
        // continue
    }

    // 5. Local gitignored file priority
    try {
        if (fs.existsSync(SECRET_PATH)) {
            const raw = fs.readFileSync(SECRET_PATH, "utf-8");
            const data = JSON.parse(raw);
            if (data?.adminPassword) {
                return data.adminPassword.trim();
            }
        }
    } catch (err) {
        console.error("Error reading admin secret file:", err);
    }

    // 6. Fallback default
    return "admin";
}

export async function saveStoredPassword(newPassword: string): Promise<boolean> {
    const trimmed = newPassword.trim();
    inMemoryPassword = trimmed;

    // 1. If MongoDB configured, save to cloud
    if (isMongoConfigured()) {
        try {
            const db = await getMongoDb();
            if (db) {
                await db.collection("auth").updateOne(
                    { _id: "admin_password" as any },
                    {
                        $set: {
                            adminPassword: trimmed,
                            updatedAt: new Date(),
                        },
                    },
                    { upsert: true }
                );
            }
        } catch (mongoErr) {
            console.error("MongoDB auth write error:", mongoErr);
        }
    }

    // 2. Local disk write
    try {
        const dir = path.dirname(SECRET_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
            SECRET_PATH,
            JSON.stringify(
                {
                    adminPassword: trimmed,
                    updatedAt: new Date().toISOString(),
                },
                null,
                2
            ),
            "utf-8"
        );
        return true;
    } catch (err) {
        // Fallback for Vercel / read-only filesystem
        try {
            fs.writeFileSync(
                TMP_SECRET_PATH,
                JSON.stringify(
                    {
                        adminPassword: trimmed,
                        updatedAt: new Date().toISOString(),
                    },
                    null,
                    2
                ),
                "utf-8"
            );
            return true;
        } catch (tmpErr) {
            console.error("Error saving to /tmp secret:", tmpErr);
            return true; // inMemoryPassword is already set, so runtime succeeds
        }
    }
}

export function isValidAdminPassword(input: string | undefined, stored: string): boolean {
    if (!input) return false;
    return input === stored || (stored === "admin" && DEFAULT_PASSWORDS.includes(input.trim().toLowerCase()));
}

// Signed, httpOnly session cookie. Keyed on the current admin password, so changing it logs out every session.
const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function sign(expires: string, password: string): string {
    return createHmac("sha256", `admin-session:${password}`).update(expires).digest("hex");
}

export async function setAdminSession(response: NextResponse, request: Request): Promise<NextResponse> {
    const expires = String(Date.now() + SESSION_TTL_MS);
    const secure = new URL(request.url).protocol === "https:" || request.headers.get("x-forwarded-proto") === "https";
    response.cookies.set(SESSION_COOKIE, `${expires}.${sign(expires, await getStoredPassword())}`, {
        httpOnly: true,
        sameSite: "strict",
        secure,
        path: "/",
        maxAge: SESSION_TTL_MS / 1000,
    });
    return response;
}

export function clearAdminSession(response: NextResponse): NextResponse {
    response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
    return response;
}

export async function isAdminRequest(request: Request): Promise<boolean> {
    const cookie = request.headers
        .get("cookie")
        ?.split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
        ?.slice(SESSION_COOKIE.length + 1);
    if (!cookie) return false;

    const [expires, signature] = cookie.split(".");
    if (!expires || !signature || Number(expires) < Date.now()) return false;

    const expected = Buffer.from(sign(expires, await getStoredPassword()), "hex");
    const given = Buffer.from(signature, "hex");
    return given.length === expected.length && timingSafeEqual(given, expected);
}

export function unauthorized(): NextResponse {
    return NextResponse.json({ error: "Unauthorized. Please log in to the admin dashboard again." }, { status: 401 });
}
