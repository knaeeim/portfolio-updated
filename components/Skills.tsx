"use client";

import React, { useEffect } from "react";
import {
    Code2,
    LayoutTemplate,
    Server,
    Database as DbIcon,
    Wrench,
    BrainCircuit,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const skillCategories = [
    {
        title: "Languages",
        icon: Code2,
        skills: ["JavaScript (ES6+)", "TypeScript", "Python", "C", "C++"],
        color: "text-blue-500",
    },
    {
        title: "Frontend",
        icon: LayoutTemplate,
        skills: ["Next.js", "React.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "DaisyUI"],
        color: "text-pink-500",
    },
    {
        title: "Backend",
        icon: Server,
        skills: ["Node.js", "Express.js", "Prisma", "REST APIs"],
        color: "text-emerald-500",
    },
    {
        title: "Databases",
        icon: DbIcon,
        skills: ["PostgreSQL", "MongoDB", "MySQL"],
        color: "text-amber-500",
    },
    {
        title: "Tools",
        icon: Wrench,
        skills: ["Git", "GitHub", "Redux Toolkit", "TanStack Query", "Firebase"],
        color: "text-violet-500",
    },
    {
        title: "Concepts",
        icon: BrainCircuit,
        skills: ["Data Structures & Algorithms", "OOP", "Problem Solving"],
        color: "text-cyan-500",
    },
];

const SkillsSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section id="skills" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Technical Arsenal
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A specialized collection of technologies and methodologies I use to
                        bring digital ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative p-7 rounded-3xl border border-border bg-card/40 backdrop-blur-md hover:bg-card hover:border-primary/20 transition-all duration-500"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}>
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className={`p-3 rounded-2xl bg-background border border-border ${category.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                    <category.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skill Tags */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIndex) => (
                                    <span
                                        key={sIndex}
                                        className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Decorative background glow for each card */}
                            <div className="absolute -z-10 inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
