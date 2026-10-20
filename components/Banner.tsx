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
        (general.profileImage && !general.profileImage.includes("1792206573237"))
            ? general.profileImage
            : "/images/hero-cutout.png";
    const whatsappUrl =
        general.whatsapp ||
        "https://wa.me/8801712854941?text=Hi%20Naeeim,%20I'd%20like%20to%20discuss%20a%20project.";

    return (
        <section
            id="home"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-[92vh] lg:min-h-[96vh] scroll-mt-20 bg-pitch-black text-neutral-900 dark:text-white relative overflow-hidden flex flex-col justify-between border-b poster-border select-none">
            
            {/* Top Perimeter Bar (3-Column Spread) */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 sm:pt-8 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-300 z-10 border-b poster-perimeter-border pb-4">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11] animate-pulse" />
                    <span className="text-neutral-900 dark:text-white font-semibold">ARCHITECTURE</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    FULL-STACK
                </div>
                <div className="relative flex items-center gap-2">
                    <span>SYSTEMS</span>
                    <FloatingPixel
                        color="orange"
                        className="absolute -bottom-5 right-0 hidden md:block"
                    />
                </div>
            </motion.div>

            {/* Main Stage: Layered Z-Index Depth Poster */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-8 lg:py-12 flex-1 flex items-center relative">
                
                {/* ======================================================== */}
                {/* LAYER 0 (z-0): Giant Background Watermark Text           */}
                {/* ======================================================== */}
                <motion.div
                    style={l0}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <span className="watermark-text text-[22vw] sm:text-[20vw] lg:text-[18vw] whitespace-nowrap -tracking-[0.06em]">
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
                <div className="w-full relative z-20 flex flex-col lg:flex-row items-center justify-between min-h-[520px] lg:min-h-[640px] pt-14 sm:pt-20 lg:pt-16 pb-4">
                    
                    {/* ======================================================== */}
                    {/* LAYER 1 (z-10): Burnt Orange Solid Geometric Block       */}
                    {/* ======================================================== */}
                    <div className="relative w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] h-[280px] xs:h-[330px] sm:h-[400px] lg:h-[470px] xl:h-[500px] flex-shrink-0">
                        
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
                        {/* Enlarged heroic stature breaking out above orange block */}
                        {/* ======================================================== */}
                        <motion.div
                            style={l2}
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.95,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute -right-3 xs:-right-6 sm:-right-14 md:-right-20 lg:-right-24 xl:-right-28 bottom-0 w-[310px] xs:w-[380px] sm:w-[440px] md:w-[480px] lg:w-[500px] xl:w-[550px] h-[370px] xs:h-[455px] sm:h-[520px] md:h-[580px] lg:h-[620px] xl:h-[670px] z-20 pointer-events-none">
                            <div className="relative w-full h-full filter contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 460px, 540px"
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
                        className="w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-none lg:w-auto mt-8 lg:mt-0 lg:-ml-20 xl:-ml-28 z-30 space-y-6 text-left">
                        
                        {/* 3-Row Stacked Ultra-Heavy Typography with masked kinetic reveal */}
                        <div className="space-y-1 sm:space-y-2 text-left">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="editorial-display text-[2.1rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[6.2rem] xl:text-[7.5rem] text-neutral-900 dark:text-white">
                                    NAEEIM
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="editorial-display text-[2.1rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[6.2rem] xl:text-[7.5rem] text-neutral-900 dark:text-white">
                                    SOFTWARE
                                </motion.div>
                            </div>
                            <div className="overflow-hidden flex items-center gap-3 sm:gap-5 flex-wrap">
                                <motion.div
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="editorial-display text-[2.1rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[6.2rem] xl:text-[7.5rem] text-[#E64A11]">
                                    ARCHITECT
                                </motion.div>
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.6, delay: 0.65, type: "spring", stiffness: 260 }}>
                                    <CircularChevronBtn href="#projects" size="lg" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Text-Light Bio & Action Anchors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                            className="space-y-4 max-w-lg pt-2 text-left">
                            <p className="font-light text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                                Founder &amp; CEO at <strong className="text-neutral-900 dark:text-white font-medium">WebZen Bangladesh</strong>. 
                                Shipping mission-critical web applications, clinical zero-queue portals, and high-uptime platforms.
                            </p>

                            <div className="flex flex-wrap items-center gap-2 xs:gap-3 pt-1 font-mono text-xs">
                                <a
                                    href="#projects"
                                    className="px-3 xs:px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider rounded hover:bg-[#E64A11] dark:hover:bg-[#E64A11] hover:text-white transition-colors inline-flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-xs">
                                    <span>EXPLORE DOSSIERS</span>
                                    <ArrowUpRight size={13} />
                                </a>
                                <a
                                    href={data?.general?.resumeUrl || "/resume.pdf"}
                                    download={data?.general?.resumeFileName || true}
                                    className="px-3 xs:px-4 py-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 font-semibold uppercase tracking-wider rounded hover:border-neutral-900 dark:hover:border-white transition-colors inline-flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-xs">
                                    <FileText size={13} className="text-[#E64A11]" />
                                    <span>{(data?.general?.resumeTitle || "EXECUTIVE CV").toUpperCase()}</span>
                                </a>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="px-3 xs:px-3.5 py-2 text-neutral-600 dark:text-neutral-400 hover:text-[#E64A11] dark:hover:text-[#E64A11] transition-colors inline-flex items-center gap-1.5 text-[11px] xs:text-xs">
                                    <MessageCircle size={14} />
                                    <span>WHATSAPP CHAT ↗</span>
                                </a>
                            </div>
                        </motion.div>

                    </motion.div>

                </div>

            </div>

            {/* Bottom Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pb-6 sm:pb-8 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-10 border-t poster-perimeter-border pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-900 dark:text-white font-semibold">@NAEEIM.SITE_</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-500">
                    DHAKA, BD // UTC+6
                </div>
                <div className="text-[#E64A11] font-semibold">
                    @600_PROBLEMS_SOLVED
                </div>
            </motion.div>

        </section>
    );
};

export default TerminalHero;
