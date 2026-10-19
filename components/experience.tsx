"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Award, Users, BookOpen } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";
import { CircularChevronBtn } from "@/components/poster/CircularChevronBtn";

interface ExperienceSectionProps {
    data?: any;
}

const algorithmicParadigms = [
    {
        paradigm: "Data Structures & Trees",
        count: "210+",
        percentage: 35,
        topics: ["BST", "Heaps", "Segment Trees", "Hash Tables", "Trie"],
        systemApplication: "In-memory indexing, cache routing, and hierarchical RBAC tree traversal.",
    },
    {
        paradigm: "Graph Theory & Traversals",
        count: "145+",
        percentage: 24,
        topics: ["BFS / DFS", "Dijkstra", "Topological Sort", "DSU"],
        systemApplication: "Dependency graph resolution, distributed cycle detection, and network routing.",
    },
    {
        paradigm: "Dynamic Programming",
        count: "130+",
        percentage: 22,
        topics: ["1D/2D States", "Knapsack", "Memoization", "Bitmask DP"],
        systemApplication: "Resource scheduling, slot allocation algorithms, and database query optimization.",
    },
    {
        paradigm: "Greedy, Math & Number Theory",
        count: "125+",
        percentage: 19,
        topics: ["Two-Pointers", "Binary Search", "Sieve", "Modular Math", "Bitwise"],
        systemApplication: "Sliding-window rate limiters, token buckets, and cryptographic hash verification.",
    },
];

