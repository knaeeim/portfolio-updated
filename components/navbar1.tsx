"use client";

import React, { useState, useEffect } from "react";
import {
    Terminal,
    Search,
    ArrowUpRight,
    Command,
    Copy,
    Check,
    FileText,
    Mail,
    ExternalLink,
    Code2,
    Briefcase,
    GraduationCap,
    FlaskConical,
    X,
    Menu,
} from "lucide-react";
import { ModeToggle } from "./Theme-Switcher";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Navbar1Props {
    className?: string;
    companyName?: string;
    userName?: string;
}

const navLinks = [
    { number: "01", title: "ARCHITECTURE", href: "#architecture" },
    { number: "02", title: "SELECTED WORKS", href: "#projects" },
    { number: "03", title: "PROBLEM SOLVING", href: "#problem-solving" },
    { number: "04", title: "MENTORSHIP", href: "#mentorship" },
    { number: "05", title: "RESEARCH", href: "#research" },
];

export const Navbar1 = ({
    companyName = "WebZen Bangladesh",
    userName = "Khairul Bashar Naeeim",
}: Navbar1Props) => {
    const [currentTime, setCurrentTime] = useState("");
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedEmail, setCopiedEmail] = useState(false);

    // Live ticking Dhaka clock (UTC+6)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("en-GB", {
                timeZone: "Asia/Dhaka",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setCurrentTime(timeStr);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // ⌘K Keyboard Shortcut Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsCommandOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsCommandOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText("kmnaeeim@gmail.com");
        setCopiedEmail(true);
        toast.success("COPIED TO CLIPBOARD: kmnaeeim@gmail.com");
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const commandPaletteItems = [
        { label: "Navigate: 01. Architecture & Layer Matrix", href: "#architecture", icon: Code2 },
        { label: "Navigate: 02. Selected Works & Engineering Dossiers", href: "#projects", icon: Briefcase },
        { label: "Navigate: 03. 600+ Algorithmic Proof-of-Work", href: "#problem-solving", icon: Terminal },
        { label: "Navigate: 04. Mentorship & Polytechnic Syllabus", href: "#mentorship", icon: GraduationCap },
        { label: "Navigate: 05. Brain Tumor Hybrid CNN-ViT AI", href: "#research", icon: FlaskConical },
        { label: "Action: Copy Direct Email (kmnaeeim@gmail.com)", action: copyEmail, icon: Mail },
        { label: "Action: Download Executive CV (PDF)", href: "/resume.pdf", icon: FileText, download: true },
        { label: "External: Devojyoti Medical Production (Live)", href: "https://www.devojyotidutta.com/", icon: ExternalLink, external: true },
        { label: "External: WebZen Studio (webzenbd.com)", href: "https://webzenbd.com/", icon: ExternalLink, external: true },
    ];

    const filteredCommands = commandPaletteItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors">
                {/* 12-Column Blueprint Grid with Exposed 1px Hairlines */}
                <div className="w-full max-w-[1440px] mx-auto grid grid-cols-12 text-xs font-mono">
                    
                    {/* CELL 1: Coordinates & Live Ticking Clock (3 Columns) */}
                    <div className="col-span-6 lg:col-span-3 px-3 sm:px-4 py-2.5 sm:py-3 border-r border-border flex items-center justify-between gap-2 overflow-hidden">
                        <a href="#home" className="flex items-center gap-2 group truncate">
                            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                            <div className="flex flex-col truncate">
                                <span className="font-bold text-foreground tracking-tight text-[11px] group-hover:text-[#E64A11] transition-colors truncate">
                                    {userName}
                                </span>
                                <span className="text-[10px] text-muted-foreground tracking-widest uppercase truncate">
                                    23.8103° N, 90.4125° E // DHAKA
                                </span>
                            </div>
                        </a>
                        <div className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-muted/60 border border-border text-[10px] text-muted-foreground font-mono shrink-0">
                            {currentTime ? `${currentTime} UTC+6` : "DHAKA LIVE"}
                        </div>
                    </div>

                    {/* CELL 2: Numbered Blueprint Index Links (6 Columns) */}
                    <nav className="hidden lg:flex col-span-6 items-stretch justify-center divide-x divide-border">
                        {navLinks.map((link) => (
                            <a
                                key={link.number}
                                href={link.href}
                                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-3 text-[11px] tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all group">
                                <span className="text-[9px] text-[#E64A11] font-bold">
                                    {link.number}.
                                </span>
                                <span className="font-semibold group-hover:translate-x-0.5 transition-transform">
                                    {link.title}
                                </span>
                            </a>
                        ))}
                    </nav>

                    {/* CELL 3: Command Trigger (⌘K) & Telemetry (3 Columns) */}
                    <div className="col-span-6 lg:col-span-3 px-2 xs:px-4 py-2.5 sm:py-3 border-l border-border flex items-center justify-end gap-1.5 xs:gap-2.5">
                        {/* Mechanical Keycap ⌘K Trigger */}
                        <button
                            type="button"
                            onClick={() => setIsCommandOpen(true)}
                            className="keycap-btn inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 py-1 rounded bg-card border border-border text-[10px] xs:text-[11px] text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                            title="Open Command Palette (⌘K)">
                            <Command size={11} className="text-[#E64A11]" />
                            <span className="font-mono text-[10px] font-bold">⌘K</span>
                            <span className="hidden xl:inline text-[10px] text-muted-foreground">INDEX</span>
                        </button>

                        {/* Theme Switcher */}
                        <ModeToggle />

                        {/* Dispatch CTA */}
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-foreground text-background rounded text-[11px] font-bold tracking-wider hover:bg-[#FF4F00] hover:text-white transition-colors">
                            <span>DISPATCH</span>
                            <ArrowUpRight size={12} />
                        </a>

                        {/* Mobile Menu Trigger */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button
                                        type="button"
                                        className="keycap-btn p-1.5 rounded bg-card border border-border text-foreground">
                                        <Menu size={16} />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[280px] xs:w-80 max-w-[90vw] bg-background border-l border-border p-4 xs:p-6 font-mono">
                                    <SheetHeader className="text-left mb-6 pb-4 border-b border-border">
                                        <SheetTitle className="text-sm font-bold tracking-tight text-foreground flex items-center justify-between">
                                            <span>THE BLUEPRINT INDEX</span>
                                            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                        </SheetTitle>
                                        <p className="text-[11px] text-muted-foreground">
                                            {companyName} • DHAKA // UTC+6
                                        </p>
                                    </SheetHeader>

                                    <div className="space-y-1">
                                        {navLinks.map((link) => (
                                            <a
                                                key={link.number}
                                                href={link.href}
                                                className="flex items-center justify-between p-2.5 rounded border border-border/60 hover:border-[#FF4F00] hover:bg-muted/40 transition-all text-xs font-semibold text-foreground">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#FF4F00] font-bold">{link.number}.</span>
                                                    <span>{link.title}</span>
                                                </div>
                                                <ArrowUpRight size={13} className="text-muted-foreground" />
                                            </a>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border space-y-3">
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                            EXECUTIVE CONTACT
                                        </div>
                                        <button
                                            type="button"
                                            onClick={copyEmail}
                                            className="w-full flex items-center justify-between p-2 rounded bg-card border border-border text-xs text-foreground">
                                            <span>kmnaeeim@gmail.com</span>
                                            {copiedEmail ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
                                        </button>
                                        <a
                                            href="/resume.pdf"
                                            download
                                            className="w-full flex items-center justify-center gap-1.5 p-2 bg-[#FF4F00] text-white rounded text-xs font-bold tracking-wider">
                                            <FileText size={14} />
                                            <span>DOWNLOAD CV (PDF)</span>
                                        </a>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>

            {/* ⌘K Interactive Command Palette Modal */}
            {isCommandOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                    onClick={() => setIsCommandOpen(false)}>
                    <div
                        className="w-full max-w-xl bg-card border border-border rounded-lg shadow-2xl overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}>
                        
                        {/* Search Input Bar */}
                        <div className="flex items-center px-4 py-3 border-b border-border bg-muted/20">
                            <Search size={14} className="text-muted-foreground mr-2 shrink-0" />
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Type a command or jump to section (e.g. works, algorithm, email)..."
                                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-xs"
                            />
                            <button
                                type="button"
                                onClick={() => setIsCommandOpen(false)}
                                className="p-1 rounded text-muted-foreground hover:text-foreground">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Command List */}
                        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div key={idx}>
                                            {item.action ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        item.action();
                                                        setIsCommandOpen(false);
                                                    }}
                                                    className="w-full flex items-center justify-between p-2.5 rounded hover:bg-muted/80 text-foreground transition-colors group cursor-pointer text-left">
                                                    <div className="flex items-center gap-2.5">
                                                        <IconComponent size={14} className="text-[#FF4F00] shrink-0" />
                                                        <span className="font-medium text-[11px]">{item.label}</span>
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-background">
                                                        ENTER
                                                    </span>
                                                </button>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    download={item.download}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noreferrer noopener" : undefined}
                                                    onClick={() => setIsCommandOpen(false)}
                                                    className="flex items-center justify-between p-2.5 rounded hover:bg-muted/80 text-foreground transition-colors group">
                                                    <div className="flex items-center gap-2.5">
                                                        <IconComponent size={14} className="text-[#FF4F00] shrink-0" />
                                                        <span className="font-medium text-[11px]">{item.label}</span>
                                                    </div>
                                                    <ArrowUpRight size={13} className="text-muted-foreground group-hover:text-foreground" />
                                                </a>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-4 text-center text-muted-foreground text-xs">
                                    No commands found for &quot;{searchQuery}&quot;
                                </div>
                            )}
                        </div>

                        {/* Footer Status */}
                        <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                NAEEIM.SITE // BLUEPRINT OS v2.6
                            </span>
                            <span>Press ESC to close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
