"use client";

import React, { useEffect } from "react";
import { GraduationCap, Monitor, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const EducationSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section id="education" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* 1. ACADEMIC DEGREE */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-10" data-aos="fade-up">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <GraduationCap size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Academic Degree
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                University education and core engineering.
                            </p>
                        </div>
                    </div>

                    <div className="group relative" data-aos="fade-up" data-aos-delay="100">
                        {/* Subtle border-only glow instead of a full blur background */}
                        <div className="relative p-6 md:p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/30 transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                                            Currently Studying
                                        </span>
                                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-mono">
                                            <Calendar size={14} />
                                            <span>2023 — Present</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                            Sonargoan University
                                        </h3>
                                        <p className="text-lg text-muted-foreground font-medium mt-1">
                                            BSc in Computer Science Engineering (CSE)
                                        </p>
                                    </div>

                                    {/* CGPA as a sleek, integrated detail pill */}
                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm font-medium">
                                            <BookOpen size={14} className="text-primary" />
                                            <span className="text-muted-foreground">
                                                CGPA:
                                            </span>
                                            <span className="text-foreground font-bold">
                                                3.58 / 4.00
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin size={16} className="text-primary/60" />
                                            <span>Dhaka, Bangladesh</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Optional: A small, clean icon for the university on the right */}
                                <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/30 border border-dashed border-border text-muted-foreground/50">
                                    <GraduationCap size={40} strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. ONLINE COURSES SECTION (3-Column Layout) */}
                <div>
                    <div className="flex items-center gap-3 mb-10" data-aos="fade-up">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <Monitor size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Online Specializations
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                Professional development and tech specializations.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Programming Hero Level 2 */}
                        <div
                            className="group p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="100">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:rotate-12 transition-transform">
                                    <Award size={24} />
                                </div>
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20 uppercase">
                                    Level 2
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-1">Programming Hero</h4>
                            <p className="text-sm font-semibold text-foreground/70 mb-4 italic">
                                Next Level Development
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Advanced mastery of Prisma, PostgreSQL, TypeScript, and Express
                                module patterns.
                            </p>
                        </div>

                        {/* Programming Hero Level 1 */}
                        <div
                            className="group p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:border-blue-500/30 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="200">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:rotate-12 transition-transform">
                                    <Monitor size={24} />
                                </div>
                                <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20 uppercase">
                                    Level 1
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-1">Programming Hero</h4>
                            <p className="text-sm font-semibold text-foreground/70 mb-4 italic">
                                Complete Web Development
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Comprehensive foundation in HTML, CSS, JavaScript, React.js,
                                and the MERN stack.
                            </p>
                        </div>

                        {/* Phitron */}
                        <div
                            className="group p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:border-emerald-500/30 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="300">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:rotate-12 transition-transform">
                                    <Award size={24} />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase">
                                    Foundation
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-1">Phitron</h4>
                            <p className="text-sm font-semibold text-foreground/70 mb-4 italic">
                                Computer Fundamentals & DS
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Deep dive into C/C++, algorithmic logic, and fundamental
                                computer science concepts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
