"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Shield, Play, ChevronDown, ChevronUp } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";
import { CircularChevronBtn } from "@/components/poster/CircularChevronBtn";

interface ProjectsSectionProps {
    data?: any;
}

interface ArchitecturalSpec {
    schemaDiagram: {
        layer1: string;
        layer2: string;
        layer3: string;
        layer4: string;
    };
    hardestProblem: {
        title: string;
        challenge: string;
        resolution: string;
    };
    apiSimulator: {
        method: string;
        endpoint: string;
        simulatedLatency: string;
        responsePayload: Record<string, any>;
    };
}

const defaultArchitecturalData: Record<string, ArchitecturalSpec> = {
    "webzen-technologies": {
        schemaDiagram: {
            layer1: "Edge CDN (Vercel Ingestion)",
            layer2: "Next.js 16 SSR & Middleware",
            layer3: "Prisma Client & SWR Cache",
            layer4: "MongoDB Atlas + PostgreSQL",
        },
        hardestProblem: {
            title: "Data Pooling & Hydration",
            challenge: "High concurrency caused pool exhaustion and hydration mismatches across records.",
            resolution: "Hybrid in-memory SWR caching with atomic fallback, cutting DB query overhead by 68%.",
        },
        apiSimulator: {
            method: "GET",
            endpoint: "/api/portfolio?scope=enterprise_summary",
            simulatedLatency: "24ms",
            responsePayload: {
                status: 200,
                studio: "WebZen Bangladesh",
                founder: "Khairul Bashar Naeeim",
                reliabilitySLA: "99.98%",
                activeVentures: 15,
                engineersMentored: "100+",
                clusterHealth: "OPTIMAL",
            },
        },
    },
    "devojyoti-dutta": {
        schemaDiagram: {
            layer1: "Patient Web Client (Bengali/English)",
            layer2: "Next.js 15 Server Actions",
            layer3: "Redis Mutex (Atomic Slot Guard)",
            layer4: "PostgreSQL Registry + WhatsApp Cloud API",
        },
        hardestProblem: {
            title: "Simultaneous Slot Collisions",
            challenge: "Concurrent bookings during morning quota releases risked duplicate reservations.",
            resolution: "Distributed Redis mutex locks with serializable transactions; guarantees exactly one booking per slot.",
        },
        apiSimulator: {
            method: "POST",
            endpoint: "/api/clinical/reserve-slot",
            simulatedLatency: "38ms",
            responsePayload: {
                status: "CONFIRMED",
                bookingReference: "AYUR-2026-089",
                patientSlot: "CHAMBER_1 // 11:30 AM",
                quotaLock: "ATOMIC_ACQUIRED",
                telemedicineWhatsApp: "DISPATCHED",
                latency: "38ms",
            },
        },
    },
    "imranh-me": {
        schemaDiagram: {
            layer1: "Pointer Vector Listener",
            layer2: "HTML5 Canvas Particle Field (60 FPS)",
            layer3: "Next.js 16 Static Regeneration (ISR)",
            layer4: "Academic CDN + Scholarly Index",
        },
        hardestProblem: {
            title: "Trigonometric Particle Simulation",
            challenge: "Real-time canvas waves computed millions of sine/cosine ops, throttling mobile FPS.",
            resolution: "Precomputed lookup buffers with double-buffering; locked a fluid 60 FPS on all devices.",
        },
        apiSimulator: {
            method: "GET",
            endpoint: "/api/research/papers?category=development_economics",
            simulatedLatency: "19ms",
            responsePayload: {
                status: 200,
                institution: "BIGD, BRAC University",
                workingPapers: 8,
                canvasPhysics: "ACTIVE_60FPS",
                openGraphSchema: "SCHOLAR_VALIDATED",
            },
        },
    },
    "skill-bridge": {
        schemaDiagram: {
            layer1: "Student / Instructor / Admin Dashboards",
            layer2: "Modular Express + JWT Auth Middleware",
            layer3: "Prisma Multi-Table Transactions",
            layer4: "PostgreSQL 3NF Normalized Schema",
        },
        hardestProblem: {
            title: "Role Privilege Isolation",
            challenge: "Shared marketplace endpoints risked unauthorized student access to instructor balances.",
            resolution: "Strict declarative RBAC middleware with cryptographic JWT claims and Zod projection guards.",
        },
        apiSimulator: {
            method: "POST",
            endpoint: "/api/sessions/authorize-booking",
            simulatedLatency: "31ms",
            responsePayload: {
                authorized: true,
                role: "STUDENT_VERIFIED",
                scheduleConflict: "NONE",
                sessionDuration: "60_MINUTES",
                databaseTransaction: "COMMITTED_ACID",
            },
        },
    },
};

