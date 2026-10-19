"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layers,
    Server,
    Database,
    Cpu,
    ArrowRight,
    CheckCircle2,
    Code2,
    Shield,
    Workflow,
    Zap,
} from "lucide-react";

interface TechNode {
    id: string;
    name: string;
    tag: string;
    layer: "client" | "api" | "data";
    connectedTo: string[];
    productionUsage: string;
    invariants: string[];
    slaMetric: string;
}

const techMatrix: TechNode[] = [
    // Layer 1: Client & Presentation Layer
    {
        id: "nextjs",
        name: "Next.js 16 (Turbopack)",
        tag: "FRAMEWORK",
        layer: "client",
        connectedTo: ["typescript", "serveractions", "postgres", "modular-express"],
        productionUsage: "Hybrid SSR/SSG rendering pipeline, dynamic server components, and route interceptors with sub-40ms edge response times.",
        invariants: ["Turbopack Zero-HMR Drift", "React 19 Server Actions", "Edge Caching"],
        slaMetric: "<38ms TTFB on Vercel Edge",
    },
    {
        id: "typescript",
        name: "TypeScript 5.8",
        tag: "LANGUAGE",
        layer: "client",
        connectedTo: ["nextjs", "react", "modular-express", "prisma"],
        productionUsage: "End-to-end type safety spanning client forms, API contract validation (Zod schemas), and Prisma database models.",
        invariants: ["Strict Null Checks", "Zero Any Invariants", "Inferred Schema Types"],
        slaMetric: "100% Type-Coverage Guarantee",
    },
    {
        id: "react",
        name: "React 19 & Framer",
        tag: "UI LIBRARY",
        layer: "client",
        connectedTo: ["nextjs", "typescript", "tailwind"],
        productionUsage: "Concurrent rendering, physics-based spring transitions (stiffness 300, damping 30), and zero-layout-shift micro-interactions.",
        invariants: ["Zero CLS Layout Invariance", "Spring Physics Kinetics", "Memoized Virtual Tree"],
        slaMetric: "60 FPS Fluid Interactions",
    },
    {
        id: "tailwind",
        name: "Tailwind CSS 4",
        tag: "DESIGN TOKENS",
        layer: "client",
        connectedTo: ["react", "nextjs"],
        productionUsage: "Swiss typographic grid execution, mechanical keycap tactile styling, and hairline 1px structural border architecture.",
        invariants: ["CSS Custom Property Tokens", "Zero Bloat Utility Engine", "Dark/Light Dynamic Mapping"],
        slaMetric: "Under 12KB Output Bundle",
    },

    // Layer 2: API & Orchestration Layer
    {
        id: "modular-express",
        name: "Modular Express Architecture",
        tag: "BACKEND ENGINE",
        layer: "api",
        connectedTo: ["typescript", "prisma", "postgres", "rbac-jwt"],
        productionUsage: "Domain-driven module isolation (routes, controllers, services, interfaces) with centralized error middleware and request sanitization.",
        invariants: ["Separation of Concerns", "Decoupled Business Logic", "Async Error Interceptors"],
        slaMetric: "P99 < 45ms Across REST Endpoints",
    },
    {
        id: "prisma",
        name: "Prisma ORM",
        tag: "DATA MAPPING",
        layer: "api",
        connectedTo: ["postgres", "typescript", "modular-express"],
        productionUsage: "Declarative schema modeling, automated migrations, relational joins, and atomic transactions ($transaction API) preventing dirty reads.",
        invariants: ["Relational Foreign Key Integrity", "Auto-Generated Typed Client", "Zero SQL Injection Vulnerability"],
        slaMetric: "Sub-millisecond ORM Overhead",
    },
    {
        id: "serveractions",
        name: "Next.js Server Actions",
        tag: "ORCHESTRATION",
        layer: "api",
        connectedTo: ["nextjs", "postgres", "mongodb"],
        productionUsage: "RPC-style server mutations without manual boilerplate routes, coupled with optimistic UI updates and automated revalidation.",
        invariants: ["CSRF Protection Inherent", "Server-Only Execution Boundaries", "Atomic Cache Invalidation"],
        slaMetric: "Instant Cache Mutation",
    },
    {
        id: "rbac-jwt",
        name: "RBAC & JWT Security",
        tag: "GOVERNANCE",
        layer: "api",
        connectedTo: ["modular-express", "postgres", "nextjs"],
        productionUsage: "Multi-tenant role-based access control protecting physician command centers, student portals, and administrative endpoints.",
        invariants: ["Cryptographic Token Signature", "HTTP-Only Secure Cookie Storage", "Granular Permission Guardrails"],
        slaMetric: "Zero-Trust Enforcement",
    },

    // Layer 3: Data, Persistence & Intelligence Layer
    {
        id: "postgres",
        name: "PostgreSQL",
        tag: "PRIMARY RDBMS",
        layer: "data",
        connectedTo: ["prisma", "modular-express", "typescript"],
        productionUsage: "ACID-compliant relational persistence, composite indexing on high-frequency lookups, and normalized third-normal-form (3NF) tables.",
        invariants: ["Strict Referential Integrity", "B-Tree Indexing Optimization", "Atomic Rollback Support"],
        slaMetric: "99.99% Data Consistency",
    },
    {
        id: "mongodb",
        name: "MongoDB Atlas",
        tag: "DOCUMENT STORE",
        layer: "data",
        connectedTo: ["serveractions", "nextjs"],
        productionUsage: "Flexible schema storage for polymorphic venture content, telemetry event streams, and real-time medical consultation logs.",
        invariants: ["Global Distributed Sharding", "Document Level Concurrency", "Dynamic Content Schema"],
        slaMetric: "High-Throughput Write Handling",
    },
    {
        id: "redis",
        name: "Redis Key-Value Cache",
        tag: "MEMORY ACCELERATION",
        layer: "data",
        connectedTo: ["modular-express", "postgres"],
        productionUsage: "In-memory query result caching, API rate-limiting token buckets, and distributed slot reservation locks preventing double-booking.",
        invariants: ["Atomic Lock Mutexes", "TTL Expire Invariants", "Sub-Millisecond Read Latency"],
        slaMetric: "<2ms Retrieval Latency",
    },
    {
        id: "pytorch",
        name: "PyTorch (ViT + CNN)",
        tag: "DEEP LEARNING",
        layer: "data",
        connectedTo: ["nextjs", "modular-express"],
        productionUsage: "Active medical AI model for brain tumor classification and boundary segmentation across 3,064+ MRI scans with Explainable Grad-CAM.",
        invariants: ["12-Head Self-Attention Stem", "Dual-Path Feature Bottleneck", "Saliency Interpretability"],
        slaMetric: "98.7% Diagnostic Precision",
    },
];

