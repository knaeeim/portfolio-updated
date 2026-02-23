"use client";

import React, { useState, useEffect } from "react";
import { Github, ExternalLink, Layout, CheckCircle2, Globe } from "lucide-react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
    {
        title: "Skill-Bridge",
        subtitle: "Tutoring Platform",
        description:
            "A full-stack platform connecting learners with expert tutors using Next.js and PostgreSQL. Features robust dashboards and booking logic.",
        images: ["/skills/skill1.png", "/skills/skill2.png", "/skills/skill3.png", "/skills/skill4.png"],
        liveLink: "https://skill-bridge-client-taupe.vercel.app/",
        clientLink: "https://github.com/knaeeim/skill-bridge-client",
        serverLink: "https://github.com/knaeeim/skill-bridge-server",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        features: ["RBAC Dashboards", "Session Booking", "Secure Auth", "Admin Dashboard Controls"],
    },
    {
        title: "House Manager",
        subtitle: "Building Management System",
        description:
            "Automated building management with online bill payments, coupon validation, and admin-controlled notifications.",
        images: ["/house/house1.png", "/house/house2.png", "/house/house3.png", "/house/house4.png"],
        liveLink: "https://house-manager-56098.web.app/",
        clientLink: "https://github.com/knaeeim/houseManager-client",
        serverLink: "https://github.com/knaeeim/houseManager-Server",
        tech: ["React", "Firebase", "TanStack Query", "Node.js"],
        features: ["Coupon Logic", "Bill Payment", "Admin Panel"],
    },
];

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isHovered && project.images.length > 1) {
            interval = setInterval(() => {
                setImgIndex((prev) => (prev + 1) % project.images.length);
            }, 2000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovered, project.images.length]);

    // Reset index when hover ends - handled via event to avoid effect cascade
    const handleMouseLeave = () => {
        setIsHovered(false);
        setImgIndex(0);
    };

    return (
        <div
            className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}>
            {/* LEFT: Image Slider (5 Columns) */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden bg-muted/20">
                {project.images.map((src, idx) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            idx === imgIndex ? "opacity-100" : "opacity-0"
                        }`}>
                        <Image
                            src={src}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-110"
                        />
                    </div>
                ))}

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {project.images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                                idx === imgIndex
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-white/30 backdrop-blur-md"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* RIGHT: Details (7 Columns) */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between relative">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground font-medium text-sm flex items-center gap-2">
                                <Globe size={14} /> {project.subtitle}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={project.clientLink}
                                target="_blank"
                                className="p-3 rounded-2xl bg-muted/50 border border-border hover:border-primary/50 hover:text-primary transition-all">
                                <Github size={20} />
                            </a>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                        {project.features.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-foreground/80">
                                <CheckCircle2 size={16} className="text-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-4 py-1.5 rounded-xl bg-muted/50 border border-border text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:border-primary/20 group-hover:text-primary transition-all">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <section id="projects" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-20" data-aos="fade-up">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Layout size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Featured Projects
                        </h2>
                        <p className="text-muted-foreground">
                            Engineering digital solutions with precision.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