const mentorshipModules = [
    {
        moduleNumber: "MOD // 01",
        title: "Runtime Execution & Memory",
        duration: "Weeks 1 — 3",
        syllabus: "V8 engine internals, call stack execution, heap allocation, and memory leaks.",
        capstoneOutcome: "Engineered in-memory queue processor with zero leaks.",
    },
    {
        moduleNumber: "MOD // 02",
        title: "Full-Stack Component SSR",
        duration: "Weeks 4 — 7",
        syllabus: "React 19 concurrent features, Next.js App Router, and SSR hydration.",
        capstoneOutcome: "Full-stack web apps with sub-50ms render latency.",
    },
    {
        moduleNumber: "MOD // 03",
        title: "Relational Modeling & Integrity",
        duration: "Weeks 8 — 10",
        syllabus: "PostgreSQL 3NF normalization, foreign key constraints, and Prisma transactions.",
        capstoneOutcome: "Multi-table relational databases with ACID guarantees.",
    },
    {
        moduleNumber: "MOD // 04",
        title: "Production Governance & CI/CD",
        duration: "Weeks 11 — 12",
        syllabus: "Git trunk-based workflows, rigorous code reviews, and automated CI/CD.",
        capstoneOutcome: "12 student teams deployed verified production apps.",
    },
];

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();
    const [selectedParadigm, setSelectedParadigm] = useState(0);

    return (
        <section
            id="problem-solving"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-pitch-black text-white relative overflow-hidden border-b border-[#222220] py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span>04. PROOF OF WORK</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    ALGORITHMIC RIGOR &amp; MENTORSHIP
                </div>
                <div className="flex items-center gap-2">
                    <span>600+ SOLVED • 100+ MENTORED</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[26vw] text-[#121212] whitespace-nowrap">
                    PROOF // 04
                </span>
            </motion.div>

            {/* Main Stage: Two Interlocking High-Contrast Blocks */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-10 z-20 relative space-y-12">
                
                {/* SECTION 4A: BURNT ORANGE BACKDROP (600+ CP SOLVED) */}
                <div className="relative rounded-sm burnt-stripes p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#E64A11]/60 space-y-8 overflow-hidden">
                    
                    {/* Watermark inside block */}
                    <div className="absolute top-6 right-6 font-mono text-[10px] text-black/50 tracking-widest uppercase font-bold">
                        VERIFIED BY CODEFORCES / LEETCODE
                    </div>

                    <div className="space-y-2 max-w-xl">
                        <span className="font-light text-neutral-200 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                            // COMPETITIVE PROGRAMMING RIGOR
                        </span>
                        <div className="editorial-display text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] text-white">
                            600+
                        </div>
                        <h3 className="editorial-display text-2xl sm:text-4xl text-black">
                            ALGORITHMIC CHALLENGES SOLVED
                        </h3>
                    </div>

                    {/* Paradigm Selector Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs pt-4">
                        {algorithmicParadigms.map((item, idx) => {
                            const isSelected = selectedParadigm === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedParadigm(idx)}
                                    className={`p-4 rounded-xs text-left transition-all cursor-pointer space-y-2 border ${
                                        isSelected
                                            ? "bg-black text-white border-white shadow-xl scale-[1.02]"
                                            : "bg-black/40 text-neutral-100 border-black/30 hover:bg-black/60"
                                    }`}>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="font-bold opacity-80">{item.count}</span>
                                        <span className="opacity-60">{item.percentage}%</span>
                                    </div>
                                    <div className="font-bold text-sm leading-snug">
                                        {item.paradigm}
                                    </div>
                                    <div className="text-[10px] opacity-75 truncate">
                                        {item.topics.join(" • ")}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Verifiable External Profiles Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/20 font-mono text-xs">
                        <div className="text-black/80 font-bold">
                            APPLICATION: {algorithmicParadigms[selectedParadigm].systemApplication}
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href="https://codeforces.com/profile/knaeeim"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-3 py-1.5 rounded-xs bg-black text-white font-bold hover:bg-white hover:text-black transition-colors inline-flex items-center gap-1">
                                <span>CODEFORCES</span>
                                <ArrowUpRight size={12} />
                            </a>
                            <a
                                href="https://leetcode.com/u/knaeeim/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-3 py-1.5 rounded-xs bg-black text-white font-bold hover:bg-white hover:text-black transition-colors inline-flex items-center gap-1">
                                <span>LEETCODE</span>
                                <ArrowUpRight size={12} />
                            </a>
                            <a
                                href="https://www.codechef.com/users/knaeeim"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-3 py-1.5 rounded-xs bg-black text-white font-bold hover:bg-white hover:text-black transition-colors inline-flex items-center gap-1">
                                <span>CODECHEF</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* SECTION 4B: DARK EDITORIAL BACKDROP (100+ STUDENTS MENTORED) */}
                <div
                    id="mentorship"
                    className="relative rounded-sm bg-[#0E0E0E] p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl space-y-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                        <div className="space-y-2">
                            <span className="font-light text-neutral-400 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                                // TALENT MENTORSHIP &amp; ACADEMY
                            </span>
                            <div className="flex items-baseline gap-4 flex-wrap">
                                <div className="editorial-display text-5xl sm:text-7xl lg:text-8xl text-white">
                                    100+
                                </div>
                                <div className="editorial-display text-2xl sm:text-4xl text-[#E64A11]">
                                    ENGINEERS MENTORED
                                </div>
                            </div>
                            <p className="font-light text-neutral-300 text-xs sm:text-sm max-w-xl">
                                Lead Web Instructor @ BD Calling Academy. Directed polytechnic cohorts 
                                in production JavaScript, Next.js architecture, and collaborative Git practices.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono px-3 py-1.5 rounded-xs bg-white/5 border border-white/10 text-neutral-300">
                            <span className="text-white font-bold">12 PRODUCTION CAPSTONES</span>
                        </div>
                    </div>

                    {/* 4 Industrial Curriculum Modules Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                        {mentorshipModules.map((mod, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-xs border border-neutral-800 bg-neutral-900/60 space-y-3 hover:border-[#E64A11] transition-colors">
                                <div className="flex items-center justify-between text-[10px] text-neutral-400">
                                    <span className="text-[#E64A11] font-bold">{mod.moduleNumber}</span>
                                    <span>{mod.duration}</span>
                                </div>
                                <div className="font-bold text-white text-sm">
                                    {mod.title}
                                </div>
                                <p className="font-light text-neutral-300 text-xs leading-relaxed">
                                    {mod.syllabus}
                                </p>
                                <div className="text-[10px] text-[#E64A11] pt-1 border-t border-white/5 font-semibold">
                                    ● {mod.capstoneOutcome}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
};

export default ExperienceSection;