const fallbackSpec: ArchitecturalSpec = {
    schemaDiagram: {
        layer1: "Client UI Layer (Next.js)",
        layer2: "API Orchestration Gateway",
        layer3: "Service Interceptor & Cache",
        layer4: "Database & Cloud Infrastructure",
    },
    hardestProblem: {
        title: "Latency & Relational Data Consistency",
        challenge: "Maintaining low roundtrip times and preventing race conditions under concurrent client actions.",
        resolution: "Engineered optimized indexing, atomic query transactions, and sub-second SSR data caching.",
    },
    apiSimulator: {
        method: "GET",
        endpoint: "/api/v1/telemetry",
        simulatedLatency: "28ms",
        responsePayload: {
            status: "ONLINE",
            cluster: "PRODUCTION_ACTIVE",
            latency: "28ms",
        },
    },
};

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});
    const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
    const [simRunning, setSimRunning] = useState<Record<string, boolean>>({});

    // Read projects dynamically from backend data
    const rawProjects = Array.isArray(data?.projects) ? data.projects : [];
    const displayProjects = rawProjects.map((proj: any, idx: number) => {
        const id = proj.id || `proj-${idx}`;
        const spec = defaultArchitecturalData[id] || fallbackSpec;

        const images = Array.isArray(proj.images) && proj.images.length > 0
            ? proj.images.map((img: any, iIdx: number) => ({
                  src: typeof img === "string" ? img : img.src || proj.image,
                  label: typeof img === "string" ? `SCREEN // 0${iIdx + 1}` : img.label || `SCREEN // 0${iIdx + 1}`,
              }))
            : [{ src: proj.image || "/profilePicture.jpg", label: "PRIMARY SCREEN" }];

        return {
            id,
            dossierNumber: `G0${idx + 1}`,
            title: proj.title || "Production System",
            subtitle: proj.subtitle || proj.shortDescription || "Full-Stack Web Architecture",
            category: proj.category || "ENTERPRISE",
            role: proj.role || "Lead System Architect",
            year: proj.year || "2026",
            leadIn: proj.client || proj.impact || "Enterprise Architecture",
            description: proj.description || proj.challenge || "Mission-critical production platform.",
            techStack: Array.isArray(proj.techStack) ? proj.techStack : ["Next.js", "TypeScript", "PostgreSQL"],
            liveUrl: proj.liveUrl,
            githubUrl: proj.githubUrl,
            images,
            ...spec,
        };
    });

    const toggleDrawer = (id: string) => {
        setOpenDrawers((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const runApiSimulator = (id: string) => {
        setSimRunning((prev) => ({ ...prev, [id]: true }));
        setOpenDrawers((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setSimRunning((prev) => ({ ...prev, [id]: false }));
        }, 600);
    };

    return (
        <section
            id="projects"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-pitch-black text-white relative overflow-hidden border-b border-[#222220] py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span>03. SELECTED WORKS</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    MAGAZINE SPREAD SHOWCASE
                </div>
                <div className="flex items-center gap-2">
                    <span>{displayProjects.length} REPOSITORIES</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[26vw] text-[#121212] whitespace-nowrap">
                    WORKS // 03
                </span>
            </motion.div>

            {/* Project Spreads Container */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-10 z-20 relative space-y-20">
                
                {displayProjects.map((project: any, pIdx: number) => {
                    const isDrawerOpen = !!openDrawers[project.id];
                    const isRunning = !!simRunning[project.id];
                    const activeImgIdx = activeImageIndices[project.id] || 0;
                    const activeImg = project.images[activeImgIdx] || project.images[0];

                    return (
                        <div
                            key={project.id}
                            className="border-b border-neutral-800 pb-16 last:border-b-0 space-y-8 group">
                            
                            {/* Project Spread Perimeter Header */}
                            <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#E64A11] font-black tracking-widest text-base">
                                        {project.dossierNumber}
                                    </span>
                                    <span className="text-neutral-400 uppercase tracking-wider text-[11px]">
                                        // {project.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-neutral-400">
                                    <span>{project.role}</span>
                                    <span>•</span>
                                    <span className="text-white">{project.year}</span>
                                </div>
                            </div>

                            {/* Main Magazine Layout: Left Solid Burnt Block / Right Breakout Mockup */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                                
                                {/* LEFT (4 COLS): Solid Burnt Orange Geometric Block */}
                                <div className="lg:col-span-4 relative aspect-square sm:aspect-4/3 lg:aspect-square rounded-sm burnt-stripes p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-[#E64A11]/60">
                                    <div className="space-y-1">
                                        <span className="font-light text-neutral-200 text-xs sm:text-sm tracking-wide block">
                                            {project.leadIn}
                                        </span>
                                        <div className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                                            {project.dossierNumber}
                                        </div>
                                    </div>

                                    {/* Tech Stack Chips Inside Orange Block */}
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-1">
                                            {project.techStack.map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 rounded-xs bg-black/40 text-white font-mono text-[10px] font-bold">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="font-mono text-[10px] text-black/60 tracking-widest uppercase font-bold">
                                            ARCHITECTURAL DOSSIER
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT (8 COLS): Visual Breakout with Overlapping Title & ( > ) Trigger */}
                                <div className="lg:col-span-8 relative space-y-4 lg:-ml-12 xl:-ml-16 z-20">
                                    
                                    {/* Breakout Screen Viewer */}
                                    <div className="relative aspect-16/9 sm:aspect-21/9 rounded-sm border border-neutral-800 bg-[#0A0A09] overflow-hidden shadow-2xl group/screen">
                                        <Image
                                            src={activeImg.src}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 900px"
                                            className="object-cover object-top filter grayscale-20 group-hover/screen:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                                        {/* Multi-Screen Switcher Tabs */}
                                        {project.images.length > 1 && (
                                            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30 font-mono text-[10px]">
                                                {project.images.map((img: any, iIdx: number) => {
                                                    const isSelected = activeImgIdx === iIdx;
                                                    return (
                                                        <button
                                                            key={iIdx}
                                                            type="button"
                                                            onClick={() =>
                                                                setActiveImageIndices((prev) => ({
                                                                    ...prev,
                                                                    [project.id]: iIdx,
                                                                }))
                                                            }
                                                            className={`px-2 py-1 rounded-xs transition-all cursor-pointer ${
                                                                isSelected
                                                                    ? "bg-[#E64A11] text-white font-bold"
                                                                    : "bg-black/75 border border-white/20 text-neutral-300 hover:text-white"
                                                            }`}>
                                                            0{iIdx + 1}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Overlapping Heavy Title + ( > ) Drawer Trigger */}
                                    <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
                                        <div className="space-y-1">
                                            <h3 className="editorial-display text-3xl sm:text-5xl lg:text-6xl text-white">
                                                {project.title}
                                            </h3>
                                            <p className="font-light text-neutral-300 text-xs sm:text-sm max-w-xl">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="px-3 py-1.5 rounded-xs border border-neutral-700 bg-neutral-900/80 text-xs font-mono text-neutral-200 hover:text-white hover:border-[#E64A11] transition-all inline-flex items-center gap-1.5">
                                                    <span>LIVE</span>
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                            <CircularChevronBtn
                                                onClick={() => toggleDrawer(project.id)}
                                                label={isDrawerOpen ? "CLOSE" : "INSPECT"}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Collapsible Architecture & Code Inspector Drawer */}
                            <AnimatePresence>
                                {isDrawerOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-sm border border-[#E64A11]/40 bg-[#0A0A09] p-6 space-y-6 font-mono text-xs overflow-hidden">
                                        
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <div className="flex items-center gap-2 text-[#E64A11] font-bold">
                                                <Shield size={14} />
                                                <span>SYSTEM ARCHITECTURE &amp; SIMULATOR // {project.dossierNumber}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleDrawer(project.id)}
                                                className="text-neutral-400 hover:text-white inline-flex items-center gap-1">
                                                <span>CLOSE DRAWER</span>
                                                <ChevronUp size={14} />
                                            </button>
                                        </div>

                                        {/* Bottleneck & Resolution Callout */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xs bg-white/5 border border-white/10">
                                            <div>
                                                <span className="text-[10px] text-neutral-400 uppercase font-bold block">
                                                    BOTTLENECK:
                                                </span>
                                                <p className="text-neutral-300 mt-1">
                                                    {project.hardestProblem.challenge}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-[#E64A11] uppercase font-bold block">
                                                    ARCHITECTURAL FIX:
                                                </span>
                                                <p className="text-white mt-1">
                                                    {project.hardestProblem.resolution}
                                                </p>
                                            </div>
                                        </div>

                                        {/* API Simulator Trigger & Monospace Payload */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <button
                                                    type="button"
                                                    onClick={() => runApiSimulator(project.id)}
                                                    className="px-3 py-1.5 rounded-xs bg-[#E64A11] text-white font-bold inline-flex items-center gap-2 hover:bg-[#FF5100] transition-colors cursor-pointer">
                                                    <Play size={12} />
                                                    <span>[ Run Simulated API Call ]</span>
                                                    <span className="text-[10px] opacity-80">
                                                        {project.apiSimulator.method} {project.apiSimulator.endpoint}
                                                    </span>
                                                </button>

                                                <span className="text-[11px] text-neutral-400">
                                                    LATENCY: {isRunning ? "TESTING..." : project.apiSimulator.simulatedLatency}
                                                </span>
                                            </div>

                                            <div className="p-4 rounded-xs bg-black border border-white/10 overflow-x-auto">
                                                {isRunning ? (
                                                    <div className="py-4 text-center text-neutral-400 flex items-center justify-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#E64A11] animate-ping" />
                                                        <span>STREAMING RESPONSE...</span>
                                                    </div>
                                                ) : (
                                                    <pre className="text-neutral-200 text-[11px] leading-relaxed">
                                                        {JSON.stringify(project.apiSimulator.responsePayload, null, 2)}
                                                    </pre>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 text-xs">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="text-[#E64A11] hover:underline font-bold inline-flex items-center gap-1">
                                                <span>READ COMPLETE CASE STUDY ROUTE</span>
                                                <ArrowUpRight size={13} />
                                            </Link>
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    );
                })}

            </div>

        </section>
    );
};

export default ProjectsSection;
