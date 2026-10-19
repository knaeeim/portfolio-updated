"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle2 } from "lucide-react";

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
            className="w-full border-b border-border bg-background relative overflow-hidden py-10 sm:py-14">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                06. ACADEMIC CREDENTIALS
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Education &amp; Specialization
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card border border-border px-2.5 py-1 rounded">
                        <span className="text-foreground font-bold">CGPA: 3.59 / 4.00</span>
                        <span>•</span>
                        <span className="text-[#10B981]">ACTIVE DEGREE</span>
                    </div>
                </div>

                {/* 12-Column Grid: Degree (6 Cols) & Professional Certifications (6 Cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT (6 COLS): Degree Milestone */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                            UNIVERSITY DEGREE:
                        </div>

                        {degrees.map((deg, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded border border-border bg-card/60 font-mono text-xs space-y-4">
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="text-[10px] font-bold text-[#FF4F00] uppercase tracking-wider">
                                        {deg.status || "Currently Studying"}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground">{deg.timeline}</span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold font-sans text-foreground">
                                        {deg.institution}
                                    </h3>
                                    <p className="text-xs text-[#FF4F00] font-semibold">
                                        {deg.degree}
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-border grid grid-cols-2 gap-3 text-[11px]">
                                    <div className="p-2.5 rounded bg-muted/40 border border-border/60">
                                        <div className="text-[9px] text-muted-foreground uppercase">ACADEMIC STANDING</div>
                                        <div className="text-sm font-bold text-foreground mt-0.5">{deg.cgpa}</div>
                                    </div>
                                    <div className="p-2.5 rounded bg-muted/40 border border-border/60">
                                        <div className="text-[9px] text-muted-foreground uppercase">CAMPUS LOCATION</div>
                                        <div className="text-xs font-bold text-foreground mt-0.5">{deg.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT (6 COLS): Professional Certifications */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                            PROFESSIONAL CERTIFICATIONS &amp; COHORTS:
                        </div>

                        <div className="space-y-3 font-mono text-xs">
                            {courses.map((course: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded border border-border bg-card/40 space-y-2 hover:border-foreground/30 transition-colors">
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="font-bold text-[#10B981]">{course.title}</span>
                                        <span className="text-muted-foreground">{course.level}</span>
                                    </div>
                                    <div className="text-xs font-bold text-foreground">
                                        {course.badge}
                                    </div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
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
