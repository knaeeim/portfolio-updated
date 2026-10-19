"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Server, Cpu, Database, Shield, Zap } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";
import { CircularChevronBtn } from "@/components/poster/CircularChevronBtn";

interface SkillsSectionProps {
    data?: any;
}

const architecturalPillars = [
    {
        id: "frontend",
        pillarNumber: "01",
        title: "FRONTEND & NEXT.JS 16",
        leadIn: "hybrid edge & concurrent kinetics",
        coreHighlight: "TURBOPACK SSR",
        description:
            "Engineered around Next.js 16 App Router, React 19 concurrent features, and Tailwind CSS 4. Sub-38ms TTFB on Vercel Edge with zero hydration drift.",
        stack: ["Next.js 16", "React 19", "TypeScript 5.8", "Tailwind CSS 4", "Framer Motion"],
        sla: "<38ms TTFB Edge",
        icon: Layers,
    },
    {
        id: "backend",
        pillarNumber: "02",
        title: "BACKEND & PRISMA/POSTGRES",
        leadIn: "isolated domain services & ACID integrity",
        coreHighlight: "MODULAR REST",
        description:
            "Domain-driven Express architecture with Zod schema contract validation, PostgreSQL relational modeling, and atomic Prisma $transaction guarantees.",
        stack: ["Modular Express", "PostgreSQL", "Prisma ORM", "Redis Mutex", "RBAC & JWT"],
        sla: "P99 < 45ms REST",
        icon: Server,
    },
    {
        id: "core",
        pillarNumber: "03",
        title: "ALGORITHMIC CORE & AI",
        leadIn: "mathematical rigor & computer vision",
        coreHighlight: "600+ CP SOLVED",
        description:
            "Grounded in 600+ competitive programming challenges across LeetCode & Codeforces. Active research in PyTorch Hybrid CNN-ViT brain tumor segmentation.",
        stack: ["Data Structures", "Graph Theory", "Dynamic Programming", "PyTorch 2.4", "Grad-CAM"],
        sla: "98.7% Diagnostic Precision",
        icon: Cpu,
    },
];

export const SkillSection = ({ data }: SkillsSectionProps) => {
    const [activePillarId, setActivePillarId] = useState("frontend");
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    const activePillar =
        architecturalPillars.find((p) => p.id === activePillarId) || architecturalPillars[0];

    return (
        <section
            id="architecture"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-[90vh] bg-pitch-black text-foreground relative overflow-hidden flex flex-col justify-between border-b poster-border py-10 sm:py-14 select-none">
            
            {/* Top Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-40 border-b poster-perimeter-border">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span className="text-neutral-900 dark:text-white font-semibold">02. ARCHITECTURE</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    LAYERED MATRIX
                </div>
                <div className="flex items-center gap-2">
                    <span>PRODUCTION RUNTIME</span>
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
                    STACK // 02
                </span>
            </motion.div>

            {/* Main Poster Grid */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 lg:py-12 z-20 flex-1 flex flex-col justify-center space-y-10">
                
                {/* Section Editorial Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2 max-w-2xl">
                    <span className="font-light text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                        // THE ARCHITECTURAL STACK
                    </span>
                    <h2 className="editorial-display text-4xl sm:text-6xl lg:text-7xl text-neutral-900 dark:text-white">
                        LAYERED SYSTEM <span className="text-[#E64A11]">MATRIX</span>
                    </h2>
                    <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm max-w-xl">
                        Hover across any pillar to trigger cooperative background shifts, 
                        expand the inspection drawer, and inspect production invariants.
                    </p>
                </motion.div>

                {/* 3 Asymmetric Poster Cards with Sliding Burnt Orange Anchor */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {architecturalPillars.map((pillar, idx) => {
                        const isActive = pillar.id === activePillarId;
                        const IconComponent = pillar.icon;

                        return (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setActivePillarId(pillar.id)}
                                onClick={() => setActivePillarId(pillar.id)}
                                className="relative group cursor-pointer">
                                
                                {/* Cooperative Sliding Burnt Orange Background Block */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pillar-bg"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        className="absolute -inset-1.5 rounded-sm burnt-stripes -z-10 shadow-2xl"
                                    />
                                )}

                                {/* Scattering Pixel Anchors when Active */}
                                {isActive && (
                                    <>
                                        <FloatingPixel
                                            color="orange"
                                            className="absolute -top-3 -right-3 z-30"
                                        />
                                        <FloatingPixel
                                            color="grey"
                                            className="absolute -bottom-3 -left-3 z-30"
                                        />
                                        <FloatingPixel
                                            color="orange"
                                            className="absolute top-1/2 -right-4 z-30 hidden md:block"
                                        />
                                    </>
                                )}

                                {/* Card Body */}
                                <div
                                    className={`h-full p-6 sm:p-8 rounded-sm border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                                        isActive
                                            ? "bg-white dark:bg-[#0A0A09] border-[#E64A11] shadow-2xl"
                                            : "bg-white/90 dark:bg-[#0E0E0E]/90 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm dark:shadow-none"
                                    }`}>
                                    
                                    {/* Card Header: Number + Icon + Lead-In */}
                                    <div className="space-y-3 border-b border-neutral-200 dark:border-white/5 pb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-2xl font-black text-[#E64A11]">
                                                {pillar.pillarNumber}.
                                            </span>
                                            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                                                <IconComponent size={18} />
                                            </div>
                                        </div>
                                        <div className="font-light text-neutral-500 dark:text-neutral-400 text-xs italic">
                                            {pillar.leadIn}
                                        </div>
                                    </div>

                                    {/* Title & Core Highlight */}
                                    <div className="space-y-2">
                                        <h3
                                            className={`font-black text-xl sm:text-2xl uppercase tracking-tight transition-colors ${
                                                isActive ? "text-[#E64A11]" : "text-neutral-900 dark:text-white"
                                            }`}>
                                            {pillar.title}
                                        </h3>
                                        <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack Chips */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex flex-wrap gap-1.5">
                                            {pillar.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 rounded-xs bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-[10px] font-mono text-neutral-800 dark:text-neutral-200">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Card Footer: SLA & Circular Chevron Button */}
                                        <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-white/5 text-xs font-mono">
                                            <span className="text-[#E64A11] font-bold">
                                                {pillar.sla}
                                            </span>
                                            <CircularChevronBtn size="sm" />
                                        </div>
                                    </div>

                                </div>

                            </motion.div>
                        );
                    })}
                </div>

            </div>

            {/* Bottom Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-40 border-t poster-perimeter-border">
                <div>NODE: {activePillar.title}</div>
                <div>SLA // GUARANTEED</div>
            </motion.div>

        </section>
    );
};

export default SkillSection;
