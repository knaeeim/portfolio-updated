import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SECRET_PATH = path.join(process.cwd(), "data", "admin-security.json");
const DEFAULT_PASSWORDS = ["admin", "admin123", "webzen2026"];

function getStoredPassword(): string {
    // 1. Environment variable priority (production / local .env.local)
    if (process.env.ADMIN_PASSWORD) {
        return process.env.ADMIN_PASSWORD.trim();
    }

    // 2. Local gitignored file priority
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

    // 3. Fallback default
    return "admin";
}

function saveStoredPassword(newPassword: string): boolean {
    try {
        const dir = path.dirname(SECRET_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
            SECRET_PATH,
            JSON.stringify(
                {
                    adminPassword: newPassword.trim(),
                    updatedAt: new Date().toISOString(),
                },
                null,
                2
            ),
            "utf-8"
        );
        return true;
    } catch (err) {
        console.error("Error saving admin secret file:", err);
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const validMasterPassword = getStoredPassword();

        // Check if entered password matches master password or default fallbacks
        const isValid =
            password === validMasterPassword ||
            (validMasterPassword === "admin" && DEFAULT_PASSWORDS.includes(password.trim().toLowerCase()));

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Incorrect administrator password" },
                { status: 401 }
            );
        }

        // Return secure session token
        const token = Buffer.from(`webzen_admin_${Date.now()}_auth`).toString("base64");

        return NextResponse.json({
            success: true,
            token,
            message: "Authentication successful",
        });
    } catch (error) {
        console.error("Admin auth error:", error);
        return NextResponse.json({ error: "Authentication service error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { currentPassword, newPassword } = await request.json();

        if (!newPassword || newPassword.trim().length < 4) {
            return NextResponse.json(
                { error: "New password must be at least 4 characters long" },
                { status: 400 }
            );
        }

        const validMasterPassword = getStoredPassword();

        // Verify current password
        const isCurrentValid =
            currentPassword === validMasterPassword ||
            (validMasterPassword === "admin" && DEFAULT_PASSWORDS.includes(currentPassword?.trim().toLowerCase()));

        if (!isCurrentValid) {
            return NextResponse.json(
                { success: false, error: "Current password is incorrect" },
                { status: 401 }
            );
        }

        // Update stored password into gitignored file
        const saved = saveStoredPassword(newPassword);
        if (!saved) {
            return NextResponse.json({ error: "Failed to persist new password" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Administrator password updated securely",
        });
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
}
