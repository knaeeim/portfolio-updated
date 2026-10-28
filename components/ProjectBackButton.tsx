"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectBackButtonProps {
    fallbackHref?: string;
    label?: string;
    className?: string;
}

export default function ProjectBackButton({
    fallbackHref = "/#projects",
    label = "Back to Projects",
    className,
}: ProjectBackButtonProps) {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent) => {
        // Use browser in-memory history back if available for 0ms instant scroll restoration
        if (typeof window !== "undefined" && window.history.length > 1) {
            e.preventDefault();
            router.back();
        }
    };

    return (
        <Link
            href={fallbackHref}
            prefetch={true}
            onClick={handleBack}
            className={
                className ||
                "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
            }>
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-[#E64A11]" />
            <span>{label}</span>
        </Link>
    );
}
