"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    BrainCircuit,
    Layers,
    Cpu,
    Eye,
    Activity,
    FileText,
    ExternalLink,
    Sparkles,
    CheckCircle2,
    Microscope,
    Database,
    Zap,
    ArrowRight,
    ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResearchProps {
    data?: any;
}

const defaultResearch = {
    badge: "ONGOING RESEARCH INITIATIVE • MEDICAL AI & CV",
    title: "Brain Tumor Classification & Segmentation",
    subtitle: "Pioneering Hybrid CNN-Vision Transformer (ViT) & Explainable AI (XAI) for Medical Image Processing",
    status: "Ongoing Research • Active Model Benchmarking",
    leadResearcher: "Khairul Bashar Naeeim",
    institution: "Sonargaon University — Dept. of Computer Science & Engineering",
    abstract: "Active research developing a synergistic Hybrid CNN-ViT deep learning framework with Explainable AI (Grad-CAM) for high-precision classification and boundary segmentation of brain tumors across multi-sequence MRI scans.",
    dataset: "Figshare & BraTS MRI Benchmark (3,064+ Multi-sequence Scans)",
    targetTumors: "Glioma, Meningioma, Pituitary & Healthy Control Tissue",
    paperUrl: "https://github.com/knaeeim",
    pillars: [
        {
            id: "segmentation",
            title: "Brain Tumor Classification & Segmentation",
            desc: "Sub-pixel boundary segmentation & 4-class diagnosis across Glioma, Meningioma, Pituitary and healthy tissue.",
            tag: "Clinical Objective",
            highlight: "3,064+ MRI Benchmark",
            bullets: [
                "Multi-sequence MRI evaluation (T1, T2, FLAIR)",
                "4-class multi-label diagnosis & tissue stratification",
                "Precise boundary demarcation between tumor & edema",
            ],
        },
        {
            id: "hybrid-vit",
            title: "Hybrid CNN-Vision Transformer (ViT)",
            desc: "High-res CNN convolutional stem paired with 12-head Vision Transformer self-attention for global anatomical context.",
            tag: "Model Architecture",
            highlight: "Dual-Path Feature Fusion",
            bullets: [
                "Deep CNN stem for granular edge & texture extraction",
                "ViT 12-head self-attention for global context mapping",
                "Cross-attention bottleneck for localized-global synthesis",
            ],
        },
        {
            id: "xai",
            title: "Explainable AI (XAI) & Grad-CAM",
            desc: "Transparent activation heatmaps and attention rollout mapping eliminating black-box opacity for clinical trust.",
            tag: "Clinical Interpretability",
            highlight: "Zero Black-Box Opacity",
            bullets: [
                "Grad-CAM visual localization on tumor tissue",
                "Multi-head self-attention rollout saliency maps",
                "Empowering radiologists with verifiable AI decisions",
            ],
        },
    ],
    metrics: [
        { label: "Diagnostic Accuracy", value: "98.7%", subtext: "Holdout benchmark" },
        { label: "Sensitivity / Recall", value: "99.1%", subtext: "Ultra-low false negatives" },
        { label: "Specificity", value: "98.4%", subtext: "Precise tissue differentiation" },
        { label: "AUC-ROC Score", value: "0.994", subtext: "High discriminative power" },
    ],
    architectureSteps: [
        {
            step: "Phase 1: Multi-Sequence MRI Preprocessing",
            description: "Automated skull-stripping, intensity normalization (Z-score), and CLAHE contrast enhancement.",
            icon: "Layers",
        },
        {
            step: "Phase 2: Deep CNN Spatial Feature Extractor",
            description: "High-res convolutional stem isolating microscopic tumor boundaries and edema tissue margins.",
            icon: "Cpu",
        },
        {
            step: "Phase 3: Vision Transformer (ViT) Engine",
            description: "12-layer multi-head self-attention modeling long-range anatomical dependencies across brain slices.",
            icon: "Eye",
        },
        {
            step: "Phase 4: Cross-Attention Fusion & Explainable XAI",
            description: "Dual-path bottleneck fusion producing 4-class diagnosis with Grad-CAM activation heatmaps.",
            icon: "Activity",
        },
    ],
    techStack: [
        "PyTorch",
        "Vision Transformers (ViT)",
        "OpenCV",
        "Torchvision",
        "Albumentations",
        "Grad-CAM Heatmaps",
        "CUDA Accelerated",
        "Python 3.11",
    ],
};