interface SkillsSectionProps {
    data?: any;
}

export const SkillSection = ({ data }: SkillsSectionProps) => {
    const [selectedNodeId, setSelectedNodeId] = useState<string>("prisma");

    const selectedNode = techMatrix.find((node) => node.id === selectedNodeId) || techMatrix[5];

    const isConnected = (nodeId: string) => {
        if (nodeId === selectedNodeId) return true;
        if (selectedNode.connectedTo.includes(nodeId)) return true;
        const targetNode = techMatrix.find((n) => n.id === nodeId);
        if (targetNode?.connectedTo.includes(selectedNodeId)) return true;
        return false;
    };

    const clientNodes = techMatrix.filter((n) => n.layer === "client");
    const apiNodes = techMatrix.filter((n) => n.layer === "api");
    const dataNodes = techMatrix.filter((n) => n.layer === "data");

    return (
        <section
            id="architecture"
            className="w-full border-b border-border bg-background relative overflow-hidden py-12 sm:py-16">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Section Header with Swiss Architectural Tagging */}
                <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                01. ARCHITECTURAL LAYER MATRIX
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Interactive 3-Tier System Architecture
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                            Hover or click any node to trace relational dependencies across the Client Layer, 
                            API Orchestration Layer, and Data Persistence Store.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground bg-card border border-border px-3 py-1.5 rounded">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                        <span>ACTIVE NODE: {selectedNode.name.toUpperCase()}</span>
                    </div>
                </div>

                {/* 12-Column Layout: 8 Cols Interactive Diagram / 4 Cols Monospace Production Inspector */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT (8 COLS): 3-Tier System Architecture Diagram */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* TIER 1: CLIENT & PRESENTATION LAYER */}
                        <div className="p-4 sm:p-5 rounded border border-border bg-card/60 space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
                                <span className="font-bold text-foreground flex items-center gap-2">
                                    <Layers size={13} className="text-[#FF4F00]" />
                                    <span>TIER 01: CLIENT &amp; PRESENTATION LAYER</span>
                                </span>
                                <span className="text-[10px]">SSR • REACT 19 • TURBOPACK</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                {clientNodes.map((node) => {
                                    const active = isConnected(node.id);
                                    const isCurrent = node.id === selectedNodeId;
                                    return (
                                        <button
                                            key={node.id}
                                            type="button"
                                            onClick={() => setSelectedNodeId(node.id)}
                                            onMouseEnter={() => setSelectedNodeId(node.id)}
                                            className={`p-3 rounded text-left font-mono transition-all border cursor-pointer ${
                                                isCurrent
                                                    ? "bg-[#FF4F00] text-white border-[#FF4F00] shadow-md"
                                                    : active
                                                    ? "bg-card border-[#FF4F00]/60 text-foreground"
                                                    : "bg-muted/30 border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                                            }`}>
                                            <div className="text-[9px] uppercase tracking-wider opacity-80">{node.tag}</div>
                                            <div className="text-xs font-bold truncate mt-0.5">{node.name}</div>
                                            <div className="text-[10px] mt-1 opacity-70 flex items-center gap-1">
                                                <span>{active ? "• Connected" : "— Standby"}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Visual Connector Hairline */}
                        <div className="flex justify-center items-center py-0.5">
                            <div className="h-4 w-px bg-border relative">
                                <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#FF4F00]" />
                            </div>
                        </div>

                        {/* TIER 2: API & ORCHESTRATION LAYER */}
                        <div className="p-4 sm:p-5 rounded border border-border bg-card/60 space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
                                <span className="font-bold text-foreground flex items-center gap-2">
                                    <Server size={13} className="text-[#FF4F00]" />
                                    <span>TIER 02: API &amp; ORCHESTRATION LAYER</span>
                                </span>
                                <span className="text-[10px]">MODULAR EXPRESS • PRISMA • RBAC</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                {apiNodes.map((node) => {
                                    const active = isConnected(node.id);
                                    const isCurrent = node.id === selectedNodeId;
                                    return (
                                        <button
                                            key={node.id}
                                            type="button"
                                            onClick={() => setSelectedNodeId(node.id)}
                                            onMouseEnter={() => setSelectedNodeId(node.id)}
                                            className={`p-3 rounded text-left font-mono transition-all border cursor-pointer ${
                                                isCurrent
                                                    ? "bg-[#FF4F00] text-white border-[#FF4F00] shadow-md"
                                                    : active
                                                    ? "bg-card border-[#FF4F00]/60 text-foreground"
                                                    : "bg-muted/30 border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                                            }`}>
                                            <div className="text-[9px] uppercase tracking-wider opacity-80">{node.tag}</div>
                                            <div className="text-xs font-bold truncate mt-0.5">{node.name}</div>
                                            <div className="text-[10px] mt-1 opacity-70 flex items-center gap-1">
                                                <span>{active ? "• Connected" : "— Standby"}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Visual Connector Hairline */}
                        <div className="flex justify-center items-center py-0.5">
                            <div className="h-4 w-px bg-border relative">
                                <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#10B981]" />
                            </div>
                        </div>

                        {/* TIER 3: DATA, PERSISTENCE & INTELLIGENCE LAYER */}
                        <div className="p-4 sm:p-5 rounded border border-border bg-card/60 space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
                                <span className="font-bold text-foreground flex items-center gap-2">
                                    <Database size={13} className="text-[#10B981]" />
                                    <span>TIER 03: DATA, PERSISTENCE &amp; INTELLIGENCE</span>
                                </span>
                                <span className="text-[10px]">POSTGRESQL • REDIS • PYTORCH</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                {dataNodes.map((node) => {
                                    const active = isConnected(node.id);
                                    const isCurrent = node.id === selectedNodeId;
                                    return (
                                        <button
                                            key={node.id}
                                            type="button"
                                            onClick={() => setSelectedNodeId(node.id)}
                                            onMouseEnter={() => setSelectedNodeId(node.id)}
                                            className={`p-3 rounded text-left font-mono transition-all border cursor-pointer ${
                                                isCurrent
                                                    ? "bg-[#10B981] text-white border-[#10B981] shadow-md"
                                                    : active
                                                    ? "bg-card border-[#10B981]/60 text-foreground"
                                                    : "bg-muted/30 border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                                            }`}>
                                            <div className="text-[9px] uppercase tracking-wider opacity-80">{node.tag}</div>
                                            <div className="text-xs font-bold truncate mt-0.5">{node.name}</div>
                                            <div className="text-[10px] mt-1 opacity-70 flex items-center gap-1">
                                                <span>{active ? "• Connected" : "— Standby"}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT (4 COLS): Monospace Production Usage Side-Panel */}
                    <div className="lg:col-span-4 sticky top-20">
                        <div className="rounded border border-border bg-card p-5 space-y-4 font-mono text-xs">
                            
                            <div className="flex items-center justify-between border-b border-border pb-3">
                                <div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                        NODE INSPECTION
                                    </span>
                                    <h3 className="text-sm font-bold text-foreground mt-0.5">
                                        {selectedNode.name}
                                    </h3>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/20">
                                    {selectedNode.tag}
                                </span>
                            </div>

                            {/* Production Architecture Usage Callout */}
                            <div className="space-y-1.5">
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                    PRODUCTION IMPLEMENTATION
                                </div>
                                <p className="text-xs text-foreground leading-relaxed p-3 rounded bg-muted/40 border border-border/70">
                                    {selectedNode.productionUsage}
                                </p>
                            </div>

                            {/* Architectural Invariants */}
                            <div className="space-y-2">
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                    ARCHITECTURAL INVARIANTS
                                </div>
                                <div className="space-y-1">
                                    {selectedNode.invariants.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[11px] text-foreground">
                                            <CheckCircle2 size={12} className="text-[#10B981] shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SLA Telemetry Benchmark */}
                            <div className="pt-2 border-t border-border flex items-center justify-between">
                                <span className="text-[10px] text-muted-foreground">SLA BENCHMARK:</span>
                                <span className="text-xs font-bold text-[#10B981]">{selectedNode.slaMetric}</span>
                            </div>

                            {/* Active Trace Graph */}
                            <div className="pt-2 border-t border-border space-y-1 text-[10px] text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>CONNECTED DEPENDENCIES:</span>
                                    <span className="text-foreground font-bold">{selectedNode.connectedTo.length} NODES</span>
                                </div>
                                <div className="flex flex-wrap gap-1 pt-1">
                                    {selectedNode.connectedTo.map((depId) => {
                                        const depNode = techMatrix.find((n) => n.id === depId);
                                        return (
                                            <span
                                                key={depId}
                                                className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-foreground">
                                                {depNode?.name.split(" ")[0] || depId}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default SkillSection;
