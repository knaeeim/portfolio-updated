"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    ExternalLink,
    Code2,
    Shield,
    Database,
    Play,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Terminal,
    Layers,
    Server,
    Cpu,
    ImageIcon,
} from "lucide-react";

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
            layer1: "Edge CDN (Vercel Global Ingestion)",
            layer2: "Next.js 16 SSR & Edge Middleware",
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
        layer1: "Client UI Layer (Responsive Next.js Component)",
        layer2: "API Orchestration Gateway (Type-Safe Routes)",
        layer3: "Service Layer & Business Logic Interceptor",
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
            status: 200,
            health: "OPERATIONAL",
            latency: "28ms",
            cluster: "PRODUCTION_LIVE",
        },
    },
};

interface ProjectsSectionProps {
    data?: any;
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
    // Mode toggle per project: 'ui' vs 'schema'
    const [viewModes, setViewModes] = useState<Record<string, "ui" | "schema">>({});

    // Active image selector per project (for multi-image portfolios)
    const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

    // Code drawer collapse state for API simulator
    const [openSimulators, setOpenSimulators] = useState<Record<string, boolean>>({});
    const [simulatorRunning, setSimulatorRunning] = useState<Record<string, boolean>>({});

    // Read projects dynamically from database / portfolioData
    const rawProjects = Array.isArray(data?.projects) && data.projects.length > 0 ? data.projects : [];

    // Map projects with architectural specs
    const displayProjects = rawProjects.map((p: any, index: number) => {
        const spec = defaultArchitecturalData[p.id] || fallbackSpec;
        const numStr = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;

        // Ensure images is always a populated array
        const imagesList = Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : (p.imageSrc
                ? [{ src: p.imageSrc, label: "Screenshot", caption: "Production preview" }]
                : [{ src: "/devojyoti/preview.png", label: "Screenshot", caption: "Production preview" }]);

        return {
            dossierNumber: numStr,
            id: p.id || `project-${index}`,
            title: p.title || "Untitled Production Platform",
            subtitle: p.subtitle || "Scalable Web Application",
            role: p.role || "Lead Full-Stack Architect",
            year: p.year || "2026 Production",
            category: p.categoryLabel || p.category || "ENTERPRISE SYSTEMS",
            description: p.description || "",
            images: imagesList,
            liveUrl: p.liveLink || p.liveUrl || "",
            adminUrl: p.adminLink || p.adminUrl || "",
            clientLink: p.clientLink || "",
            serverLink: p.serverLink || "",
            techStack: Array.isArray(p.tech) ? p.tech : (Array.isArray(p.techStack) ? p.techStack : ["Next.js", "TypeScript", "Tailwind CSS"]),
            schemaDiagram: spec.schemaDiagram,
            hardestProblem: spec.hardestProblem,
            apiSimulator: spec.apiSimulator,
        };
    });

    const toggleViewMode = (projectId: string, mode: "ui" | "schema") => {
        setViewModes((prev) => ({ ...prev, [projectId]: mode }));
    };

    const runApiSimulator = (projectId: string) => {
        setSimulatorRunning((prev) => ({ ...prev, [projectId]: true }));
        setOpenSimulators((prev) => ({ ...prev, [projectId]: true }));
        setTimeout(() => {
            setSimulatorRunning((prev) => ({ ...prev, [projectId]: false }));
        }, 350);
    };

