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
    "shankhapushpi-ecommerce": {
        schemaDiagram: {
            layer1: "Next.js 15 Bilingual Client + Mobile POS",
            layer2: "Custom In-House Auth Engine (Zero Recurring Fee)",
            layer3: "Real-Time Stock Mutex Lock & Steadfast API Worker",
            layer4: "PostgreSQL ACID Central Pool + Encrypted Ledgers",
        },
        hardestProblem: {
            title: "Omnichannel Real-Time Stock Collision",
            challenge: "Simultaneous online checkouts and physical store barcode scans drawing from the same SKU risked overselling the last remaining unit.",
            resolution: "Implemented atomic database reservation mutex locks on order initiation with 10-min TTL; guarantees 100% unified inventory with zero double-selling.",
        },
        apiSimulator: {
            method: "POST",
            endpoint: "/api/pos/checkout-and-sync",
            simulatedLatency: "26ms",
            responsePayload: {
                status: "TRANSACTION_COMPLETED",
                invoiceNumber: "SHANKHA-POS-2026-419",
                itemDeducted: "ORGANIC_HONEY_500G (x1)",
                centralStockRemaining: 48,
                splitPayment: { cash: 250, bKash: 100 },
                smsReceipt: "SENT_TO_+88017XXXXXXXX",
                steadfastSync: "AUTO_MANIFEST_READY",
                recurringAuthCost: "0_USD",
            },
        },
    },
    "devojyoti-dutta": {
        schemaDiagram: {
            layer1: "Patient Web Client (Bengali/English) + Doctor Admin",
            layer2: "Next.js 15 Server Actions + 31-Question Clinical Form",
            layer3: "Slot Concurrency Guard (Atomic Slot Lock) + SMS Gateway",
            layer4: "Self-Hosted Coolify VPS + PostgreSQL + Backblaze B2",
        },
        hardestProblem: {
            title: "Simultaneous Slot Collisions & Concurrency",
            challenge: "Concurrent bookings during morning quota releases risked duplicate reservations for the exact same 15-minute slot.",
            resolution: "Distributed atomic slot reservation locks with 5-minute unconfirmed hold expiry; mathematically eliminates double-booking.",
        },
        apiSimulator: {
            method: "POST",
            endpoint: "/api/clinical/reserve-slot",
            simulatedLatency: "31ms",
            responsePayload: {
                status: "CONFIRMED",
                serialNumber: "AYUR-2026-DH-042",
                chamberSlot: "DHAKA_CHAMBER // 11:30 AM (15 Min)",
                patientClassification: "FOLLOW_UP_RECOGNIZED",
                dynamicFee: "600 BDT (Automatic Follow-Up Discount)",
                intakeFormLink: "https://devojyotidutta.com/form/tok_98234",
                rememberedDevice: "TRUSTED_1_CLICK",
                vpsBackupStatus: "DAILY_BACKBLAZE_B2_SYNCED",
            },
        },
    },
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
            techStack: Array.isArray(proj.tech) ? proj.tech : (Array.isArray(proj.techStack) ? proj.techStack : ["Next.js", "TypeScript", "PostgreSQL"]),
            liveUrl: proj.liveLink || proj.liveUrl,
            githubUrl: proj.clientLink || proj.githubUrl,
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
                    <span className="text-neutral-900 dark:text-white font-semibold">03. SELECTED WORKS</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    MAGAZINE SPREAD SHOWCASE
                </div>
                <div className="flex items-center gap-2">
                    <span>{displayProjects.length} REPOSITORIES</span>
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
                <span className="watermark-text text-[26vw] whitespace-nowrap">
                    WORKS // 03
                </span>
            </motion.div>

            {/* Project Spreads Container */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-10 z-20 relative space-y-20">
                
                {displayProjects.map((project: any, pIdx: number) => {
                    const isDrawerOpen = !!openDrawers[project.id];
                    const isRunning = !!simRunning[project.id];
                    const activeImgIdx = activeImageIndices[project.id] || 0;
                    const activeImg = project.images[activeImgIdx] || project.images[0];

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="border-b border-neutral-200 dark:border-neutral-800 pb-16 last:border-b-0 space-y-8 group">
                            
                            {/* Project Spread Perimeter Header */}
                            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-200 dark:border-white/5 pb-3 gap-2">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-[#E64A11] font-black tracking-widest text-sm sm:text-base">
                                        {project.dossierNumber}
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px]">
                                        // {project.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs">
                                    <span>{project.role}</span>
                                    <span>•</span>
                                    <span className="text-neutral-900 dark:text-white font-semibold">{project.year}</span>
                                </div>
                            </div>

                            {/* Main Magazine Layout: Left Solid Burnt Block / Right Breakout Mockup */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                                
                                {/* LEFT (4 COLS): Solid Burnt Orange Geometric Block */}
                                <div className="lg:col-span-4 relative aspect-square sm:aspect-4/3 lg:aspect-square rounded-sm burnt-stripes p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-2xl border border-[#E64A11]/60">
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
                                    <div className="relative aspect-16/9 sm:aspect-21/9 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0A0A09] overflow-hidden shadow-2xl group/screen">
                                        <Link
                                            href={`/projects/${project.id}`}
                                            prefetch={true}
                                            className="block w-full h-full relative cursor-pointer"
                                            aria-label={`Open Architectural Case Study: ${project.title}`}>
                                            <Image
                                                src={activeImg.src}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 900px"
                                                className="object-cover object-top filter grayscale-20 group-hover/screen:grayscale-0 group-hover/screen:scale-[1.02] transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                                            {/* Hover Prompt */}
                                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-wider opacity-0 group-hover/screen:opacity-100 transition-opacity">
                                                <span>EXPLORE CASE STUDY ROUTE</span>
                                                <ArrowUpRight size={12} className="text-[#E64A11]" />
                                            </div>
                                        </Link>

                                        {/* Multi-Screen Switcher Tabs */}
                                        {project.images.length > 1 && (
                                            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30 font-mono text-[10px]">
                                                {project.images.map((img: any, iIdx: number) => {
                                                    const isSelected = activeImgIdx === iIdx;
                                                    return (
                                                        <button
                                                            key={iIdx}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveImageIndices((prev) => ({
                                                                    ...prev,
                                                                    [project.id]: iIdx,
                                                                }));
                                                            }}
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
                                            <Link
                                                href={`/projects/${project.id}`}
                                                prefetch={true}
                                                className="block group/title cursor-pointer">
                                                <h3 className="editorial-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-neutral-900 dark:text-white group-hover/title:text-[#E64A11] transition-colors inline-flex items-center gap-2">
                                                    <span>{project.title}</span>
                                                    <ArrowUpRight size={26} className="opacity-0 group-hover/title:opacity-100 transition-all text-[#E64A11] -translate-x-2 group-hover/title:translate-x-0" />
                                                </h3>
                                            </Link>
                                            <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm max-w-xl">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                prefetch={true}
                                                className="px-3.5 py-1.5 rounded-xs bg-[#E64A11] text-white font-mono text-xs font-bold hover:bg-[#FF5100] transition-all inline-flex items-center gap-1.5 shadow-md">
                                                <span>CASE STUDY</span>
                                                <ArrowUpRight size={13} />
                                            </Link>

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="px-3 py-1.5 rounded-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-[#E64A11] dark:hover:text-white hover:border-[#E64A11] transition-all inline-flex items-center gap-1.5">
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
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="rounded-sm border border-[#E64A11]/50 bg-neutral-50 dark:bg-[#0A0A09] p-3.5 sm:p-6 space-y-4 sm:space-y-6 font-mono text-xs overflow-hidden shadow-xl">
                                        
                                        <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3 gap-2">
                                            <div className="flex items-center gap-2 text-[#E64A11] font-bold">
                                                <Shield size={14} />
                                                <span>SYSTEM ARCHITECTURE &amp; SIMULATOR // {project.dossierNumber}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleDrawer(project.id)}
                                                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer">
                                                <span>CLOSE DRAWER</span>
                                                <ChevronUp size={14} />
                                            </button>
                                        </div>

                                        {/* Bottleneck & Resolution Callout */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 rounded-xs bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-none">
                                            <div>
                                                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold block">
                                                    BOTTLENECK:
                                                </span>
                                                <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                                                    {project.hardestProblem.challenge}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-[#E64A11] uppercase font-bold block">
                                                    ARCHITECTURAL FIX:
                                                </span>
                                                <p className="text-neutral-900 dark:text-white mt-1 font-medium">
                                                    {project.hardestProblem.resolution}
                                                </p>
                                            </div>
                                        </div>

                                        {/* API Simulator Trigger & Monospace Payload */}
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => runApiSimulator(project.id)}
                                                    className="px-3 py-1.5 rounded-xs bg-[#E64A11] text-white font-bold inline-flex items-center gap-2 hover:bg-[#FF5100] transition-colors cursor-pointer shadow">
                                                    <Play size={12} />
                                                    <span>[ Run Simulated API Call ]</span>
                                                    <span className="text-[10px] opacity-80">
                                                        {project.apiSimulator.method} {project.apiSimulator.endpoint}
                                                    </span>
                                                </button>

                                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                                                    LATENCY: {isRunning ? "TESTING..." : project.apiSimulator.simulatedLatency}
                                                </span>
                                            </div>

                                            <div className="p-3 sm:p-4 rounded-xs bg-neutral-900 dark:bg-black border border-neutral-800 dark:border-white/10 overflow-x-auto shadow-inner">
                                                {isRunning ? (
                                                    <div className="py-4 text-center text-neutral-400 flex items-center justify-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#E64A11] animate-ping" />
                                                        <span>STREAMING RESPONSE...</span>
                                                    </div>
                                                ) : (
                                                    <pre className="text-emerald-400 dark:text-emerald-300 text-[10px] sm:text-[11px] leading-relaxed">
                                                        {JSON.stringify(project.apiSimulator.responsePayload, null, 2)}
                                                    </pre>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 text-xs">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                prefetch={true}
                                                className="text-[#E64A11] hover:underline font-bold inline-flex items-center gap-1">
                                                <span>READ COMPLETE CASE STUDY ROUTE</span>
                                                <ArrowUpRight size={13} />
                                            </Link>
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    );
                })}

            </div>

        </section>
    );
};

export default ProjectsSection;
