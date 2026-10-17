"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    Terminal,
    Sparkles,
    ArrowUpRight,
    Download,
    CheckCircle2,
    ShieldCheck,
    Cpu,
    Activity,
    Layers,
    Users,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

interface BannerProps {
    data?: any;
}

const defaultBannerConfig = {
    name: "Khairul Bashar Naeeim",
    role: "Founder & CEO, Principal Full-Stack Architect",
    company: "WebZen",
    profileImage: "/profilePicture.jpg",
    resumeFile: "/resume.pdf",
    githubProfile: "https://github.com/knaeeim",
    linkedinProfile: "https://www.linkedin.com/in/kmnaeeim",
};

const defaultExecutiveMetrics = [
    { value: "15+", label: "Ventures & Solutions Delivered" },
    { value: "100+", label: "Engineers Mentored & Led" },
    { value: "99.9%", label: "Production System Reliability" },
    { value: "600+", label: "Algorithmic Challenges Solved" },
];

const domainPhrases = [
    "Digital Ventures",
    "HealthTech Platforms",
    "Scalable SaaS Engines",
    "Enterprise Architecture",
];

const PortfolioBanner = ({ data }: BannerProps) => {
    const [activeTab, setActiveTab] = useState<"overview" | "telemetry">("overview");

    // Dynamic typewriter text animation state
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const general = data?.general || {};
    const hero = data?.hero || {};

    const company = general.company || defaultBannerConfig.company;
    const name = general.name || defaultBannerConfig.name;
    const role = general.role || defaultBannerConfig.role;
    const profileImage = hero.profileImage || general.profileImage || defaultBannerConfig.profileImage;
    const resumeFile = general.resumeUrl || defaultBannerConfig.resumeFile;
    const bio = hero.bio || "I bridge the gap between visionary business strategy and rock-solid software engineering. Transforming complex client roadmaps into resilient, production-ready platforms that drive measurable growth.";
    const metrics = hero.metrics || defaultExecutiveMetrics;

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentTarget = domainPhrases[currentPhraseIndex];

        if (!isDeleting && displayedText !== currentTarget) {
            timeout = setTimeout(() => {
                setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
            }, 85);
        } else if (!isDeleting && displayedText === currentTarget) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2400);
        } else if (isDeleting && displayedText !== "") {
            timeout = setTimeout(() => {
                setDisplayedText(currentTarget.slice(0, displayedText.length - 1));
            }, 45);
        } else if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % domainPhrases.length);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentPhraseIndex]);

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 80,
        });
    }, []);

    return (
        <section
            id="home"
            className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-16 md:py-24">
            {/* Subtle Executive Tech Grid Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.035] dark:opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                    backgroundSize: "3.5rem 3.5rem",
                }}
            />

            {/* Ambient executive glow lights */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center z-10">
                {/* LEFT SIDE: Executive Value Proposition (7 Columns) */}
                <div className="lg:col-span-7 space-y-7" data-aos="fade-right">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="tracking-wide uppercase font-bold text-[11px]">
                            FOUNDER &amp; CEO • PRINCIPAL SYSTEM ARCHITECT
                        </span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-foreground font-bold">{company}</span>
                    </div>

                    {/* Headline with Live Typewriter & Shimmer Animation */}
                    <div className="space-y-3 min-h-[170px] sm:min-h-[195px] lg:min-h-[225px] flex flex-col justify-start">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.18]">
                            <span className="block">Architecting High-Growth</span>
                            <span className="block min-h-[1.25em] my-0.5 sm:my-1">
                                <span className="animate-shimmer-text font-black inline-block">
                                    {displayedText || "\u00A0"}
                                </span>
                                <span className="inline-block w-1 sm:w-1.5 h-[0.8em] bg-primary ml-1.5 align-middle animate-pulse" />
                            </span>
                            <span className="block">
                                &amp; Scalable Platforms.
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                            {bio}
                        </p>
                    </div>

                    {/* Executive Interactive Command Card */}
                    <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden">
                        {/* Tab Selector Header */}
                        <div className="bg-muted/40 px-4 py-2.5 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("overview")}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                        activeTab === "overview"
                                            ? "bg-background text-primary shadow-xs border border-border"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}>
                                    Executive Overview
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("telemetry")}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                        activeTab === "telemetry"
                                            ? "bg-background text-primary shadow-xs border border-border"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}>
                                    System Telemetry
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                                <ShieldCheck size={13} className="text-emerald-500" />
                                <span>Verified Founder Profile</span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 font-mono text-xs md:text-sm">
                            {activeTab === "overview" ? (
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-bold">FOUNDER:</span>
                                        <span className="text-foreground font-semibold">
                                            {name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-primary font-bold">LEADERSHIP:</span>
                                        <span className="text-blue-500 font-semibold">
                                            CEO @ {company}
                                        </span>
                                        <span className="text-muted-foreground">|</span>
                                        <span className="text-muted-foreground">
                                            Former Web Instructor @ BD Calling Academy
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-primary font-bold">FLAGSHIP LIVE:</span>
                                        <a
                                            href="https://www.devojyotidutta.com/"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="text-emerald-500 font-bold hover:underline inline-flex items-center gap-1">
                                            devojyotidutta.com
                                            <ArrowUpRight size={13} />
                                        </a>
                                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                                            Clinical Booking Platform
                                        </span>
                                    </div>
                                    <div className="pt-1 text-muted-foreground text-xs leading-relaxed font-sans">
                                        Proven track record in high-concurrency systems, Next.js 15 enterprise architecture, 
                                        and mentoring over 100+ engineers into industry-ready roles.
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 text-xs font-mono">
                                    <div className="flex items-center justify-between text-muted-foreground border-b border-border/50 pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-foreground font-bold text-xs">PRODUCTION CLUSTER TELEMETRY</span>
                                        </div>
                                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                            <Activity size={12} /> 99.98% SLA
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-muted-foreground text-[11px]">
                                        <div className="p-2 rounded-xl bg-muted/40 border border-border/50">
                                            <span className="text-foreground font-semibold">Core Framework:</span> Next.js 16 (Turbopack)
                                        </div>
                                        <div className="p-2 rounded-xl bg-muted/40 border border-border/50">
                                            <span className="text-foreground font-semibold">Flagship Live:</span> devojyotidutta.com
                                        </div>
                                        <div className="p-2 rounded-xl bg-muted/40 border border-border/50">
                                            <span className="text-foreground font-semibold">SSR Latency:</span> &lt;42ms Sub-Second
                                        </div>
                                        <div className="p-2 rounded-xl bg-muted/40 border border-border/50">
                                            <span className="text-foreground font-semibold">Security:</span> RBAC &amp; Protected /admin
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-xl px-7 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                            <a href="#projects">
                                Explore Flagship Ventures
                                <ChevronRight className="ml-1 size-4" />
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-xl px-6 font-semibold hover:-translate-y-0.5 transition-all">
                            <a href={resumeFile} download>
                                <Download className="mr-2 size-4" />
                                Executive CV
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="ghost"
                            className="rounded-xl px-5 text-muted-foreground hover:text-foreground">
                            <a href="#contact">
                                Schedule Call
                            </a>
                        </Button>
                    </div>

                    {/* Metric Counter Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/60">
                        {metrics.map((item: any, idx: number) => (
                            <div key={idx} className="space-y-0.5">
                                <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                                    {item.value}
                                </div>
                                <div className="text-xs text-muted-foreground font-medium leading-snug">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: CEO Portrait & Floating Live Badges (5 Columns) */}
                <div
                    className="lg:col-span-5 flex justify-center items-center relative"
                    data-aos="fade-left">
                    <div className="relative w-full max-w-sm sm:max-w-md">
                        {/* Decorative Gradient Glow Rings */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-blue-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 animate-pulse-glow" />

                        {/* Portrait Frame */}
                        <div className="relative rounded-3xl p-3 bg-gradient-to-b from-border/80 via-card to-border/40 border border-border shadow-2xl overflow-hidden backdrop-blur-md group">
                            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-muted">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 480px"
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                                {/* Name plate on portrait bottom */}
                                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                        <Sparkles size={11} />
                                        Founder &amp; CEO
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground leading-tight">
                                        {name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Lead Systems Architect • {company}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Live Badge 1: Devojyoti Project */}
                        <a
                            href="https://www.devojyotidutta.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="absolute -top-6 -left-4 sm:-left-8 p-3 rounded-2xl bg-card/95 border border-border shadow-xl backdrop-blur-md flex items-center gap-3 animate-float-slow hover:border-primary/40 transition-all z-20 group">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-110 transition-transform">
                                🌿
                            </div>
                            <div>
                                <div className="text-xs font-bold text-foreground flex items-center gap-1">
                                    <span>devojyotidutta.com</span>
                                    <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                    Flagship Production Live
                                </div>
                            </div>
                        </a>

                        {/* Floating Live Badge 2: Architecture & Mentorship */}
                        <div className="absolute -bottom-6 -right-4 sm:-right-8 p-3.5 rounded-2xl bg-card/95 border border-border shadow-xl backdrop-blur-md flex items-center gap-3 z-20">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-base shrink-0">
                                <Users size={18} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-foreground">
                                    100+ Engineers Led
                                </div>
                                <div className="text-[10px] text-muted-foreground font-medium">
                                    Mentored at BD Calling Academy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioBanner;
