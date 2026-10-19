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
        title: "Strategic Full-Stack Architecture",
        desc: "Designing resilient, zero-bloat web systems engineered for long-term scalability, low latency, and zero data downtime.",
        tag: "ENGINEERING RIGOR",
    },
    {
        title: "Engineering Mentorship & Leadership",
        desc: "Trained and mentored 100+ emerging engineers at BD Calling Academy, cultivating clean code disciplines and industry debugging habits.",
        tag: "TALENT IMPACT",
    },
    {
        title: "Algorithmic Precision",
        desc: "Solved 600+ complex competitive programming problems across LeetCode & Codeforces, translating mathematical rigor into optimal database queries.",
        tag: "ALGORITHMIC RIGOR",
    },
    {
        title: "Venture Delivery & Client ROI",
        desc: "As Founder & CEO of WebZen Bangladesh, I deliver turnkey production platforms (such as Dr. Devojyoti Dutta's medical portal) driving measurable growth.",
        tag: "VENTURE EXECUTION",
    },
];

const leadershipTimeline = [
    {
        year: "2023",
        role: "Computer Science & Algorithmic Specialization",
        desc: "Mastered C/C++, advanced Data Structures, and algorithmic complexities at Phitron. Solved 600+ competitive programming challenges.",
        badge: "ALGORITHMIC CORE",
    },
    {
        year: "2024",
        role: "Full-Stack System Engineering",
        desc: "Specialized in distributed architectures, Next.js, React, Node.js, and database modeling. Architected multi-tenant SaaS platforms.",
        badge: "SYSTEMS EXPANSION",
    },
    {
        year: "2025",
        role: "Web Instructor @ BD Calling Academy",
        desc: "Led training cohorts for 100+ polytechnic students and junior engineers. Directed curriculum in MERN, Next.js, and real-world system debugging.",
        badge: "TECHNICAL MENTORSHIP",
    },
    {
        year: "2026",
        role: "Founder & CEO, WebZen Bangladesh",
        desc: "Leading WebZen Bangladesh in delivering high-stakes production platforms, including the automated clinical booking platform for Dr. Devojyoti Dutta.",
        badge: "EXECUTIVE DIRECTION",
    },
];

export const AboutMe = ({ data }: AboutMeProps) => {
    return (
        <section
            id="about"
            className="w-full border-b border-border bg-background relative overflow-hidden py-12 sm:py-16">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header */}
                <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                00. EXECUTIVE DOSSIER // LEADERSHIP &amp; PHILOSOPHY
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Bridging Technical Rigor &amp; Product Strategy
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                            A track record defined by hands-on engineering mastery, rigorous algorithmic foundations, 
                            and executive leadership at WebZen Bangladesh.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card border border-border px-3 py-1.5 rounded">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>FOUNDER &amp; CHIEF EXECUTIVE OFFICER</span>
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
