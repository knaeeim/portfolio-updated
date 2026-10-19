"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";

interface AboutMeProps {
    data?: any;
}

const strategicPillars = [
    {
        title: "Full-Stack Architecture",
        desc: "Scalable web apps, type-safe backends, and sub-40ms edge performance.",
        tag: "ENGINEERING",
    },
    {
        title: "Engineering Mentorship",
        desc: "Trained 100+ polytechnic engineers in production React & Next.js systems.",
        tag: "LEADERSHIP",
    },
    {
        title: "Algorithmic Rigor",
        desc: "600+ problems solved across LeetCode & Codeforces with optimal complexity.",
        tag: "ALGORITHMS",
    },
    {
        title: "Venture Delivery",
        desc: "Turnkey production software, clinical automation, and client portals.",
        tag: "EXECUTION",
    },
];

const leadershipTimeline = [
    {
        year: "2023",
        role: "Algorithms & Foundations",
        desc: "Core C/C++, advanced Data Structures, and 600+ competitive programming challenges.",
        badge: "ALGORITHMS",
    },
    {
        year: "2024",
        role: "Full-Stack Engineering",
        desc: "Next.js, TypeScript, PostgreSQL/Prisma, and distributed web architectures.",
        badge: "SYSTEMS",
    },
    {
        year: "2025",
        role: "Instructor @ BD Calling",
        desc: "Mentored 100+ polytechnic students in React, Next.js, and debugging.",
        badge: "MENTORSHIP",
    },
    {
        year: "2026",
        role: "Founder & CEO @ WebZen",
        desc: "Architecting high-stakes platforms, healthcare portals, and high-uptime systems.",
        badge: "VENTURE",
    },
];

export const AboutMe = ({ data }: AboutMeProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    return (
        <section
            id="about"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-pitch-black text-white relative overflow-hidden border-b border-[#222220] py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span>00. EXECUTIVE DOSSIER</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    LEADERSHIP &amp; PHILOSOPHY
                </div>
                <div className="flex items-center gap-2">
                    <span>FOUNDER &amp; CEO</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[24vw] text-[#121212] whitespace-nowrap">
                    DOSSIER // 00
                </span>
            </motion.div>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 lg:py-12 z-20 relative space-y-12">
                
                {/* Heading */}
                <div className="space-y-2 max-w-2xl">
                    <span className="font-light text-neutral-300 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                        // BACKGROUND &amp; CAPABILITIES
                    </span>
                    <h2 className="editorial-display text-4xl sm:text-6xl text-white">
                        TECHNICAL RIGOR &amp; <span className="text-[#E64A11]">STRATEGY</span>
                    </h2>
                </div>

                {/* 4 Strategic Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {strategicPillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-xs border border-neutral-800 bg-[#0E0E0E]/90 space-y-3 hover:border-[#E64A11] transition-colors group">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-[#E64A11] font-bold">PILLAR 0{idx + 1}</span>
                                <span className="text-neutral-500 uppercase">{pillar.tag}</span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-[#E64A11] transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="font-light text-neutral-300 text-xs leading-relaxed">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chronological Leadership Timeline Table */}
                <div className="space-y-4 font-mono text-xs">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">
                        // CHRONOLOGICAL ENGINEERING TIMELINE:
                    </div>

                    <div className="border border-neutral-800 rounded-xs overflow-hidden divide-y divide-neutral-800 bg-[#0A0A09]">
                        {leadershipTimeline.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center hover:bg-white/5 transition-colors">
                                <div className="md:col-span-2 text-sm font-black text-[#E64A11]">
                                    {item.year}
                                </div>
                                <div className="md:col-span-4 space-y-0.5">
                                    <div className="text-xs font-bold text-white font-sans">
                                        {item.role}
                                    </div>
                                    <div className="text-[10px] text-neutral-500">
                                        {item.badge}
                                    </div>
                                </div>
                                <div className="md:col-span-6 text-xs text-neutral-300 leading-relaxed font-sans font-light">
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </section>
    );
};

export default AboutMe;
