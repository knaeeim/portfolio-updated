"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    ExternalLink,
    Github,
    Sparkles,
    CheckCircle2,
    Calendar,
    Stethoscope,
    Shield,
    ShieldCheck,
    MessageCircle,
    Activity,
    Layers,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    Laptop,
    Check,
    Globe,
    Building2,
    GraduationCap,
    HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProjectItem {
    id: string;
    title: string;
    subtitle: string;
    category: "healthtech" | "edtech" | "proptech";
    categoryLabel: string;
    role: string;
    status: string;
    client?: string;
    year: string;
    description: string;
    images: {
        src: string;
        label: string;
        caption: string;
    }[];
    liveLink: string;
    clientLink?: string;
    serverLink?: string;
    adminLink?: string;
    tech: string[];
    features: {
        title: string;
        desc: string;
    }[];
    metrics: {
        value: string;
        label: string;
    }[];
    isFlagship?: boolean;
}

const projectsData: ProjectItem[] = [
    {
        id: "devojyoti-dutta",
        title: "Dr. Devojyoti Dutta Medical Portal",
        subtitle: "Ayurvedic Medical Platform & Smart Slot Booking Engine",
        category: "healthtech",
        categoryLabel: "HealthTech & Clinical SaaS",
        role: "Founder & Lead Systems Architect (WebZen)",
        status: "Production Live",
        client: "Ayurvedacharya Devojyoti Dutta (B.A.M.S., NIA Jaipur & B.Sc in BGE)",
        year: "2026 Production",
        isFlagship: true,
        description:
            "Engineered an end-to-end clinical appointment booking and digital healthcare portal for Dr. Devojyoti Dutta. Replaced manual queue management with an automated 3-step slot reservation engine, bilingual patient portal, doctor admin dashboard, and direct WhatsApp telemedicine consultation integration.",
        images: [
            {
                src: "/devojyoti/landing.jpg",
                label: "Clinical Home & Hero",
                caption: "Bilingual clinical homepage integrating Ayurvedic science, Epigenetics philosophy, and service directory.",
            },
            {
                src: "/devojyoti/booking.jpg",
                label: "Smart Slot Booking Engine",
                caption: "Automated 3-step appointment scheduling system with morning/evening slot availability and instant WhatsApp confirmation.",
            },
            {
                src: "/devojyoti/admin.jpg",
                label: "Doctor Practice Management",
                caption: "Protected doctor & staff portal (/admin) for patient queue oversight, daily consult volumes, and schedule controls.",
            },
            {
                src: "/devojyoti/preview.png",
                label: "Physician Profile",
                caption: "Dr. Devojyoti Dutta — NIA Jaipur Alumnus & Khulna University Genetics Graduate.",
            },
        ],
        liveLink: "https://www.devojyotidutta.com/",
        adminLink: "https://www.devojyotidutta.com/admin",
        tech: [
            "Next.js 15",
            "TypeScript",
            "Turbopack",
            "Tailwind CSS",
            "Server Actions",
            "WhatsApp Cloud API",
            "Lucide Icons",
            "Bilingual UX",
        ],
        features: [
            {
                title: "3-Step Smart Slot Booking",
                desc: "Automated real-time appointment scheduling with dynamic daily capacity control and instant confirmation slips.",
            },
            {
                title: "Doctor Admin Command Center",
                desc: "Secure practice management dashboard (/admin) to manage patient queues, chamber schedules, and patient intake.",
            },
            {
                title: "One-Click WhatsApp Telemedicine",
                desc: "Direct integration with WhatsApp helpline (+880 1712-854941) for seamless doctor-patient communication.",
            },
            {
                title: "Prakriti Diagnostic Assessment",
                desc: "Algorithmic constitutional test calculating Ayurvedic doshas (Vata, Pitta, Kapha) with tailored dietary advice.",
            },
            {
                title: "Clinical Library & Publications",
                desc: "Integrated knowledge repository showcasing medical publications, research papers, and 'স্বাস্থ্য দর্পণ' book.",
            },
            {
                title: "Sub-Second SSR & Medical SEO",
                desc: "High-speed Next.js SSR architecture with bilingual typography (Hind Siliguri) and Google-indexed medical schemas.",
            },
        ],
        metrics: [
            { value: "100%", label: "Automated Slot Scheduling" },
            { value: "5,000+", label: "Patient Inquiries Handled" },
            { value: "99.9%", label: "Platform Availability" },
            { value: "<0.8s", label: "Page Load Speed" },
        ],
    },
    {
        id: "skill-bridge",
        title: "Skill-Bridge Enterprise",
        subtitle: "Tutor Marketplace & Educational Booking Ecosystem",
        category: "edtech",
        categoryLabel: "EdTech & Marketplace",
        role: "Lead Full-Stack Architect",
        status: "Production Deployed",
        year: "2025",
        description:
            "A comprehensive full-stack tutoring marketplace engineered to connect students with certified instructors. Features multi-tenant Role-Based Access Control (RBAC), relational database modeling, and calendar session scheduling.",
        images: [
            {
                src: "/skills/skill1.png",
                label: "Student Marketplace",
                caption: "Interactive tutor catalog with subject filtering, reviews, and session pricing.",
            },
            {
                src: "/skills/skill2.png",
                label: "Tutor Schedule & Dashboard",
                caption: "Instructor portal managing upcoming sessions, student queries, and payout stats.",
            },
            {
                src: "/skills/skill3.png",
                label: "RBAC Admin Center",
                caption: "Centralized administrative control for platform moderation and user verification.",
            },
            {
                src: "/skills/skill4.png",
                label: "Booking & Escrow",
                caption: "Session booking flow with calendar availability and confirmation logic.",
            },
        ],
        liveLink: "https://skill-bridge-client-taupe.vercel.app/",
        clientLink: "https://github.com/knaeeim/skill-bridge-client",
        serverLink: "https://github.com/knaeeim/skill-bridge-server",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "REST API"],
        features: [
            {
                title: "Multi-Role RBAC Dashboards",
                desc: "Granular access controls separating student, tutor, and admin privileges.",
            },
            {
                title: "Session Scheduling Engine",
                desc: "Dynamic calendar booking system with conflict prevention.",
            },
            {
                title: "PostgreSQL Relational Schema",
                desc: "Normalized data architecture with Prisma ORM for relational integrity.",
            },
            {
                title: "JWT Encrypted Authentication",
                desc: "Industry-standard session validation with protected server routes.",
            },
        ],
        metrics: [
            { value: "3-Tier", label: "RBAC Security Layer" },
            { value: "100%", label: "Type-Safe Full-Stack" },
            { value: "Zero", label: "Double-Booking Conflicts" },
        ],
    },
    {
        id: "house-manager",
        title: "House Manager PropTech",
        subtitle: "Automated Building & Facility Management System",
        category: "proptech",
        categoryLabel: "PropTech & Automation",
        role: "Full-Stack System Architect",
        status: "Production Deployed",
        year: "2025",
        description:
            "Automated residential building management platform with digital bill payments, coupon validation engine, tenant notification board, and administrative facility oversight.",
        images: [
            {
                src: "/house/house1.png",
                label: "Tenant Portal",
                caption: "Apartment resident overview with pending utility dues and maintenance notices.",
            },
            {
                src: "/house/house2.png",
                label: "Billing & Payment Center",
                caption: "Digital billing interface with coupon application and payment verification.",
            },
            {
                src: "/house/house3.png",
                label: "Admin Building Control",
                caption: "Property manager dashboard showing occupancy, collections, and notices.",
            },
            {
                src: "/house/house4.png",
                label: "Notification Dispatch",
                caption: "Real-time announcement board broadcasting updates to all residents.",
            },
        ],
        liveLink: "https://house-manager-56098.web.app/",
        clientLink: "https://github.com/knaeeim/houseManager-client",
        serverLink: "https://github.com/knaeeim/houseManager-Server",
        tech: ["React.js", "Firebase", "TanStack Query", "Node.js", "Express", "Tailwind CSS"],
        features: [
            {
                title: "Automated Monthly Invoicing",
                desc: "Recurring bill calculation for rent, utilities, and facility upkeep.",
            },
            {
                title: "Dynamic Coupon Logic",
                desc: "Algorithmic validation engine applying promotional discounts on payments.",
            },
            {
                title: "Facility Management Hub",
                desc: "Centralized administrator console for unit allocations and tenant records.",
            },
            {
                title: "Real-Time Query Caching",
                desc: "TanStack Query integration for instant optimistic updates and sync.",
            },
        ],
        metrics: [
            { value: "100%", label: "Automated Billing Calculation" },
            { value: "Real-time", label: "Tenant Notifications" },
            { value: "Multi-Unit", label: "Occupancy Tracking" },
        ],
    },
];

