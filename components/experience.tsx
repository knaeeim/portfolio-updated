"use client";

import React, { useEffect } from "react";
import { Briefcase, MapPin, CheckCircle2, Presentation, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
    {
        company: "WebZen",
        role: "Founder & Chief Executive Officer",
        stack: "Venture Leadership & Enterprise Architecture",
        duration: "Nov 2025 — Present",
        location: "Dhaka, Bangladesh",
        icon: ShieldCheck,
        badge: "Executive Leadership",
        tech: ["Next.js 15", "TypeScript", "System Architecture", "Cloud Infrastructure", "Product Strategy"],
        link: "https://www.devojyotidutta.com/",
        linkLabel: "Flagship Production: devojyotidutta.com",
        description: [
            "Leading end-to-end venture strategy, technical architecture, and software delivery for corporate and medical clients.",
            "Architected and deployed the automated clinical medical booking platform for Dr. Devojyoti Dutta (devojyotidutta.com), achieving 100% digital slot booking automation.",
            "Overseeing product roadmaps, client consulting, server-side performance optimization, and high-availability deployments.",
        ],
    },
    {
        company: "BD Calling Academy",
        role: "Lead Web Instructor & Technical Mentor",
        stack: "MERN Stack & Next.js Architecture",
        duration: "Aug 2025 — Oct 2025",
        location: "Dhaka, Bangladesh",
        icon: Presentation,
        badge: "Engineering Mentorship",
        tech: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Code Review"],
        description: [
            "Mentored and trained a cohort of 100+ polytechnic engineering students in modern full-stack development.",
            "Designed technical curricula emphasizing industry-grade debugging, Git collaboration, and architecture patterns.",
            "Directed hands-on capstone projects, preparing junior engineers for market-ready software engineering careers.",
        ],
    },
];

interface ExperienceSectionProps {
    data?: any;
}

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
    const experienceList = data?.experience && data.experience.length > 0 ? data.experience : experiences;

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 80,
        });
    }, []);

    return (
        <section id="experience" className="py-8 sm:py-12 md:py-16 bg-background overflow-hidden relative">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                        <Briefcase size={13} />
                        <span>EXECUTIVE TRACK RECORD</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        Leadership &amp; Professional Experience
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-2">
                        A history of steering technological vision, launching scalable production systems, and empowering engineering teams.
                    </p>
                </div>

                <div className="relative">
                    {/* Central Timeline Rail */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent -translate-x-1/2" />

                    <div className="space-y-6 sm:space-y-8">
                        {experienceList.map((exp: any, index: number) => {
                            const isEven = index % 2 === 0;
                            const fallbackIcons = [ShieldCheck, Presentation, Briefcase, Sparkles];
                            const Icon = typeof exp.icon === "function" || typeof exp.icon === "object" ? exp.icon : fallbackIcons[index % fallbackIcons.length] || Briefcase;

                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col md:flex-row items-center group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 120}>
                                    {/* Timeline Pulsing Node */}
                                    <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full border-4 border-background bg-primary -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 shadow-md">
                                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
                                    </div>

                                    {/* Date/Location Side */}
                                    <div
                                        className={`hidden md:flex w-1/2 ${
                                            isEven ? "pr-12 justify-end text-right" : "pl-12 order-last justify-start text-left"
                                        }`}>
                                        <div className="space-y-2">
                                            <div className="inline-block text-xs font-mono text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                                                {exp.duration}
                                            </div>
                                            <div
                                                className={`flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-semibold ${
                                                    isEven ? "justify-end" : "justify-start"
                                                }`}>
                                                <MapPin size={13} />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card Side */}
                                    <div
                                        className={`w-full md:w-1/2 ${
                                            isEven ? "pl-9 sm:pl-12 md:pl-12" : "pl-9 sm:pl-12 md:pr-12 md:pl-0"
                                        }`}>
                                        <div className="relative p-5 sm:p-7 rounded-2xl border border-white/10 dark:border-white/5 bg-card/65 backdrop-blur-xl hover:bg-card/90 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                            {/* Mobile View Indicators */}
                                            <div className="md:hidden flex flex-wrap items-center gap-2 mb-3">
                                                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 uppercase">
                                                    {exp.duration}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                                                    <MapPin size={11} /> {exp.location}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1 mb-4">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2 sm:gap-2.5 text-primary">
                                                        <div className="p-1.5 sm:p-2 bg-primary/10 rounded-xl">
                                                            <Icon size={18} />
                                                        </div>
                                                        <h3 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
                                                            {exp.company}
                                                        </h3>
                                                    </div>
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-border">
                                                        {exp.badge}
                                                    </span>
                                                </div>

                                                <div className="mt-2">
                                                    <p className="text-base sm:text-lg font-bold text-foreground">
                                                        {exp.role}
                                                    </p>
                                                    <p className="text-xs text-primary font-medium">
                                                        {exp.stack}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Link highlight if present */}
                                            {exp.link && (
                                                <div className="mb-4">
                                                    <a
                                                        href={exp.link}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all">
                                                        <Sparkles size={12} />
                                                        <span>{exp.linkLabel}</span>
                                                        <ArrowUpRight size={13} />
                                                    </a>
                                                </div>
                                            )}

                                            {/* Achievement List */}
                                            <ul className="space-y-3">
                                                {exp.description?.map((bullet: string, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2.5">
                                                        <CheckCircle2
                                                            size={15}
                                                            className="text-primary shrink-0 mt-1"
                                                        />
                                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                            {bullet}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Tech Badges */}
                                            <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap gap-1.5">
                                                {exp.tech?.map((t: string, ti: number) => (
                                                    <span
                                                        key={ti}
                                                        className="text-[10px] font-semibold bg-muted/60 px-2.5 py-1 rounded-md text-muted-foreground border border-border/60">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
