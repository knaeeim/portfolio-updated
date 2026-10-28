"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Lock, ExternalLink } from "lucide-react";

interface ProjectImage {
    src: string;
    label: string;
    caption?: string;
}

interface ProjectGalleryProps {
    images: ProjectImage[];
    projectTitle: string;
    liveUrl?: string;
}

export default function ProjectGallery({ images, projectTitle, liveUrl }: ProjectGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!images || images.length === 0) {
        return null;
    }

    const currentImg = images[activeIndex] || images[0];

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Extract clean display URL for browser mockup
    const getCleanUrl = () => {
        if (!liveUrl) return "production.system.live";
        try {
            const url = new URL(liveUrl);
            return url.hostname + (url.pathname !== "/" ? url.pathname : "");
        } catch {
            return liveUrl.replace(/^https?:\/\//, "");
        }
    };

    const displayUrl = getCleanUrl();

    return (
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto space-y-4">
            {/* Sleek Browser Studio Mockup Frame (Compact & Balanced Height) */}
            <div className="relative w-full h-[290px] xs:h-[350px] sm:h-[430px] md:h-[480px] lg:h-[510px] rounded-xl sm:rounded-2xl overflow-hidden border border-border/80 bg-neutral-900/95 dark:bg-[#080808] shadow-2xl group flex flex-col transition-all duration-300 ring-1 ring-black/5 dark:ring-white/5">
                
                {/* macOS Safari Window Chrome Top Bar */}
                <div className="h-9 sm:h-10 px-3 sm:px-4 bg-neutral-100 dark:bg-neutral-900/90 border-b border-border/60 flex items-center justify-between shrink-0 select-none transition-colors">
                    {/* Traffic Light Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 inline-block shadow-2xs" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 inline-block shadow-2xs" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 inline-block shadow-2xs" />
                    </div>

                    {/* Centered Browser Address Pill */}
                    <div className="px-3 py-0.5 sm:py-1 rounded-full bg-white dark:bg-black/60 border border-border/70 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-muted-foreground max-w-[200px] sm:max-w-[340px] truncate shadow-2xs">
                        <Lock size={10} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{displayUrl}</span>
                    </div>

                    {/* Right Controls: Screen Counter & Fullscreen */}
                    <div className="flex items-center gap-2">
                        <span className="hidden xs:inline-block px-2 py-0.5 rounded bg-muted/60 border border-border/60 text-foreground text-[10px] sm:text-[11px] font-mono font-medium">
                            0{activeIndex + 1} / 0{images.length}
                        </span>

                        <button
                            type="button"
                            onClick={() => setLightboxOpen(true)}
                            aria-label="View Fullscreen"
                            title="Expand to Fullscreen View"
                            className="p-1.5 rounded-lg bg-card hover:bg-muted text-foreground border border-border/60 transition-all hover:scale-105 cursor-pointer shadow-xs">
                            <Maximize2 size={13} />
                        </button>
                    </div>
                </div>

                {/* Viewport & Screen Content */}
                <div className="relative flex-1 w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
                    <Image
                        src={currentImg.src}
                        alt={currentImg.label || projectTitle}
                        fill
                        priority
                        className="object-contain sm:object-cover sm:object-top transition-transform duration-500 group-hover:scale-[1.008]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Left / Right Arrow Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={prevImage}
                                aria-label="Previous screen"
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-20">
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={nextImage}
                                aria-label="Next screen"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-20">
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {/* Floating Bottom Caption Bar with High Contrast Text */}
                    <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-4 p-2.5 sm:p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pointer-events-none z-10">
                        <div className="space-y-0.5 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-amber-400 dark:text-cyan-400 tracking-wide truncate">
                                {currentImg.label}
                            </div>
                            {currentImg.caption && (
                                <p className="text-[11px] sm:text-xs text-neutral-100 font-normal line-clamp-1 max-w-2xl leading-relaxed">
                                    {currentImg.caption}
                                </p>
                            )}
                        </div>
                        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-neutral-300 font-mono shrink-0">
                            <span>Double-click or tap ⤢ to expand</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnail Selector Strip (Centered & Aligned) */}
            {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {images.map((img, idx) => {
                        const isSelected = activeIndex === idx;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className={`text-left p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                                    isSelected
                                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                                        : "border-border/60 bg-card/60 hover:border-border hover:bg-card"
                                }`}>
                                <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border border-border/60 bg-neutral-900">
                                    <Image
                                        src={img.src}
                                        alt={img.label}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div className="truncate min-w-0">
                                    <div className="text-[11px] font-bold text-foreground truncate">
                                        {img.label}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground font-mono">
                                        SCREEN #0{idx + 1}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Fullscreen Lightbox Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close modal"
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50">
                        <X size={24} />
                    </button>

                    <div className="relative max-w-6xl w-full h-[70vh] sm:h-[80vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950 flex items-center justify-center">
                        <Image
                            src={currentImg.src}
                            alt={currentImg.label}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="mt-4 text-center max-w-2xl text-white space-y-1">
                        <div className="font-bold text-base sm:text-lg text-amber-400 dark:text-cyan-400">
                            {currentImg.label}
                        </div>
                        {currentImg.caption && (
                            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                                {currentImg.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