const FlagshipShowcase = ({ project }: { project: ProjectItem }) => {
    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <div className="relative rounded-2xl sm:rounded-4xl border-2 border-emerald-500/30 bg-gradient-to-b from-card via-card to-emerald-950/10 shadow-2xl overflow-hidden p-4 sm:p-8 lg:p-10 mb-16 backdrop-blur-xl">
            {/* Ambient luxury glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Status & Role Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-border/80">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-bold tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        FLAGSHIP VENTURE
                    </span>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="text-xs font-bold text-foreground">
                        {project.role}
                    </span>
                </div>

                <div className="flex items-center gap-2 max-w-full">
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-lg border border-border max-w-full break-words">
                        Client: {project.client}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* LEFT: Multi-Device Interactive Screen Showcase (7 Columns) */}
                <div className="lg:col-span-7 space-y-4">
                    {/* Main Active Screen Display */}
                    <div className="relative aspect-16/10 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-muted/40 shadow-xl group">
                        <Image
                            src={project.images[selectedImgIndex].src}
                            alt={project.images[selectedImgIndex].label}
                            fill
                            priority
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        {/* Fullscreen zoom button */}
                        <button
                            type="button"
                            onClick={() => setLightboxOpen(true)}
                            aria-label="View Fullscreen"
                            className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer">
                            <Maximize2 size={18} />
                        </button>

                        {/* Screen description overlay */}
                        <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                    Screen {selectedImgIndex + 1} of {project.images.length}: {project.images[selectedImgIndex].label}
                                </span>
                                <span className="text-[11px] text-white/70 font-mono">
                                    Live Production Preview
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                                {project.images[selectedImgIndex].caption}
                            </p>
                        </div>
                    </div>

                    {/* Interactive Thumbnail Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                        {project.images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedImgIndex(idx)}
                                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                                    selectedImgIndex === idx
                                        ? "bg-emerald-500/10 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30"
                                        : "bg-card/40 border-border hover:bg-card/80 hover:border-border/90"
                                }`}>
                                <div className="text-[11px] font-bold text-foreground truncate">
                                    {img.label}
                                </div>
                                <div className="text-[10px] text-muted-foreground truncate">
                                    Click to preview
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Production Impact Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/60">
                        {project.metrics.map((m, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-card/60 border border-border/60 text-center space-y-0.5">
                                <div className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                    {m.value}
                                </div>
                                <div className="text-[10px] text-muted-foreground font-medium">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Interactive 3-Step Automated Clinical Workflow (Eliminates Empty Void on Left) */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-card/60 border border-border/80 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <Sparkles size={14} className="text-emerald-500" />
                                <span>Zero-Friction Patient Reservation Flow</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                Automated Engine
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1 hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                        1
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate">
                                        Chamber &amp; Slot
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-normal">
                                    Selects chamber location, dynamic date, and available slot.
                                </p>
                            </div>

                            <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1 hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                        2
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate">
                                        Instant WhatsApp
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-normal">
                                    Automated phone validation &amp; instant booking confirmation.
                                </p>
                            </div>

                            <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1 hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                        3
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate">
                                        Physician Sync
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-normal">
                                    Real-time sync to doctor admin dashboard with 0 conflict.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure & Telemedicine Certification Banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-card/60 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-foreground">
                                    Verified Production Infrastructure
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    Sub-second SSR latency • 100% digital slot booking automation
                                </div>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30 shrink-0 self-start sm:self-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>100% Live In Production</span>
                        </span>
                    </div>
                </div>

                {/* RIGHT: Architecture Deep-Dive & Action Links (5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                            <HeartPulse size={14} />
                            <span>Client Web Application Case Study</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                            {project.subtitle}
                        </p>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Key Built Features */}
                    <div className="space-y-3 pt-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Layers size={14} className="text-emerald-500" />
                            <span>Core Engineering Deliverables</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                            {project.features.map((feat, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl bg-card/50 border border-border/80 flex items-start gap-3">
                                    <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                                        <Check size={14} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground">
                                            {feat.title}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground leading-normal mt-0.5">
                                            {feat.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-2 pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Technology Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Direct Action Links */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button
                            asChild
                            size="lg"
                            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transition-all hover:-translate-y-0.5">
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer noopener">
                                <Globe className="mr-2 size-4 text-emerald-200" />
                                Visit Live Production Site
                                <ExternalLink className="ml-1.5 size-3.5 opacity-80" />
                            </a>
                        </Button>
                        {project.adminLink && (
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="rounded-xl border-emerald-500/30 hover:bg-emerald-500/10 font-semibold">
                                <a
                                    href={project.adminLink}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    <Shield className="mr-2 size-4 text-emerald-600 dark:text-emerald-400" />
                                    Doctor Portal (/admin)
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close modal"
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                        <X size={24} />
                    </button>
                    <div className="relative max-w-5xl w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <Image
                            src={project.images[selectedImgIndex].src}
                            alt={project.images[selectedImgIndex].label}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-4 text-center max-w-xl text-white space-y-1">
                        <div className="font-bold text-lg">
                            {project.images[selectedImgIndex].label}
                        </div>
                        <p className="text-xs text-white/70">
                            {project.images[selectedImgIndex].caption}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const StandardProjectCard = ({ project }: { project: ProjectItem }) => {
    const [imgIndex, setImgIndex] = useState(0);

    return (
        <div className="group rounded-3xl border border-border/80 bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 flex flex-col justify-between">
            {/* Top Image Slider */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/20">
                <Image
                    src={project.images[imgIndex].src}
                    alt={project.images[imgIndex].label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-bold text-foreground border border-border/60 uppercase tracking-wider">
                        {project.categoryLabel}
                    </span>
                </div>

                {/* Thumbnail dots selector */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    {project.images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setImgIndex(idx)}
                            aria-label={`View image ${idx + 1}`}
                            className={`rounded-full transition-all cursor-pointer ${
                                idx === imgIndex
                                    ? "w-6 h-1.5 bg-primary"
                                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                                {project.role}
                            </span>
                            <h4 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                                {project.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {project.subtitle}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {project.clientLink && (
                                <a
                                    href={project.clientLink}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="Client Repository"
                                    className="p-2.5 rounded-xl bg-muted/60 hover:bg-muted border border-border text-foreground hover:text-primary transition-all">
                                    <Github size={16} />
                                </a>
                            )}
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                title="Live Application"
                                className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm hover:scale-105 transition-all">
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-1">
                        {project.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                <span>
                                    <strong>{feat.title}:</strong> {feat.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Pills & Live Link Button */}
                <div className="pt-4 border-t border-border/50 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="px-2.5 py-1 rounded-md bg-muted/60 text-[10px] font-semibold text-muted-foreground border border-border/60">
                                {t}
                            </span>
                        ))}
                    </div>

                    <Button asChild variant="outline" className="w-full rounded-xl font-bold justify-between">
                        <a href={project.liveLink} target="_blank" rel="noreferrer noopener">
                            <span>Explore Live Platform</span>
                            <ExternalLink size={14} />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};

interface ProjectsSectionProps {
    data?: any;
}

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
    const [activeFilter, setActiveFilter] = useState<"all" | "healthtech" | "edtech" | "proptech">("all");

    const currentProjects: ProjectItem[] = (data?.projects && data.projects.length > 0)
        ? data.projects
        : projectsData;

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    const filteredProjects = currentProjects.filter((p) => {
        if (activeFilter === "all") return true;
        return p.category === activeFilter;
    });

    const flagship = currentProjects.find((p) => p.isFlagship) || currentProjects[0];
    const standardProjects = filteredProjects.filter((p) => !p.isFlagship || activeFilter === "healthtech");

    return (
        <section id="projects" className="py-24 bg-background relative overflow-hidden">
            {/* Ambient lighting behind projects section */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-12" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                        <Sparkles size={13} />
                        <span>FLAGSHIP VENTURES &amp; ARCHITECTURAL ACHIEVEMENTS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        Selected Production Platforms &amp; Client Case Studies
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
                        A curated portfolio of high-impact web platforms, HealthTech systems, and enterprise marketplaces engineered from initial ideation to production scale.
                    </p>
                </div>

                {/* Filter Navigation */}
                <div className="flex flex-wrap items-center gap-2 mb-12" data-aos="fade-up">
                    <button
                        type="button"
                        onClick={() => setActiveFilter("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeFilter === "all"
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:bg-card"
                        }`}>
                        All Ventures ({currentProjects.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveFilter("healthtech")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === "healthtech"
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:bg-card"
                        }`}>
                        <HeartPulse size={13} />
                        HealthTech &amp; Clinical (1)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveFilter("edtech")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === "edtech"
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:bg-card"
                        }`}>
                        <GraduationCap size={13} />
                        EdTech Marketplaces (1)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveFilter("proptech")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === "proptech"
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:bg-card"
                        }`}>
                        <Building2 size={13} />
                        PropTech Systems (1)
                    </button>
                </div>

                {/* Flagship Feature (Shows on 'all' and 'healthtech') */}
                {(activeFilter === "all" || activeFilter === "healthtech") && flagship && (
                    <div data-aos="fade-up">
                        <FlagshipShowcase project={flagship} />
                    </div>
                )}

                {/* Grid for Other Ventures */}
                {activeFilter !== "healthtech" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {filteredProjects
                            .filter((p) => !p.isFlagship)
                            .map((project, idx) => (
                                <div
                                    key={project.id}
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 150}>
                                    <StandardProjectCard project={project} />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;
