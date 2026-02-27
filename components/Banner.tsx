"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Terminal, Code2, Smartphone, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

// Easy to edit banner configuration
const bannerConfig = {
    profileImage: "/profilePicture.jpg",
    resumeFile: "/resume.pdf",
    githubProfile: "https://github.com/knaeeim",
};

const PortfolioBanner = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <section
            id="home"
            className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-background py-12 md:py-20">
            {/* Subtle Background Grid - Works in both light/dark */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[grid-line-color] mask-[linear-gradient(to_bottom,white,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                    backgroundSize: "4rem 4rem",
                }}
            />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
                {/* LEFT SIDE: The Terminal (7 Columns on Large) */}
                <div className="lg:col-span-7 order-2 lg:order-1" data-aos="fade-right">
                    <div className="relative group">
                        {/* Soft Ambient Glow - Dynamic color based on theme */}
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-cyan-500/20 rounded-xl blur-2xl opacity-50 transition duration-1000 group-hover:opacity-100" />

                        <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden shadow-black/10 dark:shadow-black/50">
                            {/* macOS Style Header */}
                            <div className="bg-muted/50 px-4 py-3 border-b border-border flex justify-between items-center">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                    <Terminal size={12} />
                                    <span>developer_profile.sh</span>
                                </div>
                                <div className="w-12" /> {/* Spacer */}
                            </div>

                            {/* Terminal Content */}
                            <div className="p-5 md:p-8 font-mono text-xs md:text-sm leading-relaxed">
                                <div className="flex gap-3 mb-4">
                                    <span className="text-primary font-bold">➜</span>
                                    <span className="text-muted-foreground italic">
                                        ~/portfolio
                                    </span>
                                    <span className="text-foreground">cat about_me.md</span>
                                </div>

                                <div className="space-y-3 text-card-foreground/80">
                                    <p className="flex flex-wrap gap-2">
                                        <span className="text-primary font-semibold">
                                            Name:
                                        </span>
                                        <span>Khairul Bashar Naeeim</span>
                                    </p>
                                    <p className="flex flex-wrap gap-2">
                                        <span className="text-primary font-semibold">
                                            Expertise:
                                        </span>
                                        <span className="text-blue-500 dark:text-blue-400">
                                            MERN Stack
                                        </span>
                                        <span className="text-muted-foreground">|</span>
                                        <span className="text-cyan-500">Next.js</span>
                                    </p>
                                    <p className="flex flex-wrap gap-2">
                                        <span className="text-primary font-semibold">
                                            Experience:
                                        </span>
                                        <span>Instructor @ BD Calling Academy</span>
                                    </p>
                                    <div className="pt-2">
                                        <span className="text-primary font-semibold">
                                            Execution Summary:
                                        </span>
                                        <p className="text-muted-foreground line-clamp-2 md:line-clamp-none">
                                            {
                                                "Passionate about building scalable web apps and solved 600+ problems on LeetCode & Codeforces."
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Button asChild size="sm">
                                        <a href={bannerConfig.resumeFile} download>
                                            Download Resume
                                        </a>
                                    </Button>
                                    <Button asChild size="sm" variant="outline">
                                        <a
                                            href={bannerConfig.githubProfile}
                                            target="_blank"
                                            rel="noreferrer noopener">
                                            <Github className="mr-2 size-4" />
                                            GitHub Profile
                                        </a>
                                    </Button>
                                </div>

                                {/* Animated Blinking Cursor */}
                                <div className="flex gap-3 mt-6">
                                    <span className="text-primary font-bold">➜</span>
                                    <div className="w-1 h-5 bg-primary rounded-2xl animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Profile Picture (5 Columns on Large) */}
                <div
                    className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
                    data-aos="fade-left">
                    <div className="relative">
                        {/* Decorative Rings */}
                        <div className="absolute inset-0 rounded-full border border-dashed border-primary/40 animate-[spin_20s_linear_infinite] scale-115" />

                        {/* Main Image Container */}
                        <div className="relative w-75 h-75 sm:w-70 sm:h-80 md:w-80 md:h-72 lg:w-100 lg:h-100 rounded-full overflow-hidden border-4 border-background shadow-2xl z-10">
                            <Image
                                src={bannerConfig.profileImage}
                                alt="Profile"
                                fill
                                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
                                className="object-cover object-top transition-transform duration-700 hover:scale-110"
                            />
                            {/* Dark/Light overlay toggle look */}
                            <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
                        </div>

                        {/* Floating Tech Badges (Responsive Hidden on Mobile) */}
                        <div className="flex absolute -top-4 -right-4 bg-card border border-border p-3 rounded-2xl shadow-lg z-20 items-center gap-2 animate-bounce">
                            <Code2 className="text-blue-500" size={20} />
                        </div>
                        <div className="flex absolute bottom-4 -left-8 bg-card border border-border p-3 rounded-2xl shadow-lg z-20 items-center gap-2 animate-[bounce_2s_ease-in-out_infinite]">
                            <Smartphone className="text-emerald-500" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioBanner;
