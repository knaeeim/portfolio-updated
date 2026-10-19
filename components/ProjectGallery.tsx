"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface ProjectImage {
    src: string;
    label: string;
    caption?: string;
}

interface ProjectGalleryProps {
    images: ProjectImage[];
    projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
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

    return (
        <div className="space-y-4">
            {/* Main Interactive Preview Frame */}
            <div className="relative aspect-16/10 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-muted/40 shadow-2xl group">
                <Image
                    src={currentImg.src}
                    alt={currentImg.label || projectTitle}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Action & Counter */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
                        Screen {activeIndex + 1} of {images.length}
                    </span>

                    <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        aria-label="View Fullscreen"
                        className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg">
                        <Maximize2 size={16} />
                    </button>
                </div>

                {/* Left / Right Arrow Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prevImage}
                            aria-label="Previous screen"
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 cursor-pointer opacity-70 group-hover:opacity-100">
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={nextImage}
                            aria-label="Next screen"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 cursor-pointer opacity-70 group-hover:opacity-100">
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white space-y-1 pointer-events-none">
                    <div className="text-xs sm:text-sm font-bold text-cyan-400">
                        {currentImg.label}
                    </div>
                    {currentImg.caption && (
                        <p className="text-xs sm:text-sm text-white/90 line-clamp-2 max-w-3xl leading-relaxed">
                            {currentImg.caption}
                        </p>
                    )}
                </div>
            </div>

            {/* Thumbnail Selector Strip */}
            {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`text-left p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                                activeIndex === idx
                                    ? "border-primary bg-primary/10 shadow-sm"
                                    : "border-border/60 bg-card/60 hover:border-border hover:bg-card"
                            }`}>
                            <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border border-border/60">
                                <Image
                                    src={img.src}
                                    alt={img.label}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="truncate">
                                <div className="text-[11px] font-bold text-foreground truncate">
                                    {img.label}
                                </div>
                                <div className="text-[10px] text-muted-foreground font-mono">
                                    #{idx + 1}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Lightbox Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close modal"
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                        <X size={24} />
                    </button>

                    <div className="relative max-w-6xl w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <Image
                            src={currentImg.src}
                            alt={currentImg.label}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="mt-4 text-center max-w-2xl text-white space-y-1">
                        <div className="font-bold text-base sm:text-lg text-cyan-400">
                            {currentImg.label}
                        </div>
                        {currentImg.caption && (
                            <p className="text-xs sm:text-sm text-white/80">
                                {currentImg.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
