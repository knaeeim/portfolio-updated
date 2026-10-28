import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowLeft,
    ExternalLink,
    Globe,
    Shield,
    Github,
    CheckCircle2,
    Layers,
    Sparkles,
    Calendar,
    Briefcase,
    Building2,
    Clock,
    User,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";
import { getPortfolioData } from "@/lib/portfolio-data";
import { Navbar1 } from "@/components/navbar1";
import ContactSection from "@/components/contact-us";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectBackButton from "@/components/ProjectBackButton";
import { Button } from "@/components/ui/button";

// Enable Incremental Static Regeneration (ISR) with Edge CDN caching
export const revalidate = 60;

// Pre-render all project case studies at build time for instant 0ms route transitions
export async function generateStaticParams() {
    const portfolioData = await getPortfolioData();
    const projects = portfolioData?.projects || [];
    return projects.map((p: any) => ({
        id: p.id,
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const portfolioData = await getPortfolioData();
    const project = portfolioData?.projects?.find((p: any) => p.id === id);

    if (!project) {
        return {
            title: "Case Study Not Found | WebZen Bangladesh",
            description: "The requested project case study could not be found.",
        };
    }

    return {
        title: `${project.title} — Architectural Case Study | WebZen Bangladesh`,
        description: project.description || project.subtitle,
    };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
    const { id } = await params;
    const portfolioData = await getPortfolioData();

    const companyName = portfolioData?.general?.company || "WebZen Bangladesh";
    const userName = portfolioData?.general?.name || "Khairul Bashar Naeeim";

    const project = portfolioData?.projects?.find((p: any) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                    <Building2 size={36} className="text-muted-foreground mx-auto mb-2" />
                    <h1 className="text-xl font-bold">Case Study Not Found</h1>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                        The requested venture blueprint could not be located in our production registry.
                    </p>
                </div>
                <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/#projects">
                        <ArrowLeft size={14} className="mr-2" />
                        Back to Portfolio Projects
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar1 companyName={companyName} userName={userName} />

            <main className="flex-1">
                {/* Top Sticky Breadcrumb Bar */}
                <div
                    className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-12 sm:top-13 z-30"
                    style={{ position: "sticky", zIndex: 30 }}>
                    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center justify-between gap-4">
                        <ProjectBackButton fallbackHref="/#projects" label="Back to Projects" />

                        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <span>Portfolio</span>
                            <ChevronRight size={12} className="opacity-50" />
                            <span className="text-foreground font-semibold truncate max-w-[200px]">
                                {project.title}
                            </span>
                        </div>

                        {project.liveLink && (
                            <Button
                                asChild
                                size="sm"
                                className="rounded-xl text-xs font-bold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-8">
                                <a href={project.liveLink} target="_blank" rel="noreferrer noopener">
                                    <span>Visit Live Site</span>
                                    <ArrowUpRight size={13} />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Hero Header Section */}
                <section className="relative py-10 sm:py-14 md:py-18 overflow-hidden">
                    {/* Ambient Glow Lights */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10 space-y-8">
                        {/* Status & Category Pills */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                                {project.categoryLabel || "Production Venture"}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{project.status || "Production Live"}</span>
                            </span>
                            {project.year && (
                                <span className="px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground text-xs font-mono border border-border">
                                    {project.year}
                                </span>
                            )}
                        </div>

                        {/* Title and Subtitle */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
                                {project.title}
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                                {project.subtitle}
                            </p>
                        </div>

                        {/* Metadata Details Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/80">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                    <User size={12} />
                                    <span>Leadership Role</span>
                                </span>
                                <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                                    {project.role}
                                </div>
                            </div>
                            {project.client && (
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                        <Briefcase size={12} />
                                        <span>Client / Partner</span>
                                    </span>
                                    <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5 truncate">
                                        {project.client}
                                    </div>
                                </div>
                            )}
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                    <Building2 size={12} />
                                    <span>Venture Studio</span>
                                </span>
                                <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                                    {companyName}
                                </div>
                            </div>
                        </div>

                        {/* Executive Overview Paragraph */}
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                                {project.description}
                            </p>
                        </div>

                        {/* Direct Action CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {project.liveLink && (
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-xl bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-primary-foreground font-bold shadow-lg shadow-primary/20">
                                    <a href={project.liveLink} target="_blank" rel="noreferrer noopener">
                                        <Globe className="mr-2 size-4" />
                                        <span>Visit Live Production Site</span>
                                        <ExternalLink className="ml-1.5 size-3.5 opacity-80" />
                                    </a>
                                </Button>
                            )}

                            {project.adminLink && (
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-border hover:bg-muted font-semibold">
                                    <a href={project.adminLink} target="_blank" rel="noreferrer noopener">
                                        <Shield className="mr-2 size-4 text-emerald-500" />
                                        <span>{project.id === "devojyoti-dutta" ? "Doctor / Clinical Portal" : project.id === "shankhapushpi-ecommerce" ? "Cloud POS & Admin Portal" : "Admin Portal"}</span>
                                        <ExternalLink className="ml-1.5 size-3.5 opacity-60" />
                                    </a>
                                </Button>
                            )}

                            {project.clientLink && (
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-border hover:bg-muted font-semibold">
                                    <a href={project.clientLink} target="_blank" rel="noreferrer noopener">
                                        <Github className="mr-2 size-4" />
                                        <span>Client Codebase</span>
                                    </a>
                                </Button>
                            )}

                            {project.serverLink && (
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-border hover:bg-muted font-semibold">
                                    <a href={project.serverLink} target="_blank" rel="noreferrer noopener">
                                        <Github className="mr-2 size-4" />
                                        <span>Backend API Repo</span>
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Key Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                    <section className="py-8 sm:py-10 border-y border-border/60 bg-muted/20">
                        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.metrics.map((m: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md text-center space-y-1">
                                        <div className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                                            {m.value}
                                        </div>
                                        <div className="text-xs text-muted-foreground font-medium">
                                            {m.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Interactive Multi-Screen Showcase */}
                {project.images && project.images.length > 0 && (
                    <section className="py-12 sm:py-16">
                        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                                    <Sparkles size={13} />
                                    <span>Production Screen Previews</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                    Interactive Architectural Gallery
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    High-resolution production screens demonstrating UI layouts, booking flows, and protected management consoles.
                                </p>
                            </div>

                            <ProjectGallery images={project.images} projectTitle={project.title} />
                        </div>
                    </section>
                )}

                {/* Core Architectural Features & Engineering Deliverables */}
                {project.features && project.features.length > 0 && (
                    <section className="py-12 sm:py-16 bg-muted/15 border-t border-border/60">
                        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    <Layers size={13} />
                                    <span>System Architecture</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                    Core Engineering Deliverables
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Key architectural capabilities and modular components engineered for this production deployment.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {project.features.map((feat: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2.5 hover:border-primary/40 transition-colors">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <h3 className="text-sm sm:text-base font-bold text-foreground">
                                                {feat.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-9.5">
                                            {feat.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Technology Stack & Tooling */}
                {project.tech && project.tech.length > 0 && (
                    <section className="py-12 sm:py-16 border-t border-border/60">
                        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    <span>Infrastructure &amp; Stack</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                    Technologies Employed
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tech.map((t: string) => (
                                    <span
                                        key={t}
                                        className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:border-primary/40 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Bottom Venture Call to Action */}
                <section className="py-14 sm:py-20 border-t border-border/60 bg-gradient-to-b from-card/40 to-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                            <Building2 size={13} />
                            <span>Venture Advisory with {companyName}</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                            Ready to Engineer Your Flagship Platform?
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            From clinical appointment engines to enterprise SaaS and deep learning architectures, WebZen Bangladesh transforms complex specifications into resilient production reality.
                        </p>
                        <div className="pt-2 flex flex-wrap justify-center gap-3">
                            <Button asChild size="lg" className="rounded-xl font-bold px-6">
                                <Link href="/#contact" prefetch={true}>
                                    Schedule Strategic Discussion
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-xl font-semibold">
                                <Link href="/#projects" prefetch={true}>
                                    Explore Other Case Studies
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <ContactSection data={portfolioData} />
        </div>
    );
}
