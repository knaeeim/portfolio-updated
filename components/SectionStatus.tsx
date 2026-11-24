"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Construction } from "lucide-react";
import { sectionForAnchor } from "@/lib/sections";

// Tells visitors who follow an old /#section link that the section is switched off, instead of silently doing nothing.
export function HiddenSectionNotice({ hiddenAnchors }: { hiddenAnchors: string[] }) {
    useEffect(() => {
        const check = () => {
            const anchor = decodeURIComponent(window.location.hash.slice(1));
            if (!anchor || !hiddenAnchors.includes(anchor)) return;
            const section = sectionForAnchor(anchor);
            toast.info(`The "${section?.label ?? anchor}" section is being updated and is temporarily unavailable.`, {
                id: "hidden-section",
                duration: 8000,
            });
        };
        // The root <Toaster> subscribes after this child effect runs, so defer the first check
        const timer = setTimeout(check, 300);
        window.addEventListener("hashchange", check);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("hashchange", check);
        };
    }, [hiddenAnchors]);

    return null;
}

export function UnderConstruction({
    title = "We're working on something new",
    message = "The portfolio is being updated right now. Everything will be live again very soon.",
    showHomeLink = false,
}: {
    title?: string;
    message?: string;
    showHomeLink?: boolean;
}) {
    return (
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4F00]/10 text-[#FF4F00] mx-auto">
                    <Construction size={28} />
                </div>
                <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
                {showHomeLink && (
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 rounded bg-foreground text-background text-xs font-bold tracking-wider hover:bg-[#FF4F00] hover:text-white transition-colors">
                        BACK TO HOMEPAGE
                    </Link>
                )}
            </div>
        </div>
    );
}
