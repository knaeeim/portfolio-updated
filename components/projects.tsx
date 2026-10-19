"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ExternalLink,
    Sparkles,
    Shield,
    Globe,
    Building2,
    GraduationCap,
    HeartPulse,
    Briefcase,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProjectItem {
    id: string;
    title: string;
    subtitle: string;
    category: "healthtech" | "edtech" | "proptech" | "agency" | string;
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
        id: "webzen-technologies",
        title: "WebZen Bangladesh (webzenbd.com)",
        subtitle: "Next-Gen Enterprise Architecture, SaaS Development & Digital Ventures Studio",
        category: "agency",
        categoryLabel: "Ventures & Agency Studio",
        role: "Founder & Chief Executive Officer (CEO)",
        status: "Active Agency & Venture Studio",
        client: "Global Enterprise Clients, Tech Founders & Healthcare Ventures",
        year: "2024 — Present",
        isFlagship: true,
        description:
            "WebZen Bangladesh (webzenbd.com) is an elite digital engineering and technology studio founded and steered by Khairul Bashar Naeeim. We engineer resilient full-stack web platforms, mission-critical SaaS systems, and enterprise cloud solutions with sub-second performance, robust security, and scalable microservices architectures.",
        images: [
            {
                src: "/uploads/1792203603681_Screenshot_2026-10-17_at_8.19.52_AM.png",
                label: "WebZen Bangladesh Digital Studio",
                caption: "Engineering high-growth digital ventures & enterprise architectures",
            },
            {
                src: "/devojyoti/preview.png",
                label: "HealthTech Production Systems",
                caption: "Ayurvedic Medical Platform & smart clinical slot booking engine",
            },
        ],
        liveLink: "https://webzenbd.com/",
        adminLink: "https://webzenbd.com/",
        tech: [
            "Next.js 15",
            "React 19",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "MongoDB Atlas",
            "Tailwind CSS 4",
            "Vercel Cloud",
            "CI/CD Pipelines",
        ],
        features: [
            {
                title: "Full-Lifecycle Enterprise Product Engineering",
                desc: "Translating strategic business visions into production-grade digital platforms from architectural blueprint to global deployment.",
            },
            {
                title: "Sub-Second Latency & High Concurrency",
                desc: "Engineered with modern SSR architectures, edge caching, and database query optimization ensuring zero slowdown under load.",
            },
            {
                title: "AI & Deep Learning Systems Integration",
                desc: "Custom healthcare AI, vision models, and automated diagnostic workflows embedded into client web portals.",
            },
            {
                title: "Enterprise Security & RBAC Governance",
                desc: "Multi-tenant role-based access control, cryptographic session handling, and zero-trust authentication standards.",
            },
        ],
        metrics: [
            { value: "15+", label: "Platforms Delivered" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "Global", label: "Remote Engineering" },
        ],
    },
    {
        id: "devojyoti-dutta",
        title: "Dr. Devojyoti Dutta Medical Portal",
        subtitle: "Ayurvedic Medical Platform & Smart Slot Booking Engine",
        category: "healthtech",
        categoryLabel: "HealthTech & Clinical SaaS",
        role: "Founder & Lead Systems Architect (WebZen Bangladesh)",
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
        ],
        metrics: [
            { value: "100%", label: "Automated Invoicing" },
            { value: "Real-time", label: "Tenant Alerts" },
            { value: "Multi-Unit", label: "Occupancy Tracking" },
        ],
    },
];

const CompactProjectCard = ({ project }: { project: ProjectItem }) => {
    const isFlagship = Boolean(project.isFlagship);
    const mainImg = project.images?.[0]?.src || "/placeholder.jpg";
    const topMetric = project.metrics?.[0];

    return (
        <div
            className={`group rounded-2xl sm:rounded-3xl border bg-card/75 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${
                isFlagship
                    ? "border-primary/40 shadow-lg shadow-primary/5 hover:border-primary"
                    : "border-border/80 hover:border-primary/40"
            }`}>
            {/* Visual Thumbnail Frame */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/30">
                <Image
                    src={mainImg}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-bold text-foreground border border-border/70 uppercase tracking-wider">
                        {project.categoryLabel || "Venture"}
                    </span>

                    <div className="flex items-center gap-1.5">
                        {isFlagship && (
                            <span className="px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold shadow-sm">
                                Flagship
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live</span>
                        </span>
                    </div>
                </div>

                {/* Screen Count Badge */}
                {project.images && project.images.length > 1 && (
                    <div className="absolute bottom-2.5 right-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10">
                        {project.images.length} screens
                    </div>
                )}
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {project.role}
                        </span>
                        {project.year && (
                            <span className="text-[10px] font-mono text-muted-foreground">
                                {project.year}
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                        {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
                        {project.subtitle}
                    </p>

                    <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed pt-1">
                        {project.description}
                    </p>

                    {/* Metric Highlight Pill */}
                    {topMetric && (
                        <div className="pt-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/15 text-[11px]">
                                <span className="font-bold text-primary">{topMetric.value}</span>
                                <span className="text-muted-foreground">• {topMetric.label}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Card Actions & Tech */}
                <div className="space-y-3 pt-3 border-t border-border/50">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => (
                            <span
                                key={t}
                                className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-semibold text-muted-foreground border border-border/50">
                                {t}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="text-[10px] text-muted-foreground self-center font-mono">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <Button
                            asChild
                            size="sm"
                            className="flex-1 rounded-xl text-xs font-bold gap-1.5 h-9 bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href={`/projects/${project.id}`}>
                                <span>Case Study &amp; Architecture</span>
                                <ArrowRight size={13} />
                            </Link>
                        </Button>

                        {project.liveLink && (
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-xl px-2.5 h-9 border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground"
                                title="Visit Live Production Site">
                                <a href={project.liveLink} target="_blank" rel="noreferrer noopener">
                                    <Globe size={14} />
                                </a>
                            </Button>
                        )}

                        {project.adminLink && (
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-xl px-2.5 h-9 border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground"
                                title="Admin / Doctor Portal">
                                <a href={project.adminLink} target="_blank" rel="noreferrer noopener">
                                    <Shield size={14} />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProjectsSectionProps {
    data?: any;
}

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
    const [activeFilter, setActiveFilter] = useState<"all" | "agency" | "healthtech" | "edtech" | "proptech">("all");

    const currentProjects: ProjectItem[] =
        data?.projects && data.projects.length > 0 ? data.projects : projectsData;

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    const filteredProjects = currentProjects.filter((p) => {
        if (activeFilter === "all") return true;
        return p.category === activeFilter;
    });

    return (
        <section id="projects" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Ambient lighting behind projects section */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                        <Sparkles size={13} />
                        <span>FLAGSHIP VENTURES &amp; ARCHITECTURAL ACHIEVEMENTS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        Selected Production Platforms &amp; Client Case Studies
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                        A curated portfolio of high-impact web platforms, enterprise agency ventures (WebZen Bangladesh), and HealthTech systems engineered to production scale. Click any card to explore full blueprints and architectural specifications.
                    </p>
                </div>

                {/* Filter Navigation */}
                <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8" data-aos="fade-up">
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
                        onClick={() => setActiveFilter("agency")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeFilter === "agency"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:bg-card"
                        }`}>
                        <Briefcase size={13} />
                        WebZen Bangladesh Studio
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
                        HealthTech &amp; Clinical
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
                        EdTech Marketplaces
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
                        PropTech Systems
                    </button>
                </div>

                {/* Grid for All Selected Ventures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}>
                            <CompactProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
