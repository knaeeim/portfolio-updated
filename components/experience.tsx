"use client";

import React, { useState } from "react";
import {
    Terminal,
    ArrowUpRight,
    ExternalLink,
    Code2,
    GraduationCap,
    CheckCircle2,
    Layers,
    BookOpen,
    Users,
    TrendingUp,
    Shield,
    Cpu,
} from "lucide-react";

interface ExperienceSectionProps {
    data?: any;
}

const algorithmicParadigms = [
    {
        paradigm: "Data Structures & Trees",
        count: "210+",
        percentage: 35,
        topics: ["Binary Search Trees", "Heaps / Priority Queues", "Segment Trees", "Hash Tables", "Trie"],
        systemApplication: "High-throughput in-memory indices, cache routing, and hierarchical RBAC tree traversal.",
    },
    {
        paradigm: "Graph Theory & Traversals",
        count: "145+",
        percentage: 24,
        topics: ["BFS / DFS", "Dijkstra Shortest Path", "Topological Sort", "Disjoint Set Union (DSU)"],
        systemApplication: "Dependency graph resolution in build systems, distributed cycle detection, and network routing.",
    },
    {
        paradigm: "Dynamic Programming",
        count: "130+",
        percentage: 22,
        topics: ["1D/2D State Transitions", "0/1 Knapsack", "Memoization Tables", "Bitmask DP"],
        systemApplication: "Optimal resource scheduling, slot allocation algorithms, and database query plan optimization.",
    },
    {
        paradigm: "Greedy, Math & Number Theory",
        count: "125+",
        percentage: 19,
        topics: ["Two-Pointers", "Binary Search", "Prime Sieve", "Modular Arithmetic", "Bit Manipulation"],
        systemApplication: "Sliding-window rate limiters, token bucket counters, and cryptographic hash verification.",
    },
];

