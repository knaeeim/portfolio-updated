"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    ArrowUpRight,
    FileText,
    CheckCircle2,
    Briefcase,
    Code2,
    ShieldCheck,
    Cpu,
    ExternalLink,
    Play,
    Send,
    Activity,
} from "lucide-react";

interface BannerProps {
    data?: any;
}

export const TerminalHero = ({ data }: BannerProps) => {
    // Interactive Recruiter vs Engineer Perspective Toggle
    const [perspective, setPerspective] = useState<"recruiter" | "engineer">("engineer");

    // Mini Terminal Prompt State
    const [terminalInput, setTerminalInput] = useState("");
    const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd: string; res: string }>>([
        { cmd: "init telemetry", res: "NODE_READY: naeeim-production-cluster (latency: 34ms)" },
    ]);

    const general = data?.general || {};
    const name = general.name || "Khairul Bashar Naeeim";
    const company = general.company || "WebZen Bangladesh";
    const profileImage = general.profileImage || "/profilePicture.jpg";

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = terminalInput.trim().toLowerCase();
        if (!cmd) return;

        let response = "";
        if (cmd === "help") {
            response = "AVAILABLE: status, stack, cp, contact, clear";
        } else if (cmd === "status") {
            response = "FOUNDER & CEO // AVAILABLE FOR ADVISORY & SYSTEM ARCHITECTURE";
        } else if (cmd === "stack") {
            response = "Next.js 16, TypeScript, PostgreSQL, Prisma, Modular Express, PyTorch";
        } else if (cmd === "cp") {
            response = "600+ SOLVED (Codeforces, LeetCode, CodeChef) // DS, Graphs, DP";
        } else if (cmd === "contact") {
            response = "EMAIL: kmnaeeim@gmail.com // WHATSAPP: +880 1712-854941";
        } else if (cmd === "clear") {
            setTerminalLogs([]);
            setTerminalInput("");
            return;
        } else {
            response = `COMMAND NOT FOUND: "${cmd}". TYPE "help" FOR MANIFEST.`;
        }

        setTerminalLogs((prev) => [...prev.slice(-4), { cmd: terminalInput, res: response }]);
        setTerminalInput("");
    };

    return (
        <section
            id="home"
            className="w-full border-b border-border bg-background relative overflow-hidden">
            
            {/* Top Structural Hairline with Crosshair Intersections */}
            <div className="w-full max-w-[1440px] mx-auto border-x border-border">
                
                {/* 12-Column Asymmetric Swiss Layout (8 cols left / 4 cols right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    
                    {/* LEFT COLUMN: 8 Columns - The Interactive System Blueprint */}
                    <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                        
                        {/* Blueprint Metadata Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-[#FF4F00]" />
                                <span className="tech-label text-foreground">
                                    SYSTEM BLUEPRINT // ARCHITECTURAL DOSSIER
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                                <span>LOC: DHAKA (BD)</span>
                                <span>•</span>
                                <span>STATUS: PRODUCTION-READY</span>
                            </div>
                        </div>

                        {/* High-Craft Editorial Headline */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.1]">
                                Resilient full-stack systems,{" "}
                                <span className="text-[#FF4F00] font-mono font-normal">type-safe</span> backends &amp; high-craft web apps.
                            </h1>

                            {/* Perspective Toggle: [ Recruiter ] vs [ Engineer ] */}
                            <div className="pt-1 flex items-center gap-2.5">
                                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                                    VIEW AS:
                                </span>
                                <div className="inline-flex p-0.5 rounded border border-border bg-card">
                                    <button
                                        type="button"
                                        onClick={() => setPerspective("recruiter")}
                                        className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold transition-all ${
                                            perspective === "recruiter"
                                                ? "bg-[#FF4F00] text-white shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}>
                                        Recruiter
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPerspective("engineer")}
                                        className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold transition-all ${
                                            perspective === "engineer"
                                                ? "bg-[#FF4F00] text-white shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}>
                                        Engineer
                                    </button>
                                </div>
                            </div>

                            {/* Crisp, Text-Light Subtext */}
                            <div className="min-h-[60px] pt-1">
                                <AnimatePresence mode="wait">
                                    {perspective === "recruiter" ? (
                                        <motion.div
                                            key="recruiter"
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-1.5">
                                            <p className="text-sm sm:text-base text-muted-foreground leading-snug">
                                                Founder &amp; CEO at <strong className="text-foreground">{company}</strong>. 
                                                Delivering scalable production web apps, clinical automation, and developer training.
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                                                <span className="text-foreground font-semibold">15+ Ventures</span>
                                                <span>•</span>
                                                <span className="text-foreground font-semibold">100+ Trained</span>
                                                <span>•</span>
                                                <span className="text-[#10B981] font-semibold">99.9% Uptime</span>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="engineer"
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-1.5">
                                            <p className="text-sm sm:text-base text-muted-foreground leading-snug">
                                                Specialized in <strong className="text-foreground">Next.js 16</strong>, <strong className="text-foreground">TypeScript</strong>, <strong className="text-foreground">PostgreSQL / Prisma</strong>, and modular backends. Grounded in <strong className="text-foreground">600+ CP problems</strong>.
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                                                <span className="text-[#FF4F00] font-semibold">TypeScript &amp; Node</span>
                                                <span>•</span>
                                                <span className="text-foreground font-semibold">Prisma / Postgres</span>
                                                <span>•</span>
                                                <span className="text-[#10B981] font-semibold">600+ Solved</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mechanical Keycap CTA Group */}
                        <div className="pt-2 flex flex-wrap items-center gap-2.5">
                            <a
                                href="#projects"
                                className="keycap-btn px-4 py-2 rounded bg-foreground text-background font-mono text-xs font-bold tracking-wider hover:bg-[#FF4F00] hover:text-white transition-colors inline-flex items-center gap-1.5">
                                <span>VIEW PROJECTS</span>
                                <ArrowUpRight size={13} />
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="keycap-btn px-3.5 py-2 rounded bg-card border border-border text-foreground font-mono text-xs font-semibold hover:border-foreground transition-all inline-flex items-center gap-1.5">
                                <FileText size={13} className="text-[#FF4F00]" />
                                <span>RESUME (PDF)</span>
                            </a>
                            <a
                                href="#contact"
                                className="px-3.5 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                                <span>CONTACT ↗</span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: 4 Columns - Live Environment Inspector & Architectural Portrait */}
                    <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-card/40">
                        
                        {/* Profile Frame with Architectural Coordinates */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-border pb-2">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                    <span>FOUNDER_PORTRAIT.RAW</span>
                                </span>
                                <span>ASPECT: 4:5</span>
                            </div>

                            <div className="relative aspect-4/5 w-full rounded border border-border overflow-hidden bg-muted group">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                                />
                                
                                {/* Exposed Technical Hairlines & Corner Coordinates */}
                                <div className="absolute inset-0 border border-border/40 pointer-events-none" />
                                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[9px] font-mono text-foreground font-bold">
                                    K. B. NAEEIM
                                </div>
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[9px] font-mono text-[#10B981] font-bold">
                                    ONLINE // DHAKA
                                </div>
                            </div>
                        </div>

                        {/* Live Environment Inspector Card */}
                        <div className="rounded border border-border bg-card p-4 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-border pb-2">
                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <Activity size={12} className="text-[#FF4F00]" />
                                    <span>ENVIRONMENT INSPECTOR</span>
                                </span>
                                <span className="text-[10px] text-[#10B981] font-bold">HEALTH: 100%</span>
                            </div>

                            {/* Telemetry Stats */}
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2 rounded bg-muted/40 border border-border/60">
                                    <div className="text-[10px] text-muted-foreground uppercase">ALGORITHMIC CP</div>
                                    <div className="text-sm font-bold text-foreground">600+ Solved</div>
                                    <div className="text-[9px] text-muted-foreground">CF / LeetCode</div>
                                </div>
                                <div className="p-2 rounded bg-muted/40 border border-border/60">
                                    <div className="text-[10px] text-muted-foreground uppercase">SSR LATENCY</div>
                                    <div className="text-sm font-bold text-[#10B981]">&lt;38ms</div>
                                    <div className="text-[9px] text-muted-foreground">Turbopack Vercel</div>
                                </div>
                            </div>

                            {/* Interactive Mini Terminal Prompt */}
                            <div className="space-y-1.5 pt-1">
                                <div className="text-[10px] text-muted-foreground flex items-center justify-between">
                                    <span>INTERACTIVE PROMPT</span>
                                    <span className="text-[9px]">type &quot;help&quot;</span>
                                </div>
                                
                                <div className="p-2 rounded bg-background border border-border text-[11px] space-y-1 font-mono max-h-24 overflow-y-auto">
                                    {terminalLogs.map((log, idx) => (
                                        <div key={idx} className="space-y-0.5">
                                            <div className="text-muted-foreground text-[10px]">
                                                &gt; {log.cmd}
                                            </div>
                                            <div className="text-foreground text-[10px] pl-2 border-l border-border">
                                                {log.res}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1 pt-1">
                                    <span className="text-[#FF4F00] text-[11px] font-bold">&gt;</span>
                                    <input
                                        type="text"
                                        value={terminalInput}
                                        onChange={(e) => setTerminalInput(e.target.value)}
                                        placeholder="status, stack, cp..."
                                        className="w-full bg-transparent text-[11px] text-foreground outline-none font-mono placeholder:text-muted-foreground/50"
                                    />
                                    <button
                                        type="submit"
                                        className="text-muted-foreground hover:text-[#FF4F00] transition-colors p-1">
                                        <Send size={11} />
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default TerminalHero;
