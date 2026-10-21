"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Layers, GraduationCap, Briefcase } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";

interface AboutMeProps {
    data?: any;
}

const getTimelineIcon = (item: any, idx: number) => {
    const text = `${item.badge || ""} ${item.role || ""} ${item.title || ""}`.toLowerCase();
    if (
        text.includes("algorithm") ||
        text.includes("cs") ||
        text.includes("phitron") ||
        text.includes("code") ||
        text.includes("competitive")
    ) {
        return Terminal;
    }
    if (
        text.includes("cloud") ||
        text.includes("mern") ||
        text.includes("system") ||
        text.includes("architecture") ||
        text.includes("backend")
    ) {
        return Layers;
    }
    if (
        text.includes("instructor") ||
        text.includes("academy") ||
        text.includes("mentor") ||
        text.includes("teaching") ||
        text.includes("calling")
    ) {
        return GraduationCap;
    }
    if (
        text.includes("founder") ||
        text.includes("ceo") ||
        text.includes("executive") ||
        text.includes("webzen") ||
        text.includes("venture")
    ) {
        return Briefcase;
    }

    const fallbacks = [Terminal, Layers, GraduationCap, Briefcase];
    return fallbacks[idx % fallbacks.length];
};

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
        date: "2023",
        year: "2023",
        role: "Algorithms & Foundations",
        desc: "Core C/C++, advanced Data Structures, and 600+ competitive programming challenges.",
        badge: "ALGORITHMS",
    },
    {
        date: "2024",
        year: "2024",
        role: "Full-Stack Engineering",
        desc: "Next.js, TypeScript, PostgreSQL/Prisma, and distributed web architectures.",
        badge: "SYSTEMS",
    },
    {
        date: "2025",
        year: "2025",
        role: "Instructor @ BD Calling",
        desc: "Mentored 100+ polytechnic students in React, Next.js, and debugging.",
        badge: "MENTORSHIP",
    },
    {
        date: "2026",
        year: "2026",
        role: "Founder & CEO @ WebZen",
        desc: "Architecting high-stakes platforms, healthcare portals, and high-uptime systems.",
        badge: "VENTURE",
    },
];

export const AboutMe = ({ data }: AboutMeProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    const pillars = Array.isArray(data?.about?.pillars) && data.about.pillars.length > 0
        ? data.about.pillars
        : strategicPillars;

    const timeline = Array.isArray(data?.about?.timeline) && data.about.timeline.length > 0
        ? data.about.timeline
        : leadershipTimeline;

    return (
        <section
            id="about"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-screen scroll-mt-20 bg-pitch-black text-foreground relative overflow-hidden border-b poster-border py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-10 border-b poster-perimeter-border">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span className="text-neutral-900 dark:text-white font-semibold">00. EXECUTIVE DOSSIER</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    LEADERSHIP &amp; PHILOSOPHY
                </div>
                <div className="flex items-center gap-2">
                    <span>FOUNDER &amp; CEO</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </motion.div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[24vw] whitespace-nowrap">
                    DOSSIER // 00
                </span>
            </motion.div>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-8 lg:py-12 z-20 relative space-y-12">
                
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2 max-w-2xl">
                    <span className="font-light text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                        // BACKGROUND &amp; CAPABILITIES
                    </span>
                    <h2 className="editorial-display text-3xl sm:text-5xl lg:text-6xl text-neutral-900 dark:text-white">
                        TECHNICAL RIGOR &amp; <span className="text-[#E64A11]">STRATEGY</span>
                    </h2>
                </motion.div>

                {/* 4 Strategic Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {pillars.map((pillar: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4 }}
                            className="p-4 sm:p-6 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E0E0E]/90 shadow-sm dark:shadow-none space-y-3 hover:border-[#E64A11] dark:hover:border-[#E64A11] transition-all group">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-[#E64A11] font-bold">PILLAR 0{idx + 1}</span>
                                <span className="text-neutral-500 uppercase">{pillar.tag}</span>
                            </div>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#E64A11] transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Chronological Leadership Timeline Table */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="space-y-4 font-mono text-xs">
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-bold">
                        // CHRONOLOGICAL ENGINEERING TIMELINE:
                    </div>

                    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#0A0A09] shadow-sm dark:shadow-none">
                        {timeline.map((item: any, idx: number) => {
                            const IconComponent = getTimelineIcon(item, idx);
                            const yearDisplay = item.date || item.year || `202${3 + idx}`;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    className="p-3.5 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                                    {/* Beginning: Serial Number, Milestone Icon & Timeline Year */}
                                    <div className="md:col-span-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/80 flex flex-col items-center justify-center shrink-0 group-hover:border-[#E64A11] group-hover:bg-[#E64A11]/10 transition-all shadow-xs">
                                            <IconComponent size={14} className="text-[#E64A11]" />
                                            <span className="text-[9px] font-mono font-bold text-neutral-500 dark:text-neutral-400 mt-0.5">
                                                0{idx + 1}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <div className="text-sm sm:text-base font-black text-[#E64A11] font-mono tracking-tight leading-none">
                                                {yearDisplay}
                                            </div>
                                            <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">
                                                // MILESTONE
                                            </span>
                                        </div>
                                    </div>

                                    {/* Middle: Role Title & Badge */}
                                    <div className="md:col-span-4 space-y-1">
                                        <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white font-sans group-hover:text-[#E64A11] transition-colors leading-snug">
                                            {item.role || item.title}
                                        </div>
                                        {item.badge && (
                                            <span className="inline-block text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* End: Detailed Description */}
                                    <div className="md:col-span-5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light">
                                        {item.desc}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>

        </section>
    );
};

export default AboutMe;
