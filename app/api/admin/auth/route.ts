import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data";

const DEFAULT_PASSWORDS = ["admin", "admin123", "webzen2026"];

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const data = getPortfolioData() || {};
        const storedPassword = data.security?.adminPassword;

        // Check if password matches stored password, env variable, or defaults
        const isValid =
            (storedPassword && password === storedPassword) ||
            (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) ||
            (!storedPassword && DEFAULT_PASSWORDS.includes(password.trim().toLowerCase()));

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Incorrect administrator password" },
                { status: 401 }
            );
        }

        // Return secure session token
        const token = Buffer.from(`webzen_admin_${Date.now()}_${password}`).toString("base64");

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

        const data = getPortfolioData() || {};
        const storedPassword = data.security?.adminPassword;

        // Verify current password
        const isCurrentValid =
            (storedPassword && currentPassword === storedPassword) ||
            (!storedPassword && DEFAULT_PASSWORDS.includes(currentPassword?.trim().toLowerCase()));

        if (!isCurrentValid) {
            return NextResponse.json(
                { success: false, error: "Current password is incorrect" },
                { status: 401 }
            );
        }

        // Update stored password
        if (!data.security) {
            data.security = {};
        }
        data.security.adminPassword = newPassword.trim();

        const saved = savePortfolioData(data);
        if (!saved) {
            return NextResponse.json({ error: "Failed to persist new password" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Administrator password updated successfully",
        });
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
}
