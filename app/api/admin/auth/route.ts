import { NextResponse } from "next/server";
import {
    getStoredPassword,
    saveStoredPassword,
    isValidAdminPassword,
    setAdminSession,
    clearAdminSession,
    isAdminRequest,
} from "@/lib/admin-auth";

export async function GET(request: Request) {
    return NextResponse.json({ authenticated: await isAdminRequest(request) }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE() {
    return clearAdminSession(NextResponse.json({ success: true }));
}

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        // Check if entered password matches master password or default fallbacks
        if (!isValidAdminPassword(password, await getStoredPassword())) {
            return NextResponse.json(
                { success: false, error: "Incorrect administrator password" },
                { status: 401 }
            );
        }

        return setAdminSession(
            NextResponse.json({ success: true, message: "Authentication successful" }),
            request
        );
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

        // Verify current password
        if (!isValidAdminPassword(currentPassword, await getStoredPassword())) {
            return NextResponse.json(
                { success: false, error: "Current password is incorrect" },
                { status: 401 }
            );
        }

        // ADMIN_PASSWORD always wins in getStoredPassword, so a stored change would silently do nothing
        if (process.env.ADMIN_PASSWORD?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "This password is set by the ADMIN_PASSWORD environment variable on the server. Change it in Coolify (Environment Variables) and redeploy.",
                },
                { status: 409 }
            );
        }

        // Update stored password into cloud/file
        const saved = await saveStoredPassword(newPassword);
        if (!saved) {
            return NextResponse.json({ error: "Failed to persist new password" }, { status: 500 });
        }

        // Re-issue the session: the old cookie was signed with the previous password
        return setAdminSession(
            NextResponse.json({ success: true, message: "Administrator password updated securely" }),
            request
        );
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
}
