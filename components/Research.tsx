"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    BrainCircuit,
    Layers,
    Cpu,
    Eye,
    Activity,
    FileText,
    Database,
    Binary,
    Download,
    ExternalLink,
} from "lucide-react";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";

interface ResearchProps {
    data?: any;
}

const defaultResearch = {
    badge: "05. AI & COMPUTER VISION",
    title: "Brain Tumor Classification & Segmentation",
    subtitle: "Pioneering Hybrid CNN-Vision Transformer (ViT) & Explainable AI (XAI) for Medical Image Processing",
    status: "Active Research • Benchmark Validation",
    leadResearcher: "Khairul Bashar Naeeim",
    institution: "Sonargaon University — Dept. of CSE",
    abstract:
        "Active research developing a synergistic Hybrid CNN-ViT deep learning framework with Explainable AI (Grad-CAM) for high-precision classification and boundary segmentation of brain tumors across multi-sequence MRI scans.",
    dataset: "BraTS & Figshare MRI Benchmark (3,064+ Multi-sequence Scans)",
    targetTumors: "Glioma, Meningioma, Pituitary & Healthy Control Tissue",
    paperUrl: "https://github.com/knaeeim",
    paperFileUrl: "",
    paperFileName: "",
    pillars: [
        {
            title: "Brain Tumor Classification & Segmentation",
            tag: "Clinical Objective",
            highlight: "3,064+ MRI Benchmark",
            desc: "Sub-pixel boundary segmentation & multi-class diagnosis across Glioma, Meningioma, Pituitary tumors and healthy tissue.",
        },
        {
            title: "Hybrid CNN-Vision Transformer (ViT)",
            tag: "Model Architecture",
            highlight: "Dual-Path Feature Fusion",
            desc: "High-res CNN convolutional stem paired with 12-head Vision Transformer self-attention for global anatomical context.",
        },
        {
            title: "Explainable AI (XAI) & Grad-CAM",
            tag: "Interpretability",
            highlight: "Interpretable Saliency",
            desc: "Transparent activation heatmaps and attention rollout mapping eliminating black-box opacity for clinical trust.",
        },
    ],
    metrics: [
        { label: "DIAGNOSTIC ACCURACY", value: "98.7%", subtext: "Holdout benchmark" },
        { label: "SENSITIVITY / RECALL", value: "99.1%", subtext: "Ultra-low false negatives" },
        { label: "SPECIFICITY", value: "98.4%", subtext: "Precise tissue differentiation" },
        { label: "AUC-ROC SCORE", value: "0.994", subtext: "High discriminative power" },
    ],
    architectureSteps: [
        {
            step: "Phase 1: Multi-Sequence MRI Preprocessing",
            description: "Automated skull-stripping, intensity normalization (Z-score), and CLAHE contrast enhancement across T1/T2/FLAIR scans.",
            icon: "Layers",
        },
        {
            step: "Phase 2: Deep CNN Spatial Feature Extractor",
            description: "Multi-scale convolutional stem isolating microscopic tumor boundaries and edema tissue micro-margins.",
            icon: "Cpu",
        },
        {
            step: "Phase 3: Vision Transformer (ViT) Engine",
            description: "12-head self-attention modeling long-range anatomical dependencies across brain slice cross-sections.",
            icon: "Eye",
        },
        {
            step: "Phase 4: Cross-Attention Fusion & Grad-CAM XAI",
            description: "Dual-path bottleneck fusion producing 4-class diagnosis with transparent Grad-CAM activation saliency maps.",
            icon: "Activity",
        },
    ],
    techStack: [
        "PyTorch 2.4",
        "Vision Transformers (ViT)",
        "OpenCV",
        "Torchvision",
        "Albumentations",
        "Grad-CAM Heatmaps",
        "CUDA Accelerated",
        "Python 3.11",
    ],
};

const getStepIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
        case "cpu":
            return Cpu;
        case "eye":
            return Eye;
        case "activity":
            return Activity;
        case "brain":
        case "braincircuit":
            return BrainCircuit;
        case "database":
            return Database;
        case "binary":
            return Binary;
        case "layers":
        default:
            return Layers;
    }
};

