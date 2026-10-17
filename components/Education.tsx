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
    const degree = education.degree || "BSc in Computer Science Engineering (CSE)";
    const institution = education.institution || "Sonargaon University";
    const timeline = education.timeline || "2025 — Present";
    const cgpa = education.cgpa || "3.59 / 4.00";
    const location = education.location || "Dhaka, Bangladesh";
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
        <section id="education" className="py-24 bg-background relative overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
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
                        <div className="relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm hover:border-primary/30 transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                                            Currently Studying
                                        </span>
                                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-mono">
                                            <Calendar size={14} />
                                            <span>{timeline}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                            {institution}
                                        </h3>
                                        <p className="text-lg text-muted-foreground font-medium mt-1">
                                            {degree}
                                        </p>
                                    </div>

                                    {/* CGPA as a sleek, dynamic detail pill */}
                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold">
                                            <BookOpen size={15} className="text-primary" />
                                            <span className="text-muted-foreground">
                                                CGPA:
                                            </span>
                                            <span className="text-foreground font-extrabold tracking-wide">
                                                {cgpa}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                                            <MapPin size={16} className="text-primary/60" />
                                            <span>{location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/30 border border-dashed border-border text-muted-foreground/50">
                                    <GraduationCap size={40} strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. ONLINE COURSES SECTION */}
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
                        {courses.map((course: any, idx: number) => {
                            const colors = [
                                { border: "hover:border-primary/30", badge: "text-primary bg-primary/10 border-primary/20" },
                                { border: "hover:border-blue-500/30", badge: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                                { border: "hover:border-emerald-500/30", badge: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                            ];
                            const c = colors[idx % colors.length];

                            return (
                                <div
                                    key={idx}
                                    className={`group p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card/50 hover:bg-card ${c.border} transition-all duration-300`}
                                    data-aos="fade-up"
                                    data-aos-delay={(idx + 1) * 100}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:rotate-12 transition-transform">
                                            <Award size={24} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border uppercase ${c.badge}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold mb-1 text-foreground">{course.title}</h4>
                                    <p className="text-sm font-semibold text-foreground/70 mb-4 italic">
                                        {course.badge}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
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