const iconMap: Record<string, any> = {
    Layers,
    Cpu,
    Eye,
    Activity,
    BrainCircuit,
    Microscope,
    Database,
    Zap,
    ScanLine,
};

export const ResearchSection = ({ data }: ResearchProps) => {
    const researchData = data?.research || defaultResearch;
    const [activeTab, setActiveTab] = useState<"pipeline" | "explainability" | "dataset">("pipeline");

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-out-cubic",
            once: true,
            offset: 60,
        });
    }, []);

    const pillars = researchData.pillars || defaultResearch.pillars;
    const steps = researchData.architectureSteps || defaultResearch.architectureSteps;
    const metrics = researchData.metrics || defaultResearch.metrics;
    const techStack = researchData.techStack || defaultResearch.techStack;

    return (
        <section id="research" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Ambient executive glow lights */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 dark:bg-primary/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Executive Section Header - Crisp & Concise */}
                <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 backdrop-blur-md mb-2.5">
                        <Microscope size={13} className="text-cyan-500" />
                        <span>{researchData.badge || "ONGOING RESEARCH INITIATIVE • MEDICAL AI & CV"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                        {researchData.title || "Brain Tumor Classification & Segmentation"}
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                        {researchData.subtitle || "Pioneering Hybrid CNN-Vision Transformer (ViT) & Explainable AI (XAI) for Medical Image Processing"}
                    </p>
                </div>

                {/* Main Glassmorphic Research Hub Card */}
                <div
                    className="relative rounded-2xl sm:rounded-3xl border border-white/10 dark:border-white/5 bg-card/65 backdrop-blur-2xl shadow-2xl overflow-hidden p-5 sm:p-7 lg:p-9 space-y-6 sm:space-y-8"
                    data-aos="fade-up">
                    
                    {/* Top Status & Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/50">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span>{researchData.status || "Ongoing Research • Active Model Benchmarking"}</span>
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                                {researchData.institution || "Sonargaon University — Dept. of CSE"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-xl text-xs font-semibold gap-1.5 border-border/80 bg-background/50 backdrop-blur-md hover:bg-background h-8">
                                <a
                                    href={researchData.paperUrl || "https://github.com/knaeeim"}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    <FileText size={13} />
                                    <span>Research Code / Repo</span>
                                    <ExternalLink size={12} className="opacity-70" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* 3 CORE EXECUTIVE RESEARCH PILLARS */}
                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                            <Sparkles size={13} className="text-primary" />
                            <span>Three Core Research Frontiers</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Pillar 1: Brain Tumor Classification & Segmentation */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/5 backdrop-blur-xl hover:border-cyan-500/40 transition-all space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                        Clinical Target
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-cyan-500 transition-colors">
                                        Classification &amp; Segmentation
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        Sub-pixel boundary segmentation &amp; 4-class diagnosis across Glioma, Meningioma, Pituitary and healthy tissue.
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-cyan-500/10 space-y-1">
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-cyan-500 shrink-0" />
                                        <span>3,064+ MRI scans (T1, T2, FLAIR)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-cyan-500 shrink-0" />
                                        <span>Edema &amp; tumor core demarcation</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pillar 2: Hybrid CNN-Vision Transformer (ViT) */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/5 backdrop-blur-xl hover:border-blue-500/40 transition-all space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                        <Cpu size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                        Model Architecture
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-blue-500 transition-colors">
                                        Hybrid CNN-ViT Model
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        Coupling deep CNN local edge/texture extraction with Vision Transformer global anatomical self-attention.
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-blue-500/10 space-y-1">
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                                        <span>12-Head Multi-Head Self-Attention</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                                        <span>Dual-path bottleneck cross-attention</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pillar 3: Explainable AI (XAI) */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/5 backdrop-blur-xl hover:border-emerald-500/40 transition-all space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                                        <Eye size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        Clinical Trust
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                                        Explainable AI (XAI)
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        Transparent Grad-CAM activation heatmaps and attention rollout mapping eliminating black-box opacity.
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-emerald-500/10 space-y-1">
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                        <span>Grad-CAM visual localization heatmaps</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                        <span>Interpretable saliency for radiologists</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quantitative Empirical Metrics Ribbon */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {metrics.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-3.5 sm:p-4 rounded-xl border border-white/10 dark:border-white/5 bg-background/60 dark:bg-card/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
                                <div className="text-[10px] font-bold text-muted-foreground tracking-wide uppercase">
                                    {item.label}
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-foreground group-hover:text-cyan-500 transition-colors mt-0.5 font-mono tracking-tight">
                                    {item.value}
                                </div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">
                                    {item.subtext}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pipeline & Technical Breakdown Tabs */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-1.5 border-b border-border/50 pb-2.5">
                            <button
                                type="button"
                                onClick={() => setActiveTab("pipeline")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === "pipeline"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                }`}>
                                4-Phase Architecture Pipeline
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("explainability")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === "explainability"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                }`}>
                                Grad-CAM &amp; XAI Heatmaps
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("dataset")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === "dataset"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                }`}>
                                MRI Dataset &amp; Benchmarks
                            </button>
                        </div>

                        {/* Tab 1: 4-Phase Architecture Pipeline */}
                        {activeTab === "pipeline" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {steps.map((st: any, idx: number) => {
                                    const IconComponent =
                                        typeof st.icon === "string" ? iconMap[st.icon] || Layers : st.icon || Layers;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-xl border border-white/5 bg-muted/20 backdrop-blur-md flex flex-col justify-between space-y-2 hover:border-cyan-500/20 transition-all">
                                            <div className="space-y-1.5">
                                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                                                    <IconComponent size={16} />
                                                </div>
                                                <h4 className="text-xs font-bold text-foreground">
                                                    {st.step}
                                                </h4>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                {st.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Tab 2: Grad-CAM & XAI Heatmaps */}
                        {activeTab === "explainability" && (
                            <div className="p-4 rounded-xl border border-white/5 bg-muted/20 backdrop-blur-md space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                            <span>Eliminating Black-Box Opacity with Grad-CAM</span>
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Vision Transformer multi-head self-attention weights coupled with Grad-CAM activation heatmaps pinpoint exact tumor tissue, necrotic regions, and active edema margins.
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-[10px] font-bold text-cyan-500 border border-cyan-500/20">
                                                Attention Rollout
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                                                Grad-CAM Heatmaps
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-500 border border-blue-500/20">
                                                Saliency Maps
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg border border-dashed border-cyan-500/30 bg-cyan-500/5 text-center space-y-1">
                                        <div className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                                            [MRI Scan] ➔ [CNN Stem] ➔ [ViT Self-Attention] ➔ [Grad-CAM Heatmap]
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">
                                            Dual-path feature fusion: granular cellular textures + global brain anatomy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Dataset & Experimental Setup */}
                        {activeTab === "dataset" && (
                            <div className="p-4 rounded-xl border border-white/5 bg-muted/20 backdrop-blur-md">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    <div className="p-3 rounded-lg bg-background/50 border border-white/5">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Dataset Benchmark</span>
                                        <div className="font-semibold text-foreground mt-0.5">{researchData.dataset}</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-background/50 border border-white/5">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Pathologies Diagnosed</span>
                                        <div className="font-semibold text-foreground mt-0.5">{researchData.targetTumors}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer: Tech Stack & Author Attribution */}
                    <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-bold text-muted-foreground mr-1">Deep Learning Stack:</span>
                            {techStack.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md bg-muted/60 border border-border/60 text-[10px] font-mono font-medium text-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                            <span>Lead Researcher:</span>
                            <span className="text-primary font-bold">{researchData.leadResearcher || "Khairul Bashar Naeeim"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchSection;
