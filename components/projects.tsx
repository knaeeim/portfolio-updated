"use client";

import React, { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

interface ProjectDossier {
    dossierNumber: string;
    id: string;
    title: string;
    subtitle: string;
    role: string;
    year: string;
    category: string;
    description: string;
    imageSrc: string;
    liveUrl: string;
    adminUrl?: string;
    techStack: string[];
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

const dossiers: ProjectDossier[] = [
    {
        dossierNumber: "01",
        id: "webzen-technologies",
        title: "WebZen Bangladesh (webzenbd.com)",
        subtitle: "Enterprise Architecture Studio & Scalable Venture Engine",
        role: "Founder & Chief Executive Officer (CEO)",
        year: "2024 — Present",
        category: "VENTURE STUDIO // ENTERPRISE SYSTEMS",
        description:
            "Flagship digital engineering studio founded and steered by Khairul Bashar Naeeim. Engineering high-concurrency SaaS applications, enterprise cloud platforms, and clinical systems with sub-40ms response times and zero-downtime microservices architectures.",
        imageSrc: "/uploads/1792203603681_Screenshot_2026-10-17_at_8.19.52_AM.png",
        liveUrl: "https://webzenbd.com/",
        techStack: ["Next.js 16", "TypeScript", "Turbopack", "Node.js", "PostgreSQL", "MongoDB Atlas", "Vercel Edge"],
        schemaDiagram: {
            layer1: "Edge CDN (Vercel Global Ingestion)",
            layer2: "Next.js 16 SSR & Edge Middleware Gateway",
            layer3: "Prisma Client ↔ In-Memory Stale-While-Revalidate Cache",
            layer4: "MongoDB Atlas Cluster + PostgreSQL Relational Data",
        },
        hardestProblem: {
            title: "Multi-Tenant Data Pooling & Hydration Drift",
            challenge: "High concurrency client revalidation caused connection pool exhaustion and intermittent hydration mismatches across polymorphic venture records.",
            resolution: "Implemented hybrid stale-while-revalidate in-memory caching with atomic MongoDB fallback and strict Turbopack SSR serialization, slashing database query overhead by 68% and guaranteeing zero hydration drift.",
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
    {
        dossierNumber: "02",
        id: "devojyoti-dutta",
        title: "Dr. Devojyoti Dutta Medical Portal",
        subtitle: "Automated Clinical Appointment Engine & Telemedicine Architecture",
        role: "Founder & Lead Systems Architect (WebZen)",
        year: "2026 Production",
        category: "HEALTHTECH // CLINICAL SAAS",
        description:
            "Engineered an automated clinical booking and patient management platform for Ayurvedacharya Dr. Devojyoti Dutta (NIA Jaipur Alumnus). Replaced physical chamber queues with real-time 3-step slot reservation, automated daily quota control, and physician administration center.",
        imageSrc: "/devojyoti/preview.png",
        liveUrl: "https://www.devojyotidutta.com/",
        adminUrl: "https://www.devojyotidutta.com/admin",
        techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Server Actions", "WhatsApp Cloud API", "Tailwind CSS"],
        schemaDiagram: {
            layer1: "Patient Web Client (Bilingual Bengali/English UX)",
            layer2: "Next.js 15 Server Actions (Input Validation & Sanitization)",
            layer3: "Redis Mutex Lock (Atomic Slot Concurrency Guard)",
            layer4: "PostgreSQL Patient Registry + WhatsApp Cloud Dispatch",
        },
        hardestProblem: {
            title: "Simultaneous Slot Race Conditions During Morning Quotas",
            challenge: "Multiple patients concurrently attempting to book the same restricted clinical appointment slot during morning release hours led to potential double-booking anomalies.",
            resolution: "Architected distributed Redis mutex locking alongside atomic PostgreSQL serializable transaction boundaries. If two requests collide for the same timestamp, transaction isolation guarantees exactly one succeeds while gracefully alerting the other.",
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
    {
        dossierNumber: "03",
        id: "imranh-me",
        title: "Imran Hossain (imranh.me)",
        subtitle: "Research Associate Platform, BIGD, BRAC University",
        role: "Lead Architect & Full-Stack Engineer (WebZen)",
        year: "2026 Production",
        category: "ACADEMIC WEB // INTERACTIVE CANVAS",
        description:
            "Engineered the academic and economic research platform for Imran Hossain (BIGD, BRAC University). Features interactive HTML5 canvas wave physics ('Equilibrium Wave Field'), publication index drawers, and econometric trend visualizations with sub-second page loads.",
        imageSrc: "/projects/imranh.jpg",
        liveUrl: "https://imranh.me/",
        techStack: ["Next.js 16", "Turbopack", "HTML5 Canvas Physics", "TypeScript", "Academic SEO", "Vercel Edge"],
        schemaDiagram: {
            layer1: "Cursor & Pointer Shockwave Vector Listener",
            layer2: "HTML5 Canvas Equilibrium Particle Field (60 FPS)",
            layer3: "Next.js 16 Static Regeneration (ISR Paper Drawers)",
            layer4: "Academic Paper CDN + OpenGraph Scholarly Index",
        },
        hardestProblem: {
            title: "Trigonometric Particle Simulation CPU Throttling",
            challenge: "Real-time interactive canvas wave simulation computed millions of sine/cosine operations per second, throttling mobile CPU threads below 38 FPS.",
            resolution: "Engineered precomputed sinusoidal lookup buffers and offscreen canvas double-buffering with requestAnimationFrame clamping, locking a steady 60 FPS on low-power devices without battery drain.",
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
    {
        dossierNumber: "04",
        id: "skill-bridge",
        title: "Skill-Bridge Enterprise",
        subtitle: "Tutor Marketplace with 3-Tier RBAC & Relational Scheduling",
        role: "Lead Full-Stack Architect",
        year: "2025",
        category: "EDTECH // RELATIONAL MARKETPLACE",
        description:
            "Full-stack educational booking marketplace connecting students with verified instructors. Built with a normalized PostgreSQL relational schema, Prisma ORM, and granular 3-tier Role-Based Access Control protecting sensitive tutor payout metrics.",
        imageSrc: "/skills/skill1.png",
        liveUrl: "https://skill-bridge-client-taupe.vercel.app/",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Modular Express", "JWT RBAC"],
        schemaDiagram: {
            layer1: "Student / Instructor / Admin Dashboards",
            layer2: "Modular Express Router + JWT Auth Middleware",
            layer3: "Prisma ORM Multi-Table Transaction Boundary",
            layer4: "PostgreSQL 3NF Normalized Schema (14 Tables)",
        },
        hardestProblem: {
            title: "Role Privilege Escalation on Shared API Surface",
            challenge: "Shared marketplace endpoints posed security risks of student accounts intercepting instructor payout balances or calendar reservation overrides.",
            resolution: "Constructed strict declarative RBAC middleware using cryptographic JWT claims and Zod response projection guards, strictly filtering database queries at the Prisma model layer.",
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
];

interface ProjectsSectionProps {
    data?: any;
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
    // Mode toggle per project: 'ui' vs 'schema'
    const [viewModes, setViewModes] = useState<Record<string, "ui" | "schema">>({
        "webzen-technologies": "ui",
        "devojyoti-dutta": "ui",
        "imranh-me": "ui",
        "skill-bridge": "ui",
    });

    // Code drawer collapse state for API simulator
    const [openSimulators, setOpenSimulators] = useState<Record<string, boolean>>({});
    const [simulatorRunning, setSimulatorRunning] = useState<Record<string, boolean>>({});

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
                <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                02. SELECTED WORKS &amp; CASE-STUDIES
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Interactive Engineering Dossiers
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                            Full-width technical deconstructions. Toggle between UI Previews and System Architecture Schemas, 
                            inspect solved bottlenecks, and simulate live API response payloads.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>4 DOSSIERS DOCUMENTED</span>
                    </div>
                </div>

                {/* Full-Width Horizontal Engineering Dossiers (01 through 04) */}
                <div className="divide-y divide-border border-y border-border">
                    {dossiers.map((dossier) => {
                        const currentView = viewModes[dossier.id] || "ui";
                        const isSimOpen = !!openSimulators[dossier.id];
                        const isSimRunning = !!simulatorRunning[dossier.id];

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

                                    <div className="flex items-center gap-4 text-xs font-mono">
                                        <span className="text-foreground font-semibold">{dossier.role}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{dossier.year}</span>
                                        <a
                                            href={dossier.liveUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="keycap-btn px-2.5 py-1 rounded bg-foreground text-background text-[11px] font-bold inline-flex items-center gap-1 hover:bg-[#FF4F00] hover:text-white transition-colors">
                                            <span>LIVE SYSTEM</span>
                                            <ArrowUpRight size={12} />
                                        </a>
                                    </div>
                                </div>

                                {/* Main Title & Description */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    <div className="lg:col-span-8 space-y-2">
                                        <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
                                            {dossier.title}
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
                                            {dossier.techStack.map((tech) => (
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
                                            {currentView === "ui" ? "PRODUCTION SCREEN CAPTURE" : "ARCHITECTURAL TOPOLOGY"}
                                        </span>
                                    </div>

                                    {/* Viewport Frame */}
                                    <div className="rounded border border-border bg-card overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            {currentView === "ui" ? (
                                                <motion.div
                                                    key="ui"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="relative aspect-16/9 sm:aspect-21/9 w-full bg-muted overflow-hidden">
                                                    <Image
                                                        src={dossier.imageSrc}
                                                        alt={dossier.title}
                                                        fill
                                                        sizes="(max-width: 1024px) 100vw, 1200px"
                                                        className="object-cover object-top filter grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                                                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-background/90 border border-border text-[10px] font-mono text-foreground">
                                                        VERIFIED PRODUCTION // {dossier.liveUrl}
                                                    </div>
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
                                <div className="p-4 sm:p-5 rounded border border-border bg-card/60 font-mono text-xs space-y-3">
                                    <div className="flex items-center justify-between border-b border-border pb-2">
                                        <span className="text-[10px] text-[#FF4F00] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Shield size={12} />
                                            <span>CHALLENGE &amp; RESOLUTION: {dossier.hardestProblem.title}</span>
                                        </span>
                                        <span className="text-[10px] text-[#10B981] font-bold">VERIFIED SOLVED</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                        <div className="space-y-1">
                                            <div className="text-[10px] text-muted-foreground uppercase">THE BOTTLENECK:</div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {dossier.hardestProblem.challenge}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] text-foreground font-bold uppercase">ARCHITECTURAL RESOLUTION:</div>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {dossier.hardestProblem.resolution}
                                            </p>
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
