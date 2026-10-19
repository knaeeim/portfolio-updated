"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, MessageCircle } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";
import { CircularChevronBtn } from "@/components/poster/CircularChevronBtn";

interface BannerProps {
    data?: any;
}

export const TerminalHero = ({ data }: BannerProps) => {
    const { handleMouseMove, handleMouseLeave, l0, l1, l2, l3 } = usePosterParallax();

    const general = data?.general || {};
    const name = general.name || "Khairul Bashar Naeeim";
    const profileImage =
        general.profileImage ||
        "/uploads/1792206573237_file_00000000437081fa9153c7692bcee042.png";
    const whatsappUrl =
        general.whatsapp ||
        "https://wa.me/8801712854941?text=Hi%20Naeeim,%20I'd%20like%20to%20discuss%20a%20project.";

    return (
        <section
            id="home"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-[92vh] lg:min-h-[96vh] bg-pitch-black text-white relative overflow-hidden flex flex-col justify-between border-b border-[#222220] select-none">
            
            {/* Top Perimeter Bar (3-Column Spread) */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 z-40 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11] animate-pulse" />
                    <span>ARCHITECTURE</span>
                </div>
                <div className="hidden sm:block text-neutral-400">
                    FULL-STACK
                </div>
                <div className="relative flex items-center gap-2">
                    <span>SYSTEMS</span>
                    <FloatingPixel
                        color="orange"
                        className="absolute -bottom-5 right-0 hidden md:block"
                    />
                </div>
            </div>

            {/* Main Stage: Layered Z-Index Depth Poster */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 lg:py-12 flex-1 flex items-center relative">
                
                {/* ======================================================== */}
                {/* LAYER 0 (z-0): Giant Background Watermark Text           */}
                {/* ======================================================== */}
                <motion.div
                    style={l0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <span className="watermark-text text-[22vw] sm:text-[20vw] lg:text-[18vw] text-[#121212] whitespace-nowrap -tracking-[0.06em]">
                        NAEEIM // 01
                    </span>
                </motion.div>

                {/* Floating Pixel Squares (Layer 1 Background Anchors) */}
                <motion.div style={l1} className="absolute inset-0 pointer-events-none z-10">
                    <FloatingPixel color="orange" className="absolute top-12 left-[15%] hidden lg:block" />
                    <FloatingPixel color="grey" className="absolute top-[35%] left-[8%] hidden sm:block" />
                    <FloatingPixel color="orange" className="absolute bottom-[22%] right-[12%] hidden sm:block" />
                    <FloatingPixel color="grey" className="absolute top-[18%] right-[24%] hidden lg:block" />
                </motion.div>

                {/* Container for Midground and Foreground */}
                <div className="w-full relative z-20 flex flex-col lg:flex-row items-center justify-between min-h-[500px] lg:min-h-[580px]">
                    
                    {/* ======================================================== */}
                    {/* LAYER 1 (z-10): Burnt Orange Solid Geometric Block       */}
                    {/* ======================================================== */}
                    <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] aspect-4/5 sm:aspect-square flex-shrink-0">
                        
                        <motion.div
                            style={l1}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 0.85,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="origin-left w-full h-full rounded-xs burnt-stripes relative shadow-2xl overflow-hidden border border-[#E64A11]/60">
                            
                            {/* Inside Top-Left: Light Editorial Lead-In Phrase */}
                            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 max-w-[220px]">
                                <span className="font-light text-neutral-200 text-xs sm:text-sm tracking-wide block leading-snug">
                                    Need a resilient
                                </span>
                                <span className="font-semibold text-white text-xs sm:text-sm tracking-tight block">
                                    full-stack system?
                                </span>
                            </div>

                            {/* Minimal Watermark inside Block */}
                            <div className="absolute bottom-4 left-6 text-[10px] font-mono text-black/50 tracking-widest uppercase font-bold">
                                // 01 STUDIO ARCHITECT
                            </div>
                        </motion.div>

                        {/* ======================================================== */}
                        {/* LAYER 2 (z-20): Cutout Portrait Overlapping Block Right  */}
                        {/* ======================================================== */}
                        <motion.div
                            style={l2}
                            initial={{ y: 60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.9,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute -right-6 sm:-right-16 lg:-right-24 bottom-0 w-[240px] sm:w-[320px] lg:w-[380px] h-[340px] sm:h-[440px] lg:h-[500px] z-20 pointer-events-none">
                            <div className="relative w-full h-full filter contrast-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
                                    className="object-contain object-bottom"
                                />
                            </div>
                        </motion.div>

                    </div>

                    {/* ======================================================== */}
                    {/* LAYER 3 (z-30): Foreground Stacked Impact Typography    */}
                    {/* ======================================================== */}
                    <motion.div
                        style={l3}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full lg:w-auto mt-8 lg:mt-0 lg:-ml-28 xl:-ml-36 z-30 space-y-6">
                        
                        {/* 3-Row Stacked Ultra-Heavy Typography */}
                        <div className="space-y-1 sm:space-y-2">
                            <div className="overflow-hidden">
                                <h1 className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] text-white">
                                    NAEEIM
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <div className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] text-white">
                                    SOFTWARE
                                </div>
                            </div>
                            <div className="overflow-hidden flex items-center gap-3 sm:gap-5 flex-wrap">
                                <div className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] text-[#E64A11]">
                                    ARCHITECT
                                </div>
                                <CircularChevronBtn href="#projects" size="lg" />
                            </div>
                        </div>

                        {/* Text-Light Bio & Action Anchors */}
                        <div className="space-y-4 max-w-lg pt-2">
                            <p className="font-light text-neutral-300 text-sm sm:text-base leading-relaxed">
                                Founder &amp; CEO at <strong className="text-white font-medium">WebZen Bangladesh</strong>. 
                                Shipping mission-critical web applications, clinical zero-queue portals, and high-uptime platforms.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
                                <a
                                    href="#projects"
                                    className="px-4 py-2 bg-white text-black font-bold uppercase tracking-wider rounded hover:bg-[#E64A11] hover:text-white transition-colors inline-flex items-center gap-2">
                                    <span>EXPLORE DOSSIERS</span>
                                    <ArrowUpRight size={13} />
                                </a>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="px-4 py-2 border border-neutral-700 bg-neutral-900/60 text-neutral-200 font-semibold uppercase tracking-wider rounded hover:border-white transition-colors inline-flex items-center gap-2">
                                    <FileText size={13} className="text-[#E64A11]" />
                                    <span>EXECUTIVE CV</span>
                                </a>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="px-3.5 py-2 text-neutral-400 hover:text-[#E64A11] transition-colors inline-flex items-center gap-1.5">
                                    <MessageCircle size={14} />
                                    <span>WHATSAPP CHAT ↗</span>
                                </a>
                            </div>
                        </div>

                    </motion.div>

                </div>

            </div>

            {/* Bottom Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-white">@NAEEIM.SITE_</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    DHAKA, BD // UTC+6
                </div>
                <div className="text-[#E64A11] font-semibold">
                    @600_PROBLEMS_SOLVED
                </div>
            </div>

        </section>
    );
};

export default TerminalHero;
