"use client";

import React, { useState } from "react";
import {
    BrainCircuit,
    Layers,
    Cpu,
    Eye,
    Activity,
    FileText,
    ExternalLink,
    CheckCircle2,
    Database,
    Zap,
    ArrowUpRight,
} from "lucide-react";

interface ResearchProps {
    data?: any;
}

const defaultResearch = {
    badge: "05. AI RESEARCH",
    title: "Brain Tumor Segmentation",
    subtitle: "Hybrid CNN-ViT with Explainable AI (Grad-CAM)",
    status: "ACTIVE RESEARCH",
    leadResearcher: "Khairul Bashar Naeeim",
    institution: "Sonargaon University — CSE",
    abstract:
        "Hybrid CNN-ViT architecture paired with Grad-CAM for high-precision multi-sequence MRI brain tumor segmentation.",
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

    return (
        <section
            id="research"
            className="w-full border-b border-border bg-background relative overflow-hidden py-10 sm:py-14">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                            <span className="tech-label text-foreground">
                                {research.badge || defaultResearch.badge}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {research.title || defaultResearch.title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                            <span>{research.status || defaultResearch.status}</span>
                        </span>
                        <a
                            href={research.paperUrl || defaultResearch.paperUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="keycap-btn px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-[#FF4F00] transition-colors inline-flex items-center gap-1">
                            <span>RESEARCH REPO</span>
                            <ArrowUpRight size={11} className="text-[#FF4F00]" />
                        </a>
                    </div>
                </div>

                {/* Abstract & Dataset Bar */}
                <div className="p-5 rounded border border-border bg-card/60 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border pb-2">
                        <span className="uppercase">INVESTIGATION DOSSIER</span>
                        <span>LEAD: {research.leadResearcher || defaultResearch.leadResearcher}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground leading-relaxed font-sans">
                        {research.abstract || defaultResearch.abstract}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground border-t border-border">
                        <div>
                            <span className="text-foreground font-bold">DATASET:</span>{" "}
                            {research.dataset || defaultResearch.dataset}
                        </div>
                        <div>
                            <span className="text-foreground font-bold">INSTITUTION:</span>{" "}
                            {research.institution || defaultResearch.institution}
                        </div>
                    </div>
                </div>

                {/* 4 Quantitative Benchmark Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                    {(research.metrics || defaultResearch.metrics).map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className="p-4 rounded border border-border bg-card space-y-1">
                            <div className="text-[10px] text-muted-foreground">{item.label}</div>
                            <div className="text-2xl font-bold text-[#FF4F00]">{item.value}</div>
                            <div className="text-[10px] text-muted-foreground">{item.subtext}</div>
                        </div>
                    ))}
                </div>

                {/* Pipeline Architecture 4-Phase Grid */}
                <div className="space-y-3 font-mono text-xs">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        FOUR-PHASE PIPELINE ARCHITECTURE:
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(research.architecturePhases || defaultResearch.architecturePhases).map((step: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-4 rounded border border-border bg-card/40 space-y-2">
                                <div className="text-[10px] text-[#10B981] font-bold">
                                    {step.phase}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Ribbon */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border font-mono text-xs">
                    <span className="text-[10px] text-muted-foreground uppercase mr-2">
                        STACK ENVIRONMENT:
                    </span>
                    {(research.techStack || defaultResearch.techStack).map((item: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-muted/40 border border-border text-[11px] text-foreground font-medium">
                            {item}
                        </span>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default ResearchSection;
