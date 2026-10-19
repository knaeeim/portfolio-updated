"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit } from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";

interface ResearchProps {
    data?: any;
}

const defaultResearch = {
    badge: "05. AI RESEARCH",
    title: "Brain Tumor Segmentation",
    subtitle: "Hybrid CNN-ViT with Explainable AI (Grad-CAM)",
    status: "ACTIVE BENCHMARK",
    leadResearcher: "Khairul Bashar Naeeim",
    institution: "Sonargaon University — CSE",
    abstract:
        "Hybrid CNN-ViT architecture paired with Grad-CAM for high-precision multi-sequence MRI brain tumor segmentation across Glioma, Meningioma, Pituitary tumors.",
    dataset: "BraTS & Figshare (3,064+ Scans)",
    paperUrl: "https://github.com/knaeeim",
    metrics: [
        { label: "DIAGNOSTIC ACCURACY", value: "98.7%", subtext: "Holdout benchmark" },
        { label: "SENSITIVITY / RECALL", value: "99.1%", subtext: "Low false negatives" },
        { label: "SPECIFICITY", value: "98.4%", subtext: "Tissue stratification" },
        { label: "AUC-ROC SCORE", value: "0.994", subtext: "Discriminative power" },
    ],
    architecturePhases: [
        {
            phase: "PHASE 01: PREPROCESSING",
            desc: "Skull-stripping, Z-score normalization, and CLAHE equalization across T1/T2/FLAIR scans.",
        },
        {
            phase: "PHASE 02: CNN SPATIAL STEM",
            desc: "Multi-scale convolution layers isolating edge patterns and micro-margins.",
        },
        {
            phase: "PHASE 03: VISION TRANSFORMER (ViT)",
            desc: "12-head self-attention modeling anatomical slice dependencies.",
        },
        {
            phase: "PHASE 04: GRAD-CAM XAI",
            desc: "Feature synthesis generating 4-class diagnosis and visual heatmaps.",
        },
    ],
    techStack: [
        "PyTorch 2.4",
        "Vision Transformers (ViT)",
        "OpenCV",
        "Grad-CAM Heatmaps",
        "Python 3.11",
    ],
};

export const ResearchSection = ({ data }: ResearchProps) => {
    const research = data?.research || defaultResearch;
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    return (
        <section
            id="research"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-pitch-black text-white relative overflow-hidden border-b border-[#222220] py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span>05. AI &amp; COMPUTER VISION</span>
                </div>
                <div className="hidden sm:block text-neutral-500">
                    DEEP LEARNING INITIATIVE
                </div>
                <div className="flex items-center gap-2">
                    <span>98.7% PRECISION</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[24vw] text-[#121212] whitespace-nowrap">
                    VISION // 05
                </span>
            </motion.div>

            {/* Main Stage */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 lg:py-12 z-20 relative space-y-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                    <div className="space-y-2 max-w-2xl">
                        <span className="font-light text-neutral-300 text-xs sm:text-sm tracking-wide block uppercase font-mono">
                            // MEDICAL COMPUTER VISION INITIATIVE
                        </span>
                        <h2 className="editorial-display text-4xl sm:text-6xl text-white">
                            BRAIN TUMOR <span className="text-[#E64A11]">SEGMENTATION</span>
                        </h2>
                        <p className="font-light text-neutral-300 text-xs sm:text-sm">
                            {research.abstract || defaultResearch.abstract}
                        </p>
                    </div>

                    <a
                        href={research.paperUrl || defaultResearch.paperUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold uppercase rounded-xs hover:border-[#E64A11] transition-colors inline-flex items-center gap-2 self-start md:self-auto">
                        <span>RESEARCH REPO</span>
                        <ArrowUpRight size={13} className="text-[#E64A11]" />
                    </a>
                </div>

                {/* 4 Quantitative Benchmark Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                    {(research.metrics || defaultResearch.metrics).map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className="p-5 rounded-xs border border-neutral-800 bg-[#0E0E0E]/90 space-y-1">
                            <div className="text-[10px] text-neutral-400 font-bold">{item.label}</div>
                            <div className="editorial-display text-3xl sm:text-4xl text-[#E64A11] pt-1">
                                {item.value}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-light">{item.subtext}</div>
                        </div>
                    ))}
                </div>

                {/* 4 Pipeline Phases Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                    {(research.architecturePhases || defaultResearch.architecturePhases).map(
                        (phase: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-5 rounded-xs border border-neutral-800 bg-neutral-900/60 space-y-2 hover:border-[#E64A11] transition-colors">
                                <span className="text-[#E64A11] font-bold text-[10px] block">
                                    {phase.phase}
                                </span>
                                <p className="font-light text-neutral-300 text-xs leading-relaxed font-sans">
                                    {phase.desc}
                                </p>
                            </div>
                        )
                    )}
                </div>

            </div>

        </section>
    );
};

export default ResearchSection;
