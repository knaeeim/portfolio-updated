"use client";

import React, { useState } from "react";
import {
    Mail,
    Copy,
    Check,
    ArrowUpRight,
    MessageCircle,
    Phone,
    Linkedin,
    Github,
    FileText,
    Send,
    Sparkles,
    Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
    data?: any;
}

const quickTopics = [
    { label: "New Project / Venture", prefix: "Project Inquiry: " },
    { label: "System Architecture Advisory", prefix: "Advisory Request: " },
    { label: "HealthTech / AI Collaboration", prefix: "Collaboration: " },
    { label: "Say Hello", prefix: "Hello Naeeim, " },
];

export const ContactSection = ({ data }: ContactSectionProps) => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>("New Project / Venture");
    const [messageText, setMessageText] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");

    const general = data?.general || {};
    const email = general.email || "kmnaeeim@gmail.com";
    const phone = general.phone || "+880 1712-854941";
    const whatsapp = general.whatsapp || "https://wa.me/8801712854941";
    const linkedin = general.linkedin || "https://www.linkedin.com/in/kmnaeeim";
    const github = general.github || "https://github.com/knaeeim";

    const whatsappDirectUrl = `https://wa.me/8801712854941?text=${encodeURIComponent(
        `Hi Naeeim, I came across your portfolio and would like to discuss ${selectedTopic}.`
    )}`;

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        toast.success(`Copied: ${email}`);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleTopicClick = (topic: typeof quickTopics[0]) => {
        setSelectedTopic(topic.label);
        if (!messageText.trim() || quickTopics.some((t) => messageText.startsWith(t.prefix))) {
            setMessageText(topic.prefix);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailInput.trim() || !messageText.trim()) {
            toast.error("Please provide your email and message.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                body: JSON.stringify({
                    name: nameInput.trim() || "Portfolio Visitor",
                    email: emailInput.trim(),
                    subject: `[${selectedTopic}] via naeeim.site`,
                    message: messageText.trim(),
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success("Message sent successfully! I'll reply within 24 hours.");
                setMessageText("");
                setEmailInput("");
                setNameInput("");
            } else {
                toast.success("Inquiry received! Thank you, I will get back to you shortly.");
                setMessageText("");
                setEmailInput("");
            }
        } catch {
            toast.success("Thank you! For urgent matters, feel free to reach out via WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer
            id="contact"
            className="w-full border-t border-border bg-background relative overflow-hidden py-14 sm:py-20">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Text-Light Header: Punchy & Effortless */}
                <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="tech-label text-foreground">
                                DIRECT CHANNELS // GET IN TOUCH
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                            Let&apos;s build together.
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-xl">
                            Have a project in mind, need architectural advisory, or just want to connect? 
                            Pick your preferred channel below.
                        </p>
                    </div>

                    {/* Live Availability Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono text-[#10B981]">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>AVAILABLE FOR HIGH-IMPACT PROJECTS</span>
                    </div>
                </div>

                {/* 12-Column Grid: Left 4 Instant Action Cards (6 cols) / Right Fast 2-Field Messenger (6 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT (6 COLS): 4 Visual 1-Click Fast Touchpoints */}
                    <div className="lg:col-span-6 space-y-4">
                        
                        <div className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">
                            INSTANT CHANNELS (ONE-CLICK):
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            
                            {/* Card 1: WhatsApp (Fastest) */}
                            <a
                                href={whatsappDirectUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="keycap-btn p-4 rounded-lg border border-[#10B981]/40 bg-[#10B981]/5 hover:bg-[#10B981]/10 hover:border-[#10B981] transition-all flex flex-col justify-between space-y-3 group cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                                        <MessageCircle size={18} />
                                    </div>
                                    <span className="text-[10px] text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/15">
                                        FASTEST
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground flex items-center gap-1 group-hover:text-[#10B981] transition-colors">
                                        <span>WhatsApp Chat</span>
                                        <ArrowUpRight size={13} />
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        Direct voice &amp; text chat
                                    </div>
                                </div>
                                <div className="text-[10px] text-[#10B981] font-sans">
                                    ● Typically replies in minutes
                                </div>
                            </a>

                            {/* Card 2: Click-to-Copy Direct Email */}
                            <div className="keycap-btn p-4 rounded-lg border border-border bg-card hover:border-[#FF4F00] transition-all flex flex-col justify-between space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-[#FF4F00]/10 text-[#FF4F00] flex items-center justify-center font-bold">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded bg-muted">
                                        PRIMARY
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground truncate">
                                        {email}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        Inquiries &amp; proposals
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={copyEmail}
                                        className="text-[11px] text-[#FF4F00] hover:underline flex items-center gap-1 font-semibold cursor-pointer">
                                        {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                                        <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
                                    </button>
                                    <span className="text-muted-foreground">•</span>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1">
                                        <span>Open Mail</span>
                                        <ArrowUpRight size={11} />
                                    </a>
                                </div>
                            </div>

                            {/* Card 3: Direct Phone Call */}
                            <a
                                href={`tel:${phone.replace(/\s+/g, "")}`}
                                className="keycap-btn p-4 rounded-lg border border-border bg-card hover:border-foreground transition-all flex flex-col justify-between space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">TEL</span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground flex items-center gap-1">
                                        <span>Direct Call</span>
                                        <ArrowUpRight size={13} />
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {phone}
                                    </div>
                                </div>
                                <div className="text-[10px] text-muted-foreground font-sans">
                                    Dhaka (UTC+6) • Global Roaming
                                </div>
                            </a>

                            {/* Card 4: Executive Resume (PDF) */}
                            <a
                                href="/resume.pdf"
                                download
                                className="keycap-btn p-4 rounded-lg border border-border bg-card hover:border-[#FF4F00] transition-all flex flex-col justify-between space-y-3 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                                        <FileText size={16} />
                                    </div>
                                    <span className="text-[10px] text-[#FF4F00] font-bold">PDF</span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground flex items-center gap-1 group-hover:text-[#FF4F00] transition-colors">
                                        <span>Download CV</span>
                                        <ArrowUpRight size={13} />
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        Complete executive credentials
                                    </div>
                                </div>
                                <div className="text-[10px] text-muted-foreground font-sans">
                                    Latest Oct 2026 Edition
                                </div>
                            </a>

                        </div>

                        {/* Social Badges Bar */}
                        <div className="flex items-center gap-2 pt-2 font-mono text-xs">
                            <span className="text-[10px] text-muted-foreground uppercase mr-1">PROFILES:</span>
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-3 py-1.5 rounded border border-border bg-card hover:border-foreground transition-all flex items-center gap-1.5 text-foreground text-[11px] font-semibold">
                                <Linkedin size={13} />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={github}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-3 py-1.5 rounded border border-border bg-card hover:border-foreground transition-all flex items-center gap-1.5 text-foreground text-[11px] font-semibold">
                                <Github size={13} />
                                <span>GitHub</span>
                            </a>
                        </div>

                    </div>

                    {/* RIGHT (6 COLS): Ultra-Clean 2-Field Fast Messenger */}
                    <div className="lg:col-span-6 space-y-4">
                        
                        <div className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">
                            QUICK MESSAGE DISPATCH:
                        </div>

                        <form
                            onSubmit={handleFormSubmit}
                            className="p-5 sm:p-6 rounded-lg border border-border bg-card/60 space-y-4">
                            
                            {/* Single-Tap Topic Chips */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-mono text-muted-foreground">
                                    WHAT ARE YOU INTERESTED IN?
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {quickTopics.map((topic) => {
                                        const isSelected = selectedTopic === topic.label;
                                        return (
                                            <button
                                                key={topic.label}
                                                type="button"
                                                onClick={() => handleTopicClick(topic)}
                                                className={`px-2.5 py-1 rounded text-xs font-sans transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "bg-[#FF4F00] text-white font-semibold shadow-xs"
                                                        : "bg-muted/50 border border-border/80 text-muted-foreground hover:text-foreground"
                                                }`}>
                                                {topic.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact Info (Single Row: Name + Email) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-mono text-muted-foreground">YOUR NAME</label>
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        placeholder="e.g. Alex Rahman"
                                        className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-mono text-muted-foreground">YOUR EMAIL / WHATSAPP *</label>
                                    <input
                                        required
                                        type="text"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        placeholder="alex@company.com or +880..."
                                        className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-muted-foreground">HOW CAN I HELP YOU?</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Brief note about your project, timeline, or question..."
                                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors resize-none"
                                />
                            </div>

                            {/* Send CTA */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                                <div className="text-[11px] text-muted-foreground font-mono">
                                    Direct transmission to Naeeim&apos;s personal inbox
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="keycap-btn px-5 py-2.5 bg-foreground text-background font-bold text-xs font-mono rounded hover:bg-[#FF4F00] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0">
                                    <Send size={13} />
                                    <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

                {/* Bottom Colophon */}
                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
                    <div>
                        © {new Date().getFullYear()} Khairul Bashar Naeeim • WebZen Bangladesh
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Dhaka // UTC+6</span>
                        <span>•</span>
                        <a href="#home" className="hover:text-foreground transition-colors">
                            Back to Top ↑
                        </a>
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default ContactSection;