    return (
        <section
            id="projects"
            className="w-full border-b border-border bg-background relative overflow-hidden py-12 sm:py-16">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Header */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                02. SELECTED WORKS
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Engineering Dossiers
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>{displayProjects.length} WORKS DOCUMENTED</span>
                    </div>
                </div>

                {/* Full-Width Horizontal Engineering Dossiers */}
                <div className="divide-y divide-border border-y border-border">
                    {displayProjects.map((dossier: any) => {
                        const currentView = viewModes[dossier.id] || "ui";
                        const isSimOpen = !!openSimulators[dossier.id];
                        const isSimRunning = !!simulatorRunning[dossier.id];

                        // Current active image for this project
                        const activeIdx = activeImageIndices[dossier.id] || 0;
                        const currentImg = dossier.images[activeIdx] || dossier.images[0];

                        return (
                            <div
                                key={dossier.id}
                                className="py-10 sm:py-14 space-y-8 group">
                                
                                {/* Top Bar: Number, Category, Role, Year & Live Link */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg sm:text-xl font-mono font-bold text-[#FF4F00]">
                                            {dossier.dossierNumber}.
                                        </span>
                                        <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
                                            {dossier.category}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
                                        <span className="text-foreground font-semibold">{dossier.role}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{dossier.year}</span>
                                        
                                        {/* Dedicated Case Study Link */}
                                        <Link
                                            href={`/projects/${dossier.id}`}
                                            className="keycap-btn px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-[#FF4F00] transition-colors inline-flex items-center gap-1 text-[11px] font-semibold">
                                            <span>CASE STUDY</span>
                                            <ArrowUpRight size={11} className="text-[#FF4F00]" />
                                        </Link>

                                        {/* External Live Site Link */}
                                        {dossier.liveUrl && (
                                            <a
                                                href={dossier.liveUrl}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="keycap-btn px-2.5 py-1 rounded bg-foreground text-background text-[11px] font-bold inline-flex items-center gap-1 hover:bg-[#FF4F00] hover:text-white transition-colors">
                                                <span>LIVE SITE</span>
                                                <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Main Title & Description */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    <div className="lg:col-span-8 space-y-2">
                                        <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
                                            <Link href={`/projects/${dossier.id}`} className="hover:text-[#FF4F00] transition-colors">
                                                {dossier.title}
                                            </Link>
                                        </h3>
                                        <p className="text-xs sm:text-sm font-mono text-[#FF4F00]">
                                            {dossier.subtitle}
                                        </p>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                                            {dossier.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack Chips */}
                                    <div className="lg:col-span-4 space-y-2">
                                        <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                                            TECHNOLOGY STACK:
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {dossier.techStack.map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 rounded bg-muted/60 border border-border text-[11px] font-mono text-foreground font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 1. INTERACTIVE ARCHITECTURE TOGGLE ([ UI Preview ] vs [ System Schema ]) */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-border pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-muted-foreground uppercase">
                                                VIEWPORT MODE:
                                            </span>
                                            <div className="inline-flex p-0.5 rounded border border-border bg-card">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleViewMode(dossier.id, "ui")}
                                                    className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                                                        currentView === "ui"
                                                            ? "bg-[#FF4F00] text-white shadow-xs"
                                                            : "text-muted-foreground hover:text-foreground"
                                                    }`}>
                                                    [ UI Preview ]
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleViewMode(dossier.id, "schema")}
                                                    className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                                                        currentView === "schema"
                                                            ? "bg-[#FF4F00] text-white shadow-xs"
                                                            : "text-muted-foreground hover:text-foreground"
                                                    }`}>
                                                    [ System Schema / ER Diagram ]
                                                </button>
                                            </div>
                                        </div>

                                        <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                                            {currentView === "ui"
                                                ? `${dossier.images.length} SCREENSHOT${dossier.images.length > 1 ? "S" : ""} CONFIGURED`
                                                : "ARCHITECTURAL TOPOLOGY"}
                                        </span>
                                    </div>

                                    {/* Viewport Frame */}
                                    <div className="rounded border border-border bg-card overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            {currentView === "ui" ? (
                                                <motion.div
                                                    key={`ui-${activeIdx}-${currentImg?.src}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-0">
                                                    
                                                    {/* Screen Viewer */}
                                                    <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-muted overflow-hidden">
                                                        <Image
                                                            src={currentImg.src}
                                                            alt={currentImg.label || dossier.title}
                                                            fill
                                                            sizes="(max-width: 1024px) 100vw, 1200px"
                                                            className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent pointer-events-none" />
                                                        
                                                        {/* Caption Plate on Image Bottom */}
                                                        <div className="absolute bottom-3 inset-x-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                                                            <div className="flex items-center gap-2 pointer-events-auto">
                                                                <span className="px-2 py-1 rounded bg-background/90 border border-border text-[10px] font-mono text-foreground font-bold">
                                                                    {currentImg.label || "SCREENSHOT"}
                                                                </span>
                                                                {currentImg.caption && (
                                                                    <span className="hidden sm:inline px-2 py-1 rounded bg-background/80 border border-border/80 text-[10px] font-mono text-muted-foreground">
                                                                        {currentImg.caption}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="pointer-events-auto">
                                                                <Link
                                                                    href={`/projects/${dossier.id}`}
                                                                    className="px-2 py-1 rounded bg-background/90 border border-border text-[10px] font-mono text-[#FF4F00] hover:text-white hover:bg-[#FF4F00] transition-colors inline-flex items-center gap-1 font-bold">
                                                                    <span>CASE STUDY DETAILS</span>
                                                                    <ArrowUpRight size={11} />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Screenshot Gallery Switcher Tabs (If multiple images exist) */}
                                                    {dossier.images.length > 1 && (
                                                        <div className="p-2 sm:p-2.5 bg-muted/30 border-t border-border flex items-center gap-2 overflow-x-auto">
                                                            <span className="text-[10px] font-mono text-muted-foreground uppercase shrink-0 pl-1">
                                                                SCREENS:
                                                            </span>
                                                            {dossier.images.map((img: any, iIdx: number) => {
                                                                const isImgActive = activeIdx === iIdx;
                                                                return (
                                                                    <button
                                                                        key={iIdx}
                                                                        type="button"
                                                                        onClick={() => setActiveImageIndices((prev) => ({ ...prev, [dossier.id]: iIdx }))}
                                                                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                                                                            isImgActive
                                                                                ? "bg-[#FF4F00] text-white shadow-xs font-bold"
                                                                                : "bg-card border border-border text-muted-foreground hover:text-foreground"
                                                                        }`}>
                                                                        <span>0{iIdx + 1}.</span>
                                                                        <span>{img.label || `Screen ${iIdx + 1}`}</span>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="schema"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-6 sm:p-8 font-mono text-xs space-y-4 bg-muted/20">
                                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                        <Layers size={13} className="text-[#FF4F00]" />
                                                        <span>END-TO-END SYSTEM TOPOLOGY &amp; DATA PIPELINE</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                        <div className="p-3 rounded border border-border bg-card space-y-1">
                                                            <div className="text-[9px] text-[#FF4F00] font-bold">STAGE 01: INGRESS</div>
                                                            <div className="text-xs font-semibold text-foreground">
                                                                {dossier.schemaDiagram.layer1}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded border border-border bg-card space-y-1">
                                                            <div className="text-[9px] text-[#FF4F00] font-bold">STAGE 02: GATEWAY</div>
                                                            <div className="text-xs font-semibold text-foreground">
                                                                {dossier.schemaDiagram.layer2}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded border border-border bg-card space-y-1">
                                                            <div className="text-[9px] text-[#10B981] font-bold">STAGE 03: ORCHESTRATION</div>
                                                            <div className="text-xs font-semibold text-foreground">
                                                                {dossier.schemaDiagram.layer3}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded border border-border bg-card space-y-1">
                                                            <div className="text-[9px] text-[#10B981] font-bold">STAGE 04: PERSISTENCE</div>
                                                            <div className="text-xs font-semibold text-foreground">
                                                                {dossier.schemaDiagram.layer4}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-2.5 rounded bg-background border border-border text-[11px] text-muted-foreground">
                                                        <span className="text-foreground font-bold">Contract Guarantee:</span> All mutation RPCs enforce strict idempotency and relational consistency.
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* 2. THE HARDEST ENGINEERING PROBLEM (CHALLENGE & RESOLUTION) */}
                                <div className="p-3 sm:p-3.5 rounded border border-border bg-card/60 font-mono text-xs space-y-2">
                                    <div className="flex items-center justify-between border-b border-border pb-1.5">
                                        <span className="text-[10px] text-[#FF4F00] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Shield size={11} />
                                            <span>SOLVED: {dossier.hardestProblem.title}</span>
                                        </span>
                                        <span className="text-[10px] text-[#10B981] font-bold">OPTIMAL</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                                        <div className="text-xs">
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold">BOTTLENECK: </span>
                                            <span className="text-muted-foreground">
                                                {dossier.hardestProblem.challenge}
                                            </span>
                                        </div>
                                        <div className="text-xs">
                                            <span className="text-[10px] text-foreground uppercase font-bold">FIX: </span>
                                            <span className="text-foreground">
                                                {dossier.hardestProblem.resolution}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. LIVE REQUEST SIMULATOR ([ Run Sample API Call ]) */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => runApiSimulator(dossier.id)}
                                            className="keycap-btn px-3 py-1.5 rounded bg-muted border border-border text-foreground font-mono text-xs font-semibold inline-flex items-center gap-2 hover:border-[#FF4F00] transition-all cursor-pointer">
                                            <Play size={11} className="text-[#FF4F00]" />
                                            <span>[ Run Sample API Call ]</span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {dossier.apiSimulator.method} {dossier.apiSimulator.endpoint}
                                            </span>
                                        </button>

                                        {isSimOpen && (
                                            <button
                                                type="button"
                                                onClick={() => setOpenSimulators((prev) => ({ ...prev, [dossier.id]: !prev[dossier.id] }))}
                                                className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                                                <span>{isSimOpen ? "Hide Drawer" : "Show Drawer"}</span>
                                                {isSimOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                            </button>
                                        )}
                                    </div>

                                    {/* Collapsible Monospace JSON Code Drawer */}
                                    {isSimOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="rounded border border-border bg-background p-4 font-mono text-xs space-y-2 overflow-x-auto">
                                            <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border pb-1.5">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                                    <span>SIMULATED RESPONSE PAYLOAD</span>
                                                </span>
                                                <span>LATENCY: {isSimRunning ? "MEASURING..." : dossier.apiSimulator.simulatedLatency}</span>
                                            </div>

                                            {isSimRunning ? (
                                                <div className="py-4 text-center text-muted-foreground flex items-center justify-center gap-2">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-[#FF4F00] animate-ping" />
                                                    <span>EXECUTING CALL: {dossier.apiSimulator.endpoint}...</span>
                                                </div>
                                            ) : (
                                                <pre className="text-foreground text-[11px] leading-relaxed">
                                                    {JSON.stringify(dossier.apiSimulator.responsePayload, null, 2)}
                                                </pre>
                                            )}
                                        </motion.div>
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>

        </section>
    );
};

export default ProjectsSection;
