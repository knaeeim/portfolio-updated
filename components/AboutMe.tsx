"use client";

import React from "react";
import {
    Cpu,
    Globe,
    Terminal,
    Trophy,
    Users,
    Briefcase,
    Shield,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react";

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
    return (
        <section
            id="about"
            className="w-full border-b border-border bg-background relative overflow-hidden py-10 sm:py-14">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Header */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                00. PROFILE &amp; TIMELINE
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Background &amp; Milestones
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card border border-border px-2.5 py-1 rounded">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>FOUNDER &amp; CEO</span>
                    </div>
                </div>

                {/* 4 Strategic Pillars (Swiss Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {strategicPillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded border border-border bg-card/60 font-mono text-xs space-y-3 hover:border-[#FF4F00]/60 transition-colors">
                            <div className="flex items-center justify-between text-[10px]">
                                <span className="text-[#FF4F00] font-bold">PILLAR 0{idx + 1}</span>
                                <span className="text-muted-foreground uppercase">{pillar.tag}</span>
                            </div>
                            <h3 className="text-sm font-bold font-sans text-foreground">
                                {pillar.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chronological Leadership Timeline Table */}
                <div className="space-y-4 font-mono text-xs">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        CHRONOLOGICAL ENGINEERING TIMELINE:
                    </div>

                    <div className="border border-border rounded overflow-hidden divide-y divide-border">
                        {leadershipTimeline.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center hover:bg-muted/20 transition-colors">
                                <div className="md:col-span-2 text-sm font-bold text-[#FF4F00]">
                                    {item.year}
                                </div>
                                <div className="md:col-span-4 space-y-0.5">
                                    <div className="text-xs font-bold text-foreground font-sans">
                                        {item.role}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">
                                        {item.badge}
                                    </div>
                                </div>
                                <div className="md:col-span-6 text-xs text-muted-foreground leading-relaxed font-sans">
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
