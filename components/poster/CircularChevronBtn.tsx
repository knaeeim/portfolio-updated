"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircularChevronBtnProps {
    onClick?: () => void;
    href?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    label?: string;
}

export const CircularChevronBtn = ({
    onClick,
    href,
    className = "",
    size = "md",
    label,
}: CircularChevronBtnProps) => {
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
    }[size];

    const icon = (
        <span
            className={`${sizeClasses} rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E64A11] group-hover:border-[#E64A11] group-hover:text-white shadow-xs`}>
            <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                />
            </svg>
        </span>
    );

    if (href) {
        return (
            <a
                href={href}
                className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
                {label && (
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 group-hover:text-[#E64A11] transition-colors">
                        {label}
                    </span>
                )}
                {icon}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
            {label && (
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 group-hover:text-[#E64A11] transition-colors">
                    {label}
                </span>
            )}
            {icon}
        </button>
    );
};

export default CircularChevronBtn;
