"use client";

import React, { useEffect } from "react";
import {
    Cpu,
    Globe,
    Layers3,
    Trophy,
    Plane,
    Terminal,
    User,
    Heart,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./ui/button";

const programmingSteps = [
    {
        title: "The Foundation",
        date: "Oct 2023",
        desc: "Mastered C/C++ & Data Structures at Phitron. Solved 600+ problems.",
        icon: Cpu,
    },
    {
        title: "Web Transformation",
        date: "2024",
        desc: "Self-taught MERN stack. Focused on React and interactive UI/UX.",
        icon: Globe,
    },
    {
        title: "Professional Growth",
        date: "Sep 2025 — Nov 2025",
        desc: "Instructor at BD Calling Academy & learning Prisma/PostgreSQL.",
        icon: Layers3,
    },
];

const personalTraits = [
    {
        title: "Leadership",
        info: "Football Captain",
        desc: "Led university team to Championship glory.",
        icon: Trophy,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Team Player",
        info: "Cricket Runner-Up",
        desc: "Member of university cricket team that finished as Runners-Up.",
        icon: Trophy,
        color: "bg-amber-500/10 text-amber-500",
    },
    {
        title: "Adventure",
        info: "Travel & Food",
        desc: "Exploring cultures and new flavors keeps me creative.",
        icon: Plane,
        color: "bg-emerald-500/10 text-emerald-500",
    },
    {
        title: "Philosophy",
        info: "Why I Code",
        desc: "Turning abstract ideas into tangible products is my fuel.",
        icon: Heart,
        color: "bg-pink-500/10 text-pink-500",
    },
];

const AboutMe = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section id="about" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* SECTION 1: PROGRAMMING JOURNEY */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-12" data-aos="fade-up">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Terminal size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Programming Journey
                            </h2>
                            <p className="text-muted-foreground">
                                My technical evolution and milestones.
                            </p>
                        </div>
                    </div>

                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
                        {programmingSteps.map((step, index) => (
                            <div
                                key={index}
                                className="sm:relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}>
                                {/* Dot */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background group-hover:border-primary transition-colors duration-500 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                                    <step.icon
                                        size={18}
                                        className="text-muted-foreground group-hover:text-primary"
                                    />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] ml-14 md:ml-0 md:w-[45%] p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all ">
                                    <Button variant="outline" size={"xs"} className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-3">
                                        {step.date}
                                    </Button>
                                    <h3 className="text-xl font-bold mt-1">{step.title}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: OVERALL ME */}
                <div>
                    <div className="flex items-center gap-3 mb-12" data-aos="fade-up">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Beyond the Code
                            </h2>
                            <p className="text-muted-foreground">
                                The interests and experiences that shape who I am.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {personalTraits.map((trait, index) => (
                            <div
                                key={index}
                                className="p-6 md:p-8 rounded-3xl border border-border bg-card/50 hover:bg-card transition-all group overflow-hidden relative"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}>
                                <div
                                    className={`inline-flex p-3 rounded-2xl mb-6 ${trait.color} group-hover:scale-110 transition-transform`}>
                                    <trait.icon size={24} />
                                </div>
                                <span className="block text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-widest">
                                    {trait.info}
                                </span>
                                <h3 className="text-2xl font-bold mb-3">{trait.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {trait.desc}
                                </p>

                                {/* Visual Flair: A subtle background number */}
                                <span className="absolute -bottom-4 -right-2 text-8xl font-black opacity-[0.03] select-none uppercase -z-10">
                                    {trait.title[0]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
