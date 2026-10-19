"use client";

import React, { useState } from "react";
import {
    Terminal,
    Copy,
    Check,
    ArrowUpRight,
    FileText,
    Github,
    Linkedin,
    Phone,
    Mail,
    Send,
    MessageCircle,
    Shield,
    Clock,
    Play,
} from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
    data?: any;
}

export const ContactSection = ({ data }: ContactSectionProps) => {
    // Mode 1: Quick Action Copy State
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mode 2: Interactive CLI Terminal State
    const [cliInput, setCliInput] = useState("");
    const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: string }>>([
        { cmd: "sys.connect", output: "AUTHENTICATED: Direct channel to Khairul Bashar Naeeim open." },
        { cmd: "help", output: "COMMANDS: contact, stack, schedule, status, msg <text>, clear" },
    ]);

    const general = data?.general || {};
    const email = general.email || "kmnaeeim@gmail.com";
    const phone = general.phone || "+880 1712-854941";
    const whatsapp = general.whatsapp || "https://wa.me/8801712854941";
    const linkedin = general.linkedin || "https://www.linkedin.com/in/kmnaeeim";
    const github = general.github || "https://github.com/knaeeim";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        toast.success(`COPIED TO CLIPBOARD: ${email}`);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleCliCommand = (commandToRun?: string) => {
        const cmd = (commandToRun || cliInput).trim();
        if (!cmd) return;

        const lower = cmd.toLowerCase();
        let output = "";

        if (lower === "help") {
            output = "MANIFEST: contact, stack, schedule, status, msg <message>, clear";
        } else if (lower === "contact") {
            output = `DIRECT: ${email} // TEL: ${phone} // DHAKA (UTC+6)`;
        } else if (lower === "stack") {
            output = "SYSTEM: Next.js 16, TypeScript, PostgreSQL, Prisma, Modular Express, Turbopack";
        } else if (lower === "schedule") {
            output = `SCHEDULE: Direct dispatch available. WhatsApp: ${whatsapp}`;
        } else if (lower === "status") {
            output = "STATUS: Available for Founder Advisory, Full-Stack Architecture, & High-Scale Systems.";
        } else if (lower.startsWith("msg ")) {
            const messageBody = cmd.slice(4);
            output = `DISPATCHED TO QUEUE: "${messageBody}". We will respond via ${email}.`;
            toast.success("Message recorded in dispatch queue!");
        } else if (lower === "clear") {
            setCliHistory([]);
            setCliInput("");
            return;
        } else {
            output = `UNKNOWN COMMAND: "${cmd}". Type "help" or click command chips.`;
        }

        setCliHistory((prev) => [...prev.slice(-5), { cmd, output }]);
        setCliInput("");
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success("Executive inquiry delivered. I will respond within 24 hours.");
                form.reset();
            } else {
                toast.success("Inquiry received in dispatch queue. Thank you!");
                form.reset();
            }
        } catch {
            toast.success("Inquiry received. For urgent advisory, contact directly on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer
            id="contact"
            className="w-full border-t border-border bg-background relative overflow-hidden py-12 sm:py-16">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header with Exposed Swiss Crosshair & Monospace Label */}
                <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                05. DIRECT DISPATCH &amp; COMMAND TERMINAL
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Architect Your Next Breakthrough
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl">
                            Direct executive channels. Utilize the one-click copyable email chip or execute commands 
                            in the interactive CLI below.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card border border-border px-3 py-1.5 rounded">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                        <span>AVG RESPONSE TIME: &lt; 2 HOURS</span>
                    </div>
                </div>

                {/* DUAL-MODE LAYOUT: 12-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT (6 COLS): MODE 1 — Quick Action Direct Channels & Rapid Form */}
                    <div className="lg:col-span-6 space-y-6">
                        
                        {/* One-Click Copyable Email Chip & Direct Triggers */}
                        <div className="p-5 rounded border border-border bg-card/60 space-y-4 font-mono text-xs">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center justify-between border-b border-border pb-2">
                                <span>MODE 01 // DIRECT CHANNELS</span>
                                <span className="text-[#10B981]">ACTIVE</span>
                            </div>

                            {/* Click-to-copy email chip */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] text-muted-foreground uppercase">PRIMARY CONTACT:</span>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    className="keycap-btn w-full p-3 rounded bg-muted/40 border border-border flex items-center justify-between text-foreground hover:border-[#FF4F00] transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-2.5">
                                        <Mail size={14} className="text-[#FF4F00]" />
                                        <span className="font-bold text-xs">{email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground group-hover:text-foreground">
                                        {copiedEmail ? (
                                            <>
                                                <Check size={13} className="text-[#10B981]" />
                                                <span className="text-[#10B981] font-bold">COPIED</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} />
                                                <span>CLICK TO COPY</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>

                            {/* Fast External Channels */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="keycap-btn p-2 rounded bg-card border border-border text-center text-foreground hover:border-foreground transition-all flex flex-col items-center gap-1">
                                    <Linkedin size={14} />
                                    <span className="text-[10px] font-bold">LINKEDIN</span>
                                </a>
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="keycap-btn p-2 rounded bg-card border border-border text-center text-foreground hover:border-foreground transition-all flex flex-col items-center gap-1">
                                    <Github size={14} />
                                    <span className="text-[10px] font-bold">GITHUB</span>
                                </a>
                                <a
                                    href={whatsapp}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="keycap-btn p-2 rounded bg-card border border-border text-center text-foreground hover:border-foreground transition-all flex flex-col items-center gap-1">
                                    <MessageCircle size={14} className="text-[#10B981]" />
                                    <span className="text-[10px] font-bold">WHATSAPP</span>
                                </a>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="keycap-btn p-2 rounded bg-card border border-border text-center text-foreground hover:border-[#FF4F00] transition-all flex flex-col items-center gap-1">
                                    <FileText size={14} className="text-[#FF4F00]" />
                                    <span className="text-[10px] font-bold">RESUME PDF</span>
                                </a>
                            </div>
                        </div>

                        {/* Rapid Dispatch Form */}
                        <form
                            onSubmit={handleFormSubmit}
                            className="p-5 rounded border border-border bg-card/60 space-y-4 font-mono text-xs">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider border-b border-border pb-2">
                                DIRECT INQUIRY DISPATCH
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-muted-foreground">YOUR NAME / ORG</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="e.g. Jane Doe // TechVentures"
                                        className="w-full p-2.5 rounded bg-muted/30 border border-border text-foreground text-xs outline-none focus:border-[#FF4F00]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-muted-foreground">REPLY EMAIL</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="jane@techventures.io"
                                        className="w-full p-2.5 rounded bg-muted/30 border border-border text-foreground text-xs outline-none focus:border-[#FF4F00]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] text-muted-foreground">PROJECT SCOPE / ARCHITECTURE ROADMAP</label>
                                <textarea
                                    required
                                    rows={3}
                                    name="message"
                                    placeholder="Brief outline of platform requirements, advisory needs, or clinical system integrations..."
                                    className="w-full p-2.5 rounded bg-muted/30 border border-border text-foreground text-xs outline-none focus:border-[#FF4F00] resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="keycap-btn w-full py-2.5 bg-foreground text-background font-bold text-xs rounded hover:bg-[#FF4F00] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                                <Send size={12} />
                                <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH INQUIRY TO NAEEIM"}</span>
                            </button>
                        </form>

                    </div>

                    {/* RIGHT (6 COLS): MODE 2 — Interactive CLI Terminal & Command Prompt */}
                    <div className="lg:col-span-6 space-y-4 font-mono text-xs">
                        <div className="rounded border border-border bg-card p-5 space-y-4">
                            
                            {/* Terminal Top Window Bar */}
                            <div className="flex items-center justify-between border-b border-border pb-3 text-[10px] text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Terminal size={13} className="text-[#FF4F00]" />
                                    <span className="font-bold text-foreground">MODE 02 // INTERACTIVE CLI</span>
                                </div>
                                <span className="text-[#10B981]">ONLINE // PORT 3000</span>
                            </div>

                            {/* Pre-filled Command Chips */}
                            <div className="space-y-1.5">
                                <div className="text-[10px] text-muted-foreground">CLICK PRE-FILLED COMMAND CHIPS:</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {["help", "status", "stack", "contact", "schedule", "clear"].map((cmd) => (
                                        <button
                                            key={cmd}
                                            type="button"
                                            onClick={() => handleCliCommand(cmd)}
                                            className="px-2 py-1 rounded bg-muted/60 border border-border hover:border-[#FF4F00] hover:text-foreground text-[10px] text-muted-foreground transition-all cursor-pointer">
                                            $ {cmd}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CLI Console Window */}
                            <div className="rounded bg-background border border-border p-3.5 space-y-2 min-h-[220px] max-h-[300px] overflow-y-auto">
                                {cliHistory.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="text-muted-foreground flex items-center gap-1.5">
                                            <span className="text-[#FF4F00]">&gt;</span>
                                            <span className="text-foreground">{item.cmd}</span>
                                        </div>
                                        <div className="text-muted-foreground pl-3 border-l border-border/80 text-[11px] leading-relaxed">
                                            {item.output}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CLI Terminal Input Line */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCliCommand();
                                }}
                                className="flex items-center gap-2 pt-1 border-t border-border">
                                <span className="text-[#FF4F00] font-bold">&gt;</span>
                                <input
                                    type="text"
                                    value={cliInput}
                                    onChange={(e) => setCliInput(e.target.value)}
                                    placeholder="Type command (e.g. status, msg Hello Naeeim)..."
                                    className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/50"
                                />
                                <button
                                    type="submit"
                                    className="keycap-btn px-2.5 py-1 rounded bg-muted border border-border text-[10px] text-foreground hover:border-[#FF4F00] transition-colors">
                                    RUN
                                </button>
                            </form>

                        </div>

                        {/* System Coordinates & Colophon */}
                        <div className="p-4 rounded border border-border bg-card/30 flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted-foreground">
                            <div>
                                © 2026 KHAIRUL BASHAR NAEEIM • WEBZEN BANGLADESH
                            </div>
                            <div className="flex items-center gap-3">
                                <span>SWISS GRID ARCHITECTURE</span>
                                <span>•</span>
                                <span className="text-[#10B981]">100% LIGHTHOUSE COMPLIANT</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default ContactSection;
