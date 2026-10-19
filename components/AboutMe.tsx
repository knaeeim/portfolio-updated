"use client";

import React, { useEffect } from "react";
import {
    Cpu,
    Globe,
    Layers3,
    Trophy,
    Terminal,
    User,
    Heart,
    Compass,
    Target,
    Users,
    Briefcase,
    ShieldCheck,
    Lightbulb,
    Zap,
    TrendingUp,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./ui/button";

const strategicPillars = [
    {
        title: "Strategic System Architecture",
        desc: "Designing resilient, zero-bloat web systems engineered for long-term scalability, low latency, and zero data downtime.",
        icon: Cpu,
        tag: "Engineering Rigor",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
        title: "Engineering Leadership & Talent",
        desc: "Trained and mentored 100+ emerging engineers at BD Calling Academy, cultivating engineering disciplines and clean-code cultures.",
        icon: Users,
        tag: "Mentorship Impact",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
        title: "Algorithmic Precision",
        desc: "Solved 600+ complex competitive programming problems across LeetCode & Codeforces, translating mathematical rigor into optimal database queries.",
        icon: Target,
        tag: "Algorithmic Mastery",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
        title: "Venture Delivery & Client ROI",
        desc: "As Founder & CEO of WebZen, I deliver turnkey production platforms (such as Dr. Devojyoti Dutta's medical portal) that drive immediate business value.",
        icon: TrendingUp,
        tag: "Business ROI",
        color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
];

const leadershipTimeline = [
    {
        title: "Foundations in Algorithmic Rigor",
        date: "2023",
        role: "Computer Science & Algorithmic Specialization",
        desc: "Mastered C/C++, advanced Data Structures, and algorithmic complexities at Phitron. Solved 600+ competitive programming challenges.",
        icon: Terminal,
        badge: "Algorithmic Core",
    },
    {
        title: "Full-Stack System Engineering",
        date: "2024",
        role: "Modern Cloud & MERN Architecture",
        desc: "Specialized in distributed architectures, Next.js, React, Node.js, and database modeling. Architected multi-tenant SaaS platforms.",
        icon: Globe,
        badge: "Architecture Expansion",
    },
    {
        title: "Academy Leadership & Mentorship",
        date: "2025",
        role: "Web Instructor @ BD Calling Academy",
        desc: "Led training cohorts for 100+ polytechnic students and junior engineers. Directed curriculum in MERN, Next.js, and real-world system debugging.",
        icon: Layers3,
        badge: "Technical Leadership",
    },
    {
        title: "Founder & CEO, WebZen",
        date: "2026 & Present",
        role: "Executive Direction & Flagship Delivery",
        desc: "Leading WebZen in delivering high-stakes production platforms, including the automated clinical booking platform for Dr. Devojyoti Dutta.",
        icon: Briefcase,
        badge: "Venture Leadership",
    },
];

const executiveTraits = [
    {
        title: "Strategic Leadership",
        info: "Championship Captain",
        desc: "Led university football team to Championship victory, instilling high-pressure execution and squad cohesion.",
        icon: Trophy,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Collaborative Culture",
        info: "Competitive Sportsman",
        desc: "University cricket runner-up; translating athletic discipline into agile sprint coordination and code reviews.",
        icon: ShieldCheck,
        color: "bg-amber-500/10 text-amber-500",
    },
    {
        title: "Continuous Innovation",
        info: "Product Exploration",
        desc: "Relentlessly investigating bleeding-edge tech (Next.js 15, Turbopack, AI integrations) to keep products years ahead of competition.",
        icon: Lightbulb,
        color: "bg-emerald-500/10 text-emerald-500",
    },
    {
        title: "Founder Philosophy",
        info: "Obsession with Impact",
        desc: "Coding is not just syntax—it is the direct medium to solve human bottlenecks, automate inefficiencies, and unlock enterprise scale.",
        icon: Heart,
        color: "bg-pink-500/10 text-pink-500",
    },
];

interface AboutMeProps {
    data?: any;
}

const defaultPillarIcons = [Cpu, Users, Target, TrendingUp, Lightbulb, Compass, ShieldCheck];
const defaultTimelineIcons = [Terminal, Layers3, Users, Briefcase, Zap, Trophy];
const defaultTraitIcons = [Trophy, ShieldCheck, Lightbulb, Heart, Target, Compass];

const AboutMe = ({ data }: AboutMeProps) => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 80,
        });
    }, []);

    const pillars = data?.about?.pillars && data.about.pillars.length > 0 ? data.about.pillars : strategicPillars;
    const timeline = data?.about?.timeline && data.about.timeline.length > 0 ? data.about.timeline : leadershipTimeline;
    const traits = data?.about?.traits && data.about.traits.length > 0 ? data.about.traits : executiveTraits;

    return (
        <section id="about" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Subtle ambient lighting */}
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* SECTION 1: EXECUTIVE PILLARS */}
                <div className="mb-8 sm:mb-12 md:mb-14">
                    <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                            <Compass size={13} />
                            <span>STRATEGIC VISION &amp; EXECUTIVE PILLARS</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                            The Mindset of a Tech Founder &amp; Architect
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
                            I approach software not merely as code, but as the primary engine for business scalability, client delight, and operational leverage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {pillars.map((pillar: any, idx: number) => {
                            const IconComponent = typeof pillar.icon === "function" || typeof pillar.icon === "object"
                                ? pillar.icon
                                : defaultPillarIcons[idx % defaultPillarIcons.length];
                            const colorClass = pillar.color || "text-primary bg-primary/10 border-primary/20";

                            return (
                                <div
                                    key={idx}
                                    className="group p-5 sm:p-6 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 100}>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorClass} group-hover:scale-110 transition-transform`}>
                                                <IconComponent size={22} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border">
                                                {pillar.tag || "Core Pillar"}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* SECTION 2: EXECUTIVE TRAJECTORY (TIMELINE) */}
                <div className="mb-8 sm:mb-12 md:mb-14">
                    <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                            <Zap size={13} />
                            <span>STRATEGIC MILESTONES</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            Trajectory of Technical Leadership
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            From algorithmic problem solving to leading software ventures and educating industry developers.
                        </p>
                    </div>

                    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                        {timeline.map((step: any, index: number) => {
                            const IconComponent = typeof step.icon === "function" || typeof step.icon === "object"
                                ? step.icon
                                : defaultTimelineIcons[index % defaultTimelineIcons.length];

                            return (
                                <div
                                    key={index}
                                    className="sm:relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 120}>
                                    {/* Node dot */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-background group-hover:border-primary group-hover:scale-110 transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 shadow-md">
                                        <IconComponent
                                            size={16}
                                            className="text-muted-foreground group-hover:text-primary transition-colors"
                                        />
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-[calc(100%-3.5rem)] ml-12 md:ml-0 md:w-[45%] p-4 sm:p-6 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-xs font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                                {step.date}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                                {step.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                                            {step.title}
                                        </h3>
                                        <div className="text-xs font-semibold text-primary mt-1">
                                            {step.role}
                                        </div>
                                        <p className="text-muted-foreground mt-2 text-xs sm:text-sm leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* SECTION 3: LEADERSHIP ATTRIBUTES */}
                <div>
                    <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
                            <User size={13} />
                            <span>EXECUTIVE ATTRIBUTES</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            Character, Discipline &amp; Culture
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            The values that drive team cohesion, high standards, and visionary product delivery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {traits.map((trait: any, index: number) => {
                            const IconComponent = typeof trait.icon === "function" || typeof trait.icon === "object"
                                ? trait.icon
                                : defaultTraitIcons[index % defaultTraitIcons.length];
                            const colorClass = trait.color || "bg-primary/10 text-primary";

                            return (
                                <div
                                    key={index}
                                    className="p-5 sm:p-6 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}>
                                    <div
                                        className={`inline-flex p-3 rounded-2xl mb-5 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent size={22} />
                                    </div>
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                        {trait.info}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">
                                        {trait.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {trait.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