const mentorshipModules = [
    {
        moduleNumber: "MOD // 01",
        title: "Memory Execution & JavaScript Runtime",
        duration: "Weeks 1 — 3",
        syllabus: "V8 engine internals, call stack execution, heap allocation, event loop microtasks, and memory leak mitigation.",
        capstoneOutcome: "Built an in-memory queue processor with zero memory leaks under stress.",
    },
    {
        moduleNumber: "MOD // 02",
        title: "Full-Stack Component Architecture & SSR",
        duration: "Weeks 4 — 7",
        syllabus: "React 19 concurrent features, Next.js App Router, SSR hydration lifecycles, and component tree memoization.",
        capstoneOutcome: "Engineered responsive full-stack applications with sub-50ms render latency.",
    },
    {
        moduleNumber: "MOD // 03",
        title: "Relational Modeling & Schema Integrity",
        duration: "Weeks 8 — 10",
        syllabus: "PostgreSQL 3NF normalization, foreign key constraints, composite indexing, and Prisma ORM transactions.",
        capstoneOutcome: "Designed multi-table relational databases with ACID guarantees.",
    },
    {
        moduleNumber: "MOD // 04",
        title: "Industrial Debugging & Production Governance",
        duration: "Weeks 11 — 12",
        syllabus: "Git trunk-based workflows, rigorous code reviews, automated CI/CD deployments, and zero-regression testing.",
        capstoneOutcome: "12 student teams deployed verified production applications to Vercel.",
    },
];

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
    const [selectedParadigm, setSelectedParadigm] = useState(0);

    return (
        <section
            id="problem-solving"
            className="w-full border-b border-border bg-background relative overflow-hidden py-12 sm:py-16">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* ======================================================== */}
                {/* PART 1: THE ALGORITHMIC LEDGER (600+ Solved Challenges) */}
                {/* ======================================================== */}
                <div className="space-y-8">
                    
                    {/* Header */}
                    <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                                <span className="tech-label text-foreground">
                                    03. THE PROOF-OF-WORK LEDGER
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                                Algorithmic Rigor &amp; Problem Solving
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                                Data-journalism breakdown of 600+ competitive programming challenges solved across 
                                Codeforces, LeetCode, and CodeChef. Translating mathematical rigor into low-latency systems.
                            </p>
                        </div>

                        {/* Verifiable Platform Links */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                            <a
                                href="https://codeforces.com/profile/knaeeim"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="keycap-btn px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-[#FF4F00] transition-colors inline-flex items-center gap-1">
                                <span>CODEFORCES</span>
                                <ArrowUpRight size={11} className="text-[#FF4F00]" />
                            </a>
                            <a
                                href="https://leetcode.com/u/knaeeim/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="keycap-btn px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-[#FF4F00] transition-colors inline-flex items-center gap-1">
                                <span>LEETCODE</span>
                                <ArrowUpRight size={11} className="text-[#FF4F00]" />
                            </a>
                            <a
                                href="https://www.codechef.com/users/knaeeim"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="keycap-btn px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-[#FF4F00] transition-colors inline-flex items-center gap-1">
                                <span>CODECHEF</span>
                                <ArrowUpRight size={11} className="text-[#FF4F00]" />
                            </a>
                        </div>
                    </div>

                    {/* Ledger Grid: 4 Paradigm Cards with Interactive Inspector */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {algorithmicParadigms.map((item, idx) => {
                            const isSelected = selectedParadigm === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedParadigm(idx)}
                                    className={`p-4 rounded border text-left font-mono transition-all cursor-pointer space-y-3 ${
                                        isSelected
                                            ? "bg-card border-[#FF4F00] shadow-md"
                                            : "bg-card/40 border-border hover:border-foreground/40"
                                    }`}>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                            PARADIGM 0{idx + 1}
                                        </span>
                                        <span className="text-sm font-bold text-[#FF4F00]">
                                            {item.count}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-foreground leading-tight">
                                            {item.paradigm}
                                        </h3>
                                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-2">
                                            <div
                                                className="bg-[#FF4F00] h-full"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-muted-foreground leading-snug">
                                        {item.topics.slice(0, 3).join(" • ")}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Paradigm Architectural Translation Drawer */}
                    <div className="p-4 sm:p-5 rounded border border-border bg-card/60 font-mono text-xs space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border pb-1.5">
                            <span className="flex items-center gap-2">
                                <Cpu size={12} className="text-[#FF4F00]" />
                                <span className="font-bold text-foreground">
                                    SYSTEM APPLICATION: {algorithmicParadigms[selectedParadigm].paradigm.toUpperCase()}
                                </span>
                            </span>
                            <span className="text-[#10B981] font-bold">
                                {algorithmicParadigms[selectedParadigm].count} VERIFIED SOLVED
                            </span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed pt-1">
                            {algorithmicParadigms[selectedParadigm].systemApplication}
                        </p>
                    </div>

                </div>

                {/* ======================================================== */}
                {/* PART 2: MENTORSHIP & INSTRUCTION LOG (100+ Students)      */}
                {/* ======================================================== */}
                <div id="mentorship" className="space-y-8 pt-6 border-t border-border">
                    
                    {/* Header */}
                    <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                <span className="tech-label text-foreground">
                                    04. MENTORSHIP &amp; ACADEMIC INSTRUCTION LOG
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                                Industrial Training &amp; Curriculum Governance
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                                Official syllabus and impact report as Lead Web Instructor at BD Calling Academy. 
                                Mentored a cohort of 100+ polytechnic students in production engineering, 
                                debugging patterns, and collaborative Git practices.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono bg-card border border-border px-3 py-1.5 rounded">
                            <span className="text-foreground font-bold">100+ ENGINEERS</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-[#10B981] font-bold">12 CAPSTONES</span>
                        </div>
                    </div>

                    {/* Academic Syllabus Table */}
                    <div className="border border-border rounded overflow-hidden">
                        <div className="divide-y divide-border">
                            {mentorshipModules.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start font-mono text-xs hover:bg-muted/20 transition-colors">
                                    
                                    {/* Module & Duration (3 cols) */}
                                    <div className="lg:col-span-3 space-y-1">
                                        <div className="text-[10px] text-[#10B981] font-bold">
                                            {item.moduleNumber}
                                        </div>
                                        <div className="text-sm font-bold text-foreground">
                                            {item.title}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {item.duration}
                                        </div>
                                    </div>

                                    {/* Curriculum Details (6 cols) */}
                                    <div className="lg:col-span-6 space-y-1">
                                        <div className="text-[10px] text-muted-foreground uppercase">
                                            INSTRUCTION SYLLABUS:
                                        </div>
                                        <p className="text-xs text-foreground leading-relaxed font-sans">
                                            {item.syllabus}
                                        </p>
                                    </div>

                                    {/* Capstone Outcome (3 cols) */}
                                    <div className="lg:col-span-3 space-y-1">
                                        <div className="text-[10px] text-muted-foreground uppercase">
                                            VERIFIED OUTCOME:
                                        </div>
                                        <div className="p-2.5 rounded bg-muted/40 border border-border text-[11px] text-foreground">
                                            {item.capstoneOutcome}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentorship Impact Summary Ribbon */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        <div className="p-3 rounded border border-border bg-card space-y-0.5">
                            <div className="text-[10px] text-muted-foreground uppercase">COHORT CAPACITY</div>
                            <div className="text-lg font-bold text-foreground">100+ Polytechnic Students</div>
                            <div className="text-[10px] text-muted-foreground">Industrial Engineering Cohort</div>
                        </div>
                        <div className="p-3 rounded border border-border bg-card space-y-0.5">
                            <div className="text-[10px] text-muted-foreground uppercase">PRODUCTION CAPSTONES</div>
                            <div className="text-lg font-bold text-[#10B981]">12 Live Platforms Deployed</div>
                            <div className="text-[10px] text-muted-foreground">Supervised architecture reviews</div>
                        </div>
                        <div className="p-3 rounded border border-border bg-card space-y-0.5">
                            <div className="text-[10px] text-muted-foreground uppercase">CURRICULUM SPEC</div>
                            <div className="text-lg font-bold text-[#FF4F00]">MERN + Next.js + Git</div>
                            <div className="text-[10px] text-muted-foreground">Industry-aligned standards</div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default ExperienceSection;