export const ResearchSection = ({ data }: ResearchProps) => {
    const research = data?.research || defaultResearch;
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    // Dynamically split title for Swiss editorial coloring
    const formatTitle = (rawTitle?: string) => {
        const title = rawTitle?.trim() || defaultResearch.title;
        const words = title.split(" ");
        if (words.length <= 1) return <span>{title}</span>;

        // If title contains '&' or 'and', highlight after that
        const ampIdx = words.findIndex((w) => w === "&" || w.toLowerCase() === "and");
        if (ampIdx !== -1 && ampIdx < words.length - 1) {
            const head = words.slice(0, ampIdx + 1).join(" ");
            const tail = words.slice(ampIdx + 1).join(" ");
            return (
                <>
                    {head} <span className="text-[#E64A11]">{tail}</span>
                </>
            );
        }

        // Highlight the last word or two
        const lastWord = words[words.length - 1];
        const prefix = words.slice(0, words.length - 1).join(" ");
        return (
            <>
                {prefix} <span className="text-[#E64A11]">{lastWord}</span>
            </>
        );
    };

    // Normalize architecture steps (dashboard saves as architectureSteps, legacy fallback architecturePhases)
    const pipelineSteps = Array.isArray(research.architectureSteps) && research.architectureSteps.length > 0
        ? research.architectureSteps
        : (Array.isArray(research.architecturePhases) && research.architecturePhases.length > 0
            ? research.architecturePhases.map((p: any) => ({
                step: p.phase || p.step,
                description: p.desc || p.description,
                icon: p.icon || "Layers",
            }))
            : defaultResearch.architectureSteps);

    const pillars = Array.isArray(research.pillars) && research.pillars.length > 0
        ? research.pillars
        : defaultResearch.pillars;

    const metrics = Array.isArray(research.metrics) && research.metrics.length > 0
        ? research.metrics
        : defaultResearch.metrics;

    const techStack = Array.isArray(research.techStack) && research.techStack.length > 0
        ? research.techStack
        : defaultResearch.techStack;

    return (
        <section
            id="research"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-screen scroll-mt-20 bg-pitch-black text-foreground relative overflow-hidden border-b poster-border py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-10 border-b poster-perimeter-border">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11]" />
                    <span className="text-neutral-900 dark:text-white font-semibold">
                        {research.badge || "05. AI & COMPUTER VISION"}
                    </span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    {research.status || "DEEP LEARNING INITIATIVE"}
                </div>
                <div className="flex items-center gap-2">
                    <span>{metrics[0]?.value ? `${metrics[0].value} PRECISION` : "98.7% PRECISION"}</span>
                    <FloatingPixel color="orange" className="hidden sm:block" />
                </div>
            </motion.div>

            {/* Giant Background Watermark Text (Layer 0) */}
            <motion.div
                style={l0}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="watermark-text text-[24vw] whitespace-nowrap">
                    VISION // 05
                </span>
            </motion.div>

            {/* Main Stage */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-8 lg:py-12 z-20 relative space-y-12">
                
                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 dark:border-white/5 pb-8">
                    <div className="space-y-3 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                            <span className="font-light text-neutral-500 dark:text-neutral-400 tracking-wide uppercase">
                                // {research.badge || "MEDICAL COMPUTER VISION INITIATIVE"}
                            </span>
                            {research.status && (
                                <span className="px-2 py-0.5 rounded-full bg-[#E64A11]/10 text-[#E64A11] border border-[#E64A11]/25 text-[10px] font-bold uppercase tracking-wider">
                                    {research.status}
                                </span>
                            )}
                        </div>

                        <h2 className="editorial-display text-3xl sm:text-5xl lg:text-6xl text-neutral-900 dark:text-white uppercase leading-tight">
                            {formatTitle(research.title)}
                        </h2>

                        {research.subtitle && (
                            <p className="font-mono text-xs sm:text-sm text-[#E64A11] font-semibold tracking-wide">
                                {research.subtitle}
                            </p>
                        )}

                        {(research.leadResearcher || research.institution) && (
                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-0.5">
                                {research.leadResearcher && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="text-neutral-900 dark:text-white font-semibold">Lead:</span>
                                        <span>{research.leadResearcher}</span>
                                    </span>
                                )}
                                {research.leadResearcher && research.institution && <span>•</span>}
                                {research.institution && (
                                    <span>{research.institution}</span>
                                )}
                            </div>
                        )}

                        <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
                            {research.abstract || defaultResearch.abstract}
                        </p>
                    </div>

                    {/* Action Links & Downloads */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-end shrink-0">
                        {research.paperFileUrl && (
                            <a
                                href={research.paperFileUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                download={research.paperFileName || true}
                                className="px-4 py-2.5 bg-[#E64A11] hover:bg-[#d0400c] text-white font-mono text-xs font-bold uppercase rounded-xs transition-colors inline-flex items-center gap-2 shadow-sm">
                                <FileText size={13} />
                                <span>{research.paperFileName ? "VIEW MANUSCRIPT (PDF)" : "MANUSCRIPT PDF"}</span>
                                <Download size={12} />
                            </a>
                        )}

                        <a
                            href={research.paperUrl || defaultResearch.paperUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs font-bold uppercase rounded-xs hover:border-[#E64A11] dark:hover:border-[#E64A11] transition-colors inline-flex items-center gap-2 shadow-sm dark:shadow-none">
                            <span>RESEARCH REPO</span>
                            <ArrowUpRight size={13} className="text-[#E64A11]" />
                        </a>
                    </div>
                </motion.div>

                {/* 4 Quantitative Benchmark Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 font-mono text-xs">
                    {metrics.map((item: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.94 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4 }}
                            className="p-3.5 sm:p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E0E0E]/90 shadow-sm dark:shadow-none space-y-1 transition-all">
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase">
                                {item.label}
                            </div>
                            <div className="editorial-display text-2xl sm:text-4xl text-[#E64A11] pt-1">
                                {item.value}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-light">{item.subtext}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Dataset & Pathology Target Specs Bar */}
                {(research.dataset || research.targetTumors) && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 sm:p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#0A0A09] font-mono text-xs">
                        {research.dataset && (
                            <div className="flex items-start gap-2.5">
                                <Database size={15} className="text-[#E64A11] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">
                                        Dataset Benchmark
                                    </span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-xs">
                                        {research.dataset}
                                    </span>
                                </div>
                            </div>
                        )}
                        {research.targetTumors && (
                            <div className="flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-3 md:pt-0 md:pl-4">
                                <Binary size={15} className="text-[#E64A11] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">
                                        Pathology &amp; Classification Classes
                                    </span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-xs">
                                        {research.targetTumors}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* SECTION 1: RESEARCH PILLARS & ARCHITECTURAL OBJECTIVES */}
                {pillars.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-neutral-500 uppercase tracking-wider font-bold">
                                // 01. RESEARCH PILLARS &amp; CORE OBJECTIVES:
                            </span>
                            <span className="text-[10px] text-[#E64A11] font-bold">
                                {pillars.length} CORE VECTORS
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
                            {pillars.map((pillar: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4 }}
                                    className="p-4 sm:p-6 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E0E0E]/90 shadow-sm dark:shadow-none space-y-3 hover:border-[#E64A11] dark:hover:border-[#E64A11] transition-all group flex flex-col justify-between">
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between text-[10px]">
                                            <span className="text-[#E64A11] font-bold">PILLAR 0{idx + 1}</span>
                                            {pillar.tag && (
                                                <span className="text-neutral-500 uppercase font-semibold">
                                                    {pillar.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#E64A11] transition-colors font-sans leading-snug">
                                            {pillar.title}
                                        </h3>

                                        <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed font-sans">
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    {pillar.highlight && (
                                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900">
                                            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-[#E64A11] font-bold border border-neutral-200 dark:border-neutral-700/60">
                                                {pillar.highlight}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SECTION 2: MULTI-LAYER ARCHITECTURE PIPELINE & NEURAL FLOW */}
                {pipelineSteps.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-neutral-500 uppercase tracking-wider font-bold">
                                // 02. ARCHITECTURE PIPELINE LAYERS &amp; PHASES:
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                                4-TIER END-TO-END FLOW
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
                            {pipelineSteps.map((step: any, idx: number) => {
                                const StepIcon = getStepIcon(step.icon);
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -4 }}
                                        className="p-4 sm:p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 shadow-sm dark:shadow-none space-y-2.5 hover:border-[#E64A11] dark:hover:border-[#E64A11] transition-all group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#E64A11] font-bold text-[10px] block">
                                                {step.step || `LAYER 0${idx + 1}`}
                                            </span>
                                            <StepIcon size={14} className="text-neutral-400 group-hover:text-[#E64A11] transition-colors" />
                                        </div>
                                        <p className="font-light text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed font-sans">
                                            {step.description || step.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* SECTION 3: FRAMEWORKS & DEEP LEARNING STACK */}
                {techStack.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                            // 03. COMPUTE &amp; DEEP LEARNING FRAMEWORKS:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A09] font-mono text-xs text-neutral-800 dark:text-neutral-200 font-semibold hover:border-[#E64A11] dark:hover:border-[#E64A11] transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </div>

        </section>
    );
};

export default ResearchSection;
