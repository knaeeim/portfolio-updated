"use client";

import React, { useEffect } from "react";
import {
    Code2,
    LayoutTemplate,
    Server,
    Database as DbIcon,
    Wrench,
    BrainCircuit,
    Cloud,
    Shield,
    Users,
    Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const skillCategories = [
    {
        title: "Enterprise Architecture & Cloud",
        icon: Cloud,
        description: "Designing resilient, high-availability distributed systems and cloud platforms.",
        skills: ["Next.js 15 (Turbopack)", "Server Actions", "Vercel Cloud", "Microservices Design", "REST APIs", "WebSocket Telemetry"],
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
        title: "Full-Stack Frontend & UX",
        icon: LayoutTemplate,
        description: "Crafting fluid, high-conversion interfaces with sub-second performance.",
        skills: ["React 19", "TypeScript", "Tailwind CSS 4", "Responsive Architecture", "Shadcn UI", "Accessibility (a11y)"],
        color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    },
    {
        title: "Backend Engines & Scalable Services",
        icon: Server,
        description: "Rock-solid backend logic, authentication security, and transactional reliability.",
        skills: ["Node.js", "Express.js", "Prisma ORM", "RBAC Security", "JWT Authentication", "API Gateway Logic"],
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
        title: "Databases & Data Integrity",
        icon: DbIcon,
        description: "Optimized relational and document datastores with zero redundancy.",
        skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Schema Normalization", "Query Tuning"],
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
        title: "Algorithmic Precision & Languages",
        icon: BrainCircuit,
        description: "Deep mathematical rigor rooted in 600+ solved algorithmic challenges.",
        skills: ["C++", "C", "C#", "Python", "JavaScript (ES6+)", "Data Structures & Algorithms"],
        color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
    {
        title: "Engineering Leadership & Governance",
        icon: Users,
        description: "Cultivating engineering excellence, technical roadmaps, and mentoring teams.",
        skills: ["Agile Sprint Leadership", "Technical Architecture Roadmaps", "Code Review Governance", "Talent Mentorship", "Client Advisory"],
        color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    },
];

interface SkillsSectionProps {
    data?: any;
}

const SkillsSection = ({ data }: SkillsSectionProps) => {
    const categories = data?.skills && data.skills.length > 0 ? data.skills : skillCategories;

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 80,
        });
    }, []);

    return (
        <section id="skills" className="py-12 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                        <Code2 size={13} />
                        <span>EXECUTIVE CAPABILITIES</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        Technical Arsenal &amp; Architecture Standards
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-2">
                        A curated suite of enterprise technologies, frameworks, and methodologies deployed to engineer mission-critical platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                    {categories.map((category: any, index: number) => {
                        const fallbackIcons = [Cloud, Server, DbIcon, Code2, LayoutTemplate, BrainCircuit];
                        const fallbackColors = [
                            "text-blue-500 bg-blue-500/10 border-blue-500/20",
                            "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
                            "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
                            "text-amber-500 bg-amber-500/10 border-amber-500/20",
                            "text-pink-500 bg-pink-500/10 border-pink-500/20",
                            "text-violet-500 bg-violet-500/10 border-violet-500/20",
                        ];
                        const Icon = typeof category.icon === "function" || typeof category.icon === "object"
                            ? category.icon
                            : fallbackIcons[index % fallbackIcons.length] || Code2;
                        const cardColor = category.color || fallbackColors[index % fallbackColors.length];

                        return (
                            <div
                                key={index}
                                className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-card/50 backdrop-blur-md hover:bg-card hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}>
                                <div>
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${cardColor} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug">
                                            {category.title}
                                        </h3>
                                    </div>

                                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                    {category.description}
                                </p>

                                {/* Skill Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills?.map((skill: string, sIndex: number) => (
                                        <span
                                            key={sIndex}
                                            className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border/60 text-xs font-semibold text-muted-foreground group-hover:text-foreground group-hover:border-primary/20 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative background glow for card */}
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
