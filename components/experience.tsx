"use client";

import React, { useEffect } from "react";
import { Briefcase, MapPin, CheckCircle2, Presentation } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
    {
        company: "BdCalling Academy",
        role: "Web Instructor",
        stack: "(MERN Stack & Next.js)",
        duration: "Sep 2025 — Nov 2025",
        location: "Dhaka, Bangladesh",
        icon: Presentation,
        tech: ["React", "Next.js", "Node.js", "Tailwind"],
        description: [
            "Taught MERN Stack and Next.js fundamentals to Polytechnic students.",
            "Guided students in debugging, problem-solving, and project-based learning.",
            "Provided technical mentoring and hands-on development support.",
        ],
    },
    // Add future experiences here; they will automatically flip sides
];

const ExperienceSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section id="experience" className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20" data-aos="fade-up">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-4">
                        <Briefcase size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Professional Experience
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-xl">
                        A timeline of my professional growth, mentorship, and technical
                        contributions.
                    </p>
                </div>

                <div className="relative">
                    {/* Central Timeline Rail (Hidden on small mobile, centered on desktop) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary via-border to-transparent -translate-x-1/2" />

                    <div className="space-y-16">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            const Icon = exp.icon;

                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col md:flex-row items-center group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}>
                                    {/* Timeline Pulsing Node */}
                                    <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full border-4 border-background bg-primary -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300">
                                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                                    </div>

                                    {/* Date/Location Side (Alternates) */}
                                    <div
                                        className={`hidden md:flex w-1/2 ${isEven ? "pr-12 justify-end text-right" : "pl-12 order-last justify-start text-left"}`}>
                                        <div className="space-y-2">
                                            <span className="inline-block text-sm font-mono text-primary font-bold bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20">
                                                {exp.duration}
                                            </span>
                                            <div
                                                className={`flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-semibold ${isEven ? "justify-end" : "justify-start"}`}>
                                                <MapPin size={12} />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card Side (Alternates) */}
                                    <div
                                        className={`w-full md:w-1/2 ${isEven ? "pl-12 md:pl-12" : "pl-12 md:pr-12 md:pl-0"}`}>
                                        <div className="relative p-8 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                            {/* Mobile View Indicators */}
                                            <div className="md:hidden flex flex-wrap gap-2 mb-4">
                                                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 uppercase">
                                                    {exp.duration}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1 mb-6">
                                                <div className="flex items-center gap-3 text-primary">
                                                    <div className="p-2 bg-primary/5 rounded-lg">
                                                        <Icon size={22} />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-foreground tracking-tight">
                                                        {exp.company}
                                                    </h3>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-lg font-semibold text-foreground/90">
                                                        {exp.role}
                                                    </p>
                                                    <p className="text-sm text-primary font-medium italic">
                                                        {exp.stack}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Achievement List */}
                                            <ul className="space-y-4">
                                                {exp.description.map((bullet, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-3 group/item">
                                                        <div className="mt-1.5 shrink-0 transition-transform group-hover/item:scale-110">
                                                            <CheckCircle2
                                                                size={16}
                                                                className="text-primary/60"
                                                            />
                                                        </div>
                                                        <p className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                                                            {bullet}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Tech Badges */}
                                            <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-2">
                                                {exp.tech.map((t, ti) => (
                                                    <span
                                                        key={ti}
                                                        className="text-[10px] font-medium bg-muted/50 px-3 py-1 rounded-full text-muted-foreground border border-transparent hover:border-primary/20 transition-colors">
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
