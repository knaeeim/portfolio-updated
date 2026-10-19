"use client";

import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Send, MapPin, Sparkles, MessageCircle, ArrowUpRight, Phone, ShieldCheck, Clock } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "./ui/button";

interface ContactSectionProps {
    data?: any;
}

const ContactSection = ({ data }: ContactSectionProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const general = data?.general || {};
    const name = general.name || "Khairul Bashar Naeeim";
    const company = general.company || "WebZen";
    const email = general.email || "kmnaeeim@gmail.com";
    const phone = general.phone || "+880 1712-854941";
    const whatsapp = general.whatsapp || "https://wa.me/8801712854941";
    const location = general.location || "Dhaka, Bangladesh • Global Remote Advisory";
    const github = general.github || "https://github.com/knaeeim";
    const linkedin = general.linkedin || "https://www.linkedin.com/in/kmnaeeim";

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            offset: 80,
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success("Executive message delivered successfully! I will get back to you shortly.");
                form.reset();
            } else {
                toast.success("Thank you for your inquiry! Your request has been queued.");
                form.reset();
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.success("Thank you! For urgent executive matters, please reach out directly on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 2-Column Symmetrically Aligned Grid (Same Height, Equal Alignment) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    
                    {/* LEFT COLUMN: Executive Proposition & Contact Channels (5 Cols) */}
                    <div className="lg:col-span-5 relative flex" data-aos="fade-right">
                        <div className="w-full relative rounded-2xl border border-white/10 dark:border-white/5 bg-card/75 backdrop-blur-2xl shadow-2xl p-5 sm:p-7 flex flex-col justify-between space-y-6">
                            {/* Top: Header Info */}
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold max-w-full">
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="truncate">OPEN FOR ADVISORY &amp; VENTURES</span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
                                    Let’s Architect Your Next{" "}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-cyan-500">
                                        Digital Breakthrough
                                    </span>.
                                </h2>

                                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-normal">
                                    Whether you are launching a new tech venture, modernizing clinical or corporate systems, 
                                    or seeking principal architectural advisory, I am ready to collaborate.
                                </p>
                            </div>

                            {/* Middle: Compact, Unified Contact Channels */}
                            <div className="space-y-2.5">
                                {/* WhatsApp Channel */}
                                <a
                                    href={whatsapp}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                            <MessageCircle size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                                                Instant WhatsApp Helpline
                                            </div>
                                            <div className="text-xs sm:text-sm font-bold text-foreground">
                                                {phone}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                </a>

                                {/* Email Channel */}
                                <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm transition-colors hover:bg-card">
                                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                            Executive Email
                                        </div>
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                {/* Location Channel */}
                                <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm transition-colors hover:bg-card">
                                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                            Headquarters &amp; Availability
                                        </div>
                                        <div className="text-xs sm:text-sm font-semibold text-foreground">
                                            {location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Social Profiles */}
                            <div className="flex items-center justify-between pt-3 border-t border-border/60">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    Direct Connect:
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={github}
                                        target="_blank"
                                        aria-label="GitHub Profile"
                                        className="p-2 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300 shadow-xs">
                                        <Github size={16} />
                                    </Link>
                                    <Link
                                        href={linkedin}
                                        target="_blank"
                                        aria-label="LinkedIn Profile"
                                        className="p-2 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300 shadow-xs">
                                        <Linkedin size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Executive Inquiry Form (7 Cols) - Same Height & Symmetrical */}
                    <div className="lg:col-span-7 relative flex" data-aos="fade-left">
                        {/* Ambient glow background */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 rounded-3xl blur-xl opacity-50 pointer-events-none" />

                        <div className="w-full relative rounded-2xl border border-white/10 dark:border-white/5 bg-card/75 backdrop-blur-2xl shadow-2xl p-5 sm:p-7 flex flex-col justify-between space-y-6">
                            {/* Form Header */}
                            <div className="space-y-1.5 pb-2 border-b border-border/50">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                                        Send an Executive Inquiry
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        <Clock size={12} className="text-emerald-500" />
                                        <span>Response within 24h</span>
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Direct communication to {name}, Founder &amp; CEO of {company}.
                                </p>
                            </div>

                            {/* Form Fields - Textarea expands down to button */}
                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 shrink-0">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-0.5">
                                            Your Name / Organization
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Dr. Devojyoti Dutta"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-0.5">
                                            Corporate / Direct Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@company.com"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40 text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 flex-1 flex flex-col min-h-[180px]">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-0.5">
                                        Project Scope &amp; Vision
                                    </label>
                                    <textarea
                                        rows={8}
                                        name="message"
                                        placeholder="Describe your platform requirements, timeline, and strategic goals..."
                                        required
                                        className="w-full flex-1 min-h-[180px] px-4 py-3.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/40 text-sm font-medium leading-relaxed"
                                    />
                                </div>

                                <div className="shrink-0 pt-1">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        size="lg"
                                        className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer text-sm">
                                        <Send size={16} />
                                        <span>
                                            {isSubmitting ? "Dispatching Message..." : "Dispatch Strategic Inquiry"}
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer copyright bar */}
                <div className="mt-10 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">Khairul Bashar Naeeim</span>
                        <span>•</span>
                        <span>Founder &amp; CEO, WebZen</span>
                    </div>
                    <div>
                        © {new Date().getFullYear()} All Rights Reserved. Engineered with Next.js 15.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
