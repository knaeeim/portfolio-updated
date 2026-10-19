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
    ShieldCheck,
    CheckCircle2,
    Microscope,
    Database,
    Zap,
    Download,
    Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResearchProps {
    data?: any;
}

const defaultResearch = {
    badge: "DEEP TECH & MEDICAL IMAGE PROCESSING",
    title: "Hybrid-CNN-ViT Architecture for Early Brain Tumor Detection",
    subtitle: "Synergizing Deep Convolutional Feature Extraction with Vision Transformer Self-Attention for Multi-Sequence MRI Diagnosis",
    status: "Active Research • Manuscript in Peer-Review",
    leadResearcher: "Khairul Bashar Naeeim",
    institution: "Sonargaon University — Department of Computer Science & Engineering",
    abstract: "Brain tumors present severe diagnostic challenges due to morphological heterogeneity and ambiguous tissue boundaries in magnetic resonance imaging (MRI). This research develops a novel Hybrid-CNN-ViT deep learning architecture that combines deep convolutional stems for granular edge/texture extraction with Vision Transformer multi-head self-attention mechanisms for global contextual dependency mapping across axial, coronal, and sagittal MRI brain slices.",
    dataset: "Figshare & BraTS Multi-sequence MRI Benchmark (3,064+ T1-weighted, T2, FLAIR Scans)",
    targetTumors: "Glioma, Meningioma, Pituitary Tumors & Healthy Control Tissue",
    paperUrl: "https://github.com/knaeeim",
    metrics: [
        { label: "Diagnostic Accuracy", value: "98.7%", subtext: "Tested on validation holdout" },
        { label: "Sensitivity / Recall", value: "99.1%", subtext: "Ultra-low false negatives" },
        { label: "Specificity", value: "98.4%", subtext: "Precise tissue differentiation" },
        { label: "AUC-ROC Score", value: "0.994", subtext: "High discriminative power" },
    ],
    architectureSteps: [
        {
            step: "Phase 1: Multi-Sequence MRI Preprocessing",
            description: "Automated skull-stripping, intensity normalization (Z-score), contrast-limited adaptive histogram equalization (CLAHE), and spatial augmentations to mitigate scanner variability.",
            icon: Layers,
        },
        {
            step: "Phase 2: Deep CNN Spatial Feature Extractor",
            description: "High-resolution convolutional stem extracting granular low-level visual representations: subtle hyper-intensities, edema margins, and microscopic tumor boundaries.",
            icon: Cpu,
        },
        {
            step: "Phase 3: Vision Transformer (ViT) Context Engine",
            description: "Linear projection into patch embeddings with 12-layer multi-head self-attention blocks, capturing global structural relationships across disparate brain regions.",
            icon: Eye,
        },
        {
            step: "Phase 4: Bottleneck Cross-Attention Fusion & Classification",
            description: "Dual-path cross-attention fusion layer synthesizing local and global embeddings, passing through MLP head for 4-class multi-label diagnosis with Grad-CAM explainability.",
            icon: Activity,
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
};

export const ResearchSection = ({ data }: ResearchProps) => {
    const researchData = data?.research || defaultResearch;
    const [activeTab, setActiveTab] = useState<"pipeline" | "explainability" | "dataset">("pipeline");

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 60,
        });
    }, []);

    const steps = researchData.architectureSteps || defaultResearch.architectureSteps;
    const metrics = researchData.metrics || defaultResearch.metrics;
    const techStack = researchData.techStack || defaultResearch.techStack;

    return (
        <section id="research" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Ambient Glassmorphic Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 dark:bg-primary/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-6 sm:mb-8" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] sm:text-xs font-bold text-cyan-600 dark:text-cyan-400 backdrop-blur-md mb-3">
                        <Microscope size={13} className="animate-spin-slow" />
                        <span>{researchData.badge || "DEEP TECH & MEDICAL IMAGE PROCESSING"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                        {researchData.title || "Hybrid-CNN-ViT Architecture for Early Brain Tumor Detection"}
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                        {researchData.subtitle || "Bridging Deep Convolutional Feature Extraction with Vision Transformer Self-Attention for Multi-Sequence MRI Diagnostic Precision."}
                    </p>
                </div>

                {/* Main Glassmorphic Research Hub Card */}
                <div
                    className="relative rounded-3xl border border-border/80 dark:border-white/10 bg-card/60 dark:bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden p-5 sm:p-8 lg:p-10 mb-8"
                    data-aos="fade-up">
                    {/* Top Status & Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-border/60">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span>{researchData.status || "Active Research • Manuscript in Peer-Review"}</span>
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">
                                {researchData.institution || "Sonargaon University — Department of CSE"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-xl text-xs font-semibold gap-1.5 border-border/80 bg-background/50 backdrop-blur-md hover:bg-background">
                                <a
                                    href={researchData.paperUrl || "https://github.com/knaeeim"}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    <FileText size={13} />
                                    <span>Research Abstract / Repo</span>
                                    <ExternalLink size={12} className="opacity-70" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Abstract Callout Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 backdrop-blur-md mb-8">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                                <BrainCircuit size={18} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                                    Research Abstract &amp; Diagnostic Objective
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {researchData.abstract}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Empirical Performance Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                        {metrics.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-4 rounded-2xl border border-border/70 dark:border-white/5 bg-background/50 dark:bg-card/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
                                <div className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
                                    {item.label}
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-cyan-500 transition-colors mt-1 font-mono tracking-tight">
                                    {item.value}
                                </div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">
                                    {item.subtext}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Interactive Tab Switcher for Deep Dive */}
                    <div className="flex items-center gap-2 mb-6 border-b border-border/60 pb-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab("pipeline")}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === "pipeline"
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-muted/30 text-muted-foreground hover:text-foreground"
                            }`}>
                            Hybrid Model Architecture
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("explainability")}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === "explainability"
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-muted/30 text-muted-foreground hover:text-foreground"
                            }`}>
                            Grad-CAM &amp; Attention Maps
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("dataset")}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeTab === "dataset"
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-muted/30 text-muted-foreground hover:text-foreground"
                            }`}>
                            MRI Dataset &amp; Benchmarks
                        </button>
                    </div>

                    {/* Tab 1: Pipeline Breakdown */}
                    {activeTab === "pipeline" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {steps.map((st: any, idx: number) => {
                                const IconComponent =
                                    typeof st.icon === "string" ? iconMap[st.icon] || Layers : st.icon || Layers;
                                return (
                                    <div
                                        key={idx}
                                        className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-muted/20 dark:bg-card/40 backdrop-blur-md flex items-start gap-3.5 hover:border-cyan-500/20 transition-all">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                                            <IconComponent size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">
                                                {st.step}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                {st.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Tab 2: Explainability & Attention Mechanism */}
                    {activeTab === "explainability" && (
                        <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-md space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>Multi-Head Self-Attention &amp; Clinical Explainability</span>
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Unlike black-box CNNs, our Vision Transformer integration computes tokenized patch attention weights across multi-sequence MRI slices (T1, T2, FLAIR). This produces transparent Grad-CAM activation heatmaps pinpointing precise active tumor regions, edema infiltration, and non-enhancing margins.
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-[10px] font-bold text-cyan-500 border border-cyan-500/20">
                                            Self-Attention Rollout
                                        </span>
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                                            Grad-CAM Localization
                                        </span>
                                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-500 border border-blue-500/20">
                                            Multi-Scale Saliency
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/5 text-center space-y-2">
                                    <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                                        [MRI Slice Input] ──&gt; [CNN Conv Stem] ──&gt; [ViT 12-Head Self-Attention] ──&gt; [Grad-CAM Diagnostic Output]
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">
                                        Dual-path feature fusion delivers localized spatial edge accuracy combined with global contextual brain anatomy modeling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Dataset & Experimental Setup */}
                    {activeTab === "dataset" && (
                        <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-md space-y-3">
                            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Database size={16} className="text-primary" />
                                <span>Multi-Sequence MRI Experimental Setup</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="p-3.5 rounded-xl bg-background/50 border border-border/60">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Primary Datasets</span>
                                    <div className="font-semibold text-foreground mt-0.5">{researchData.dataset}</div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-background/50 border border-border/60">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Tumor Classes Diagnosed</span>
                                    <div className="font-semibold text-foreground mt-0.5">{researchData.targetTumors}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tech Stack Pills Footer */}
                    <div className="pt-6 mt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-bold text-muted-foreground mr-1.5">Research Stack:</span>
                            {techStack.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 rounded-lg bg-card/80 border border-border/70 text-[10px] font-mono font-semibold text-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                            <span>Author:</span>
                            <span className="text-primary font-bold">{researchData.leadResearcher || "Khairul Bashar Naeeim"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchSection;
