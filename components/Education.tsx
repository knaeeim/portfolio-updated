"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";

interface EducationSectionProps {
    data?: any;
}

const defaultCourses = [
    {
        title: "Programming Hero",
        level: "Level 2 Specialization",
        badge: "Next Level Web Development",
        desc: "Prisma ORM, PostgreSQL schema design, TypeScript 5, and modular Express.",
    },
    {
        title: "Programming Hero",
        level: "Level 1 Foundation",
        badge: "Full-Stack Web Engineering",
        desc: "Modern JavaScript, React.js component architectures, and REST APIs.",
    },
    {
        title: "Phitron",
        level: "Core Algorithms",
        badge: "Computer Fundamentals & Data Structures",
        desc: "C/C++, Data Structures, memory management, and graph algorithms.",
    },
];

export const EducationSection = ({ data }: EducationSectionProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    const education = data?.education || {};
    const defaultDegree = {
        degree: education.degree || "BSc in Computer Science & Engineering (CSE)",
        institution: education.institution || "Sonargaon University",
        timeline: education.timeline || "2025 — Present",
        cgpa: education.cgpa || "3.59 / 4.00",
        location: education.location || "Dhaka, Bangladesh",
        status: education.status || "Currently Studying",
    };

    const degrees: any[] = Array.isArray(education.degrees) && education.degrees.length > 0
        ? education.degrees
        : [defaultDegree];

    const courses = education.courses && education.courses.length > 0 ? education.courses : defaultCourses;

    return (
        <section
            id="education"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-pitch-black text-white relative overflow-hidden border-b border-[#222220] py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span>06. ACADEMIA &amp; CREDENTIALS</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    SPECIALIZATION COHORTS
                </div>
                <div className="flex items-center gap-2">
                    <span>CGPA 3.59 / 4.00</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[22vw] text-[#121212] whitespace-nowrap">
                    ACADEMIA // 06
                </span>
            </motion.div>

            {/* Main Stage */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 lg:py-12 z-20 relative space-y-10">
                
                {/* Header */}
                <div className="space-y-2 max-w-2xl">
                    <span className="font-light text-neutral-300 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                        // FOUNDATIONS &amp; CERTIFICATIONS
                    </span>
                    <h2 className="editorial-display text-4xl sm:text-6xl text-white">
                        EDUCATION &amp; <span className="text-[#E64A11]">SPECIALIZATION</span>
                    </h2>
                </div>

                {/* 12-Column Grid: Degree (6 Cols) & Professional Certifications (6 Cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono text-xs">
                    
                    {/* LEFT (6 COLS): Degree Milestone */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-[10px] uppercase text-neutral-400 tracking-wider font-bold">
                            // UNIVERSITY DEGREE:
                        </div>

                        {degrees.map((deg, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 rounded-xs border border-neutral-800 bg-[#0E0E0E]/90 space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span className="text-[10px] font-bold text-[#E64A11] uppercase tracking-wider">
                                        {deg.status || "Currently Studying"}
                                    </span>
                                    <span className="text-[11px] text-neutral-400">{deg.timeline}</span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">
                                        {deg.institution}
                                    </h3>
                                    <p className="text-xs text-[#E64A11] font-semibold">
                                        {deg.degree}
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-3 text-[11px]">
                                    <div className="p-3 rounded-xs bg-black border border-white/5">
                                        <div className="text-[9px] text-neutral-500 uppercase">ACADEMIC STANDING</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{deg.cgpa}</div>
                                    </div>
                                    <div className="p-3 rounded-xs bg-black border border-white/5">
                                        <div className="text-[9px] text-neutral-500 uppercase">LOCATION</div>
                                        <div className="text-xs font-bold text-white mt-0.5">{deg.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT (6 COLS): Professional Certifications */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-[10px] uppercase text-neutral-400 tracking-wider font-bold">
                            // PROFESSIONAL CERTIFICATIONS:
                        </div>

                        <div className="space-y-3">
                            {courses.map((course: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-4 sm:p-5 rounded-xs border border-neutral-800 bg-neutral-900/60 space-y-2 hover:border-[#E64A11] transition-colors">
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="font-bold text-[#E64A11]">{course.title}</span>
                                        <span className="text-neutral-400">{course.level}</span>
                                    </div>
                                    <div className="text-xs font-bold text-white font-sans">
                                        {course.badge}
                                    </div>
                                    <p className="text-[11px] text-neutral-300 leading-relaxed font-sans font-light">
                                        {course.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default EducationSection;
