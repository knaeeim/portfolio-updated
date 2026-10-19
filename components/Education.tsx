"use client";

import React, { useEffect } from "react";
import { GraduationCap, Monitor, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface EducationSectionProps {
    data?: any;
}

const defaultCourses = [
    {
        title: "Programming Hero",
        level: "Level 2",
        badge: "Next Level Development",
        desc: "Advanced mastery of Prisma, PostgreSQL, TypeScript, and Express module patterns.",
    },
    {
        title: "Programming Hero",
        level: "Level 1",
        badge: "Complete Web Development",
        desc: "Comprehensive foundation in HTML, CSS, JavaScript, React.js, and the MERN stack.",
    },
    {
        title: "Phitron",
        level: "Foundation",
        badge: "Computer Fundamentals & DS",
        desc: "Deep dive into C/C++, algorithmic logic, and fundamental computer science concepts.",
    },
];

const EducationSection = ({ data }: EducationSectionProps) => {
    const education = data?.education || {};
    const defaultDegree = {
        degree: education.degree || "BSc in Computer Science Engineering (CSE)",
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

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section id="education" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 1. ACADEMIC DEGREE */}
                <div className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6" data-aos="fade-up">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <GraduationCap size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                {degrees.length > 1 ? "Academic Degrees" : "Academic Degree"}
                            </h2>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                University education and core engineering milestones.
                            </p>
                        </div>
                    </div>

                    {degrees.length === 1 ? (
                        <div className="group relative" data-aos="fade-up" data-aos-delay="100">
                            <div className="relative p-5 sm:p-7 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                                                {degrees[0].status || "Currently Studying"}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-mono">
                                                <Calendar size={14} />
                                                <span>{degrees[0].timeline}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                                {degrees[0].institution}
                                            </h3>
                                            <p className="text-lg text-muted-foreground font-medium mt-1">
                                                {degrees[0].degree}
                                            </p>
                                        </div>

                                        {/* CGPA as a sleek, dynamic detail pill */}
                                        <div className="flex flex-wrap items-center gap-4 pt-2">
                                            {degrees[0].cgpa && (
                                                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold">
                                                    <BookOpen size={15} className="text-primary" />
                                                    <span className="text-muted-foreground">
                                                        CGPA:
                                                    </span>
                                                    <span className="text-foreground font-extrabold tracking-wide">
                                                        {degrees[0].cgpa}
                                                    </span>
                                                </div>
                                            )}

                                            {degrees[0].location && (
                                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                                                    <MapPin size={16} className="text-primary/60" />
                                                    <span>{degrees[0].location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/30 border border-dashed border-border text-muted-foreground/50">
                                        <GraduationCap size={40} strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {degrees.map((deg: any, dIdx: number) => (
                                <div
                                    key={dIdx}
                                    className="group relative"
                                    data-aos="fade-up"
                                    data-aos-delay={dIdx * 100}>
                                    <div className="h-full relative p-5 sm:p-7 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                                                    {deg.status || (dIdx === 0 ? "Currently Studying" : "Academic Degree")}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                                                    <Calendar size={13} />
                                                    <span>{deg.timeline || "Academic Session"}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                                                    {deg.institution}
                                                </h3>
                                                <p className="text-base text-muted-foreground font-medium mt-1">
                                                    {deg.degree}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                                {deg.cgpa && (
                                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold">
                                                        <BookOpen size={14} className="text-primary" />
                                                        <span className="text-muted-foreground">CGPA:</span>
                                                        <span className="text-foreground font-extrabold tracking-wide">
                                                            {deg.cgpa}
                                                        </span>
                                                    </div>
                                                )}

                                                {deg.location && (
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                                        <MapPin size={14} className="text-primary/60" />
                                                        <span>{deg.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. ONLINE COURSES SECTION */}
                <div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6" data-aos="fade-up">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <Monitor size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                Online Specializations
                            </h2>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                Professional development and tech specializations.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {courses.map((course: any, idx: number) => {
                            const colors = [
                                { border: "hover:border-primary/40", badge: "text-primary bg-primary/10 border-primary/20" },
                                { border: "hover:border-blue-500/40", badge: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                                { border: "hover:border-emerald-500/40", badge: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                            ];
                            const c = colors[idx % colors.length];

                            return (
                                <div
                                    key={idx}
                                    className={`group p-5 sm:p-7 rounded-2xl border border-border/80 dark:border-white/10 bg-card/75 backdrop-blur-xl shadow-sm hover:shadow-xl ${c.border} transition-all duration-300`}
                                    data-aos="fade-up"
                                    data-aos-delay={(idx + 1) * 100}>
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:rotate-12 transition-transform">
                                            <Award size={24} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border uppercase ${c.badge}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold mb-1 text-foreground">{course.title}</h4>
                                    <p className="text-xs font-semibold text-foreground/70 mb-3 italic">
                                        {course.badge}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {course.desc}
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

export default EducationSection;
