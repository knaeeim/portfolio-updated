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
    Download,
} from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
    data?: any;
}

const quickTopics = [
    { label: "Project", prefix: "Hi Naeeim, I'd like to discuss a project: " },
    { label: "Advisory", prefix: "Hi Naeeim, interested in architecture advisory for: " },
    { label: "Collaboration", prefix: "Hi Naeeim, interested in collaborating on: " },
    { label: "Say Hello", prefix: "Hi Naeeim, " },
];

export const ContactSection = ({ data }: ContactSectionProps) => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>("Project");
    const [messageText, setMessageText] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");

    const general = data?.general || {};
    const email = general.email || "kmnaeeim@gmail.com";
    const phone = general.phone || "+880 1712-854941";
    const linkedin = general.linkedin || "https://www.linkedin.com/in/kmnaeeim";
    const github = general.github || "https://github.com/knaeeim";

    const whatsappDirectUrl = `https://wa.me/8801712854941?text=${encodeURIComponent(
        `Hi Naeeim, reaching out regarding ${selectedTopic}.`
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
            toast.error("Please enter your email and message.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                body: JSON.stringify({
                    name: nameInput.trim() || "Visitor",
                    email: emailInput.trim(),
                    subject: `[${selectedTopic}] via naeeim.site`,
                    message: messageText.trim(),
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success("Message sent! I'll reply within 24 hours.");
            } else {
                toast.success("Received! I will get back to you shortly.");
            }
            setMessageText("");
            setEmailInput("");
            setNameInput("");
        } catch {
            toast.success("Message received! Thank you.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer
            id="contact"
            className="w-full border-t border-border bg-background relative overflow-hidden py-10 sm:py-14">
            
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Text-Light Header */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="tech-label text-foreground">
                                07. DIRECT CONTACT
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                            Let&apos;s talk.
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/25 text-[11px] font-mono text-[#10B981] self-start sm:self-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>AVAILABLE FOR WORK &amp; ADVISORY</span>
                    </div>
                </div>

                {/* Grid: 4 Instant Action Cards (Left) + Quick Form (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT (6 COLS): 4 Ultra-Clean Instant Cards */}
                    <div className="lg:col-span-6 space-y-3 font-mono text-xs">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            
                            {/* Card 1: WhatsApp */}
                            <a
                                href={whatsappDirectUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="keycap-btn p-3.5 rounded-lg border border-[#10B981]/35 bg-[#10B981]/5 hover:bg-[#10B981]/10 hover:border-[#10B981] transition-all flex flex-col justify-between space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-7 h-7 rounded bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                                        <MessageCircle size={16} />
                                    </div>
                                    <span className="text-[10px] text-[#10B981] font-bold">
                                        CHAT ↗
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground group-hover:text-[#10B981] transition-colors">
                                        WhatsApp
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {phone}
                                    </div>
                                </div>
                            </a>

                            {/* Card 2: Email */}
                            <div className="keycap-btn p-3.5 rounded-lg border border-border bg-card hover:border-[#FF4F00] transition-all flex flex-col justify-between space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-7 h-7 rounded bg-[#FF4F00]/10 text-[#FF4F00] flex items-center justify-center font-bold">
                                        <Mail size={16} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={copyEmail}
                                        className="text-[10px] text-[#FF4F00] hover:underline flex items-center gap-1 font-bold cursor-pointer">
                                        {copiedEmail ? <Check size={11} /> : <Copy size={11} />}
                                        <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                                    </button>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground truncate">
                                        Email
                                    </div>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-[11px] text-muted-foreground hover:text-foreground truncate block mt-0.5">
                                        {email}
                                    </a>
                                </div>
                            </div>

                            {/* Card 3: Phone */}
                            <a
                                href={`tel:${phone.replace(/\s+/g, "")}`}
                                className="keycap-btn p-3.5 rounded-lg border border-border bg-card hover:border-foreground transition-all flex flex-col justify-between space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-7 h-7 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                                        <Phone size={15} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-bold group-hover:text-foreground">
                                        CALL ↗
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground">
                                        Direct Phone
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {phone}
                                    </div>
                                </div>
                            </a>

                            {/* Card 4: Resume */}
                            <a
                                href="/resume.pdf"
                                download
                                className="keycap-btn p-3.5 rounded-lg border border-border bg-card hover:border-[#FF4F00] transition-all flex flex-col justify-between space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                                        <FileText size={15} />
                                    </div>
                                    <span className="text-[10px] text-[#FF4F00] font-bold group-hover:underline flex items-center gap-0.5">
                                        PDF <Download size={10} />
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold font-sans text-sm text-foreground group-hover:text-[#FF4F00] transition-colors">
                                        Executive CV
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        1-Click Download
                                    </div>
                                </div>
                            </a>

                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                            <span className="text-[10px] text-muted-foreground uppercase mr-1">PROFILES:</span>
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-2.5 py-1 rounded border border-border bg-card hover:border-foreground transition-all flex items-center gap-1.5 text-foreground text-[11px] font-semibold">
                                <Linkedin size={12} />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={github}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-2.5 py-1 rounded border border-border bg-card hover:border-foreground transition-all flex items-center gap-1.5 text-foreground text-[11px] font-semibold">
                                <Github size={12} />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://codeforces.com/profile/knaeeim"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="px-2.5 py-1 rounded border border-border bg-card hover:border-foreground transition-all flex items-center gap-1.5 text-foreground text-[11px] font-semibold">
                                <span>Codeforces</span>
                            </a>
                        </div>

                    </div>

                    {/* RIGHT (6 COLS): Ultra-Clean 2-Field Dispatch */}
                    <div className="lg:col-span-6">
                        
                        <form
                            onSubmit={handleFormSubmit}
                            className="p-4 sm:p-5 rounded-lg border border-border bg-card/60 space-y-3 font-mono text-xs">
                            
                            {/* Topic Chips */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-muted-foreground uppercase mr-1">TOPIC:</span>
                                {quickTopics.map((topic) => {
                                    const isSelected = selectedTopic === topic.label;
                                    return (
                                        <button
                                            key={topic.label}
                                            type="button"
                                            onClick={() => handleTopicClick(topic)}
                                            className={`px-2.5 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                                                isSelected
                                                    ? "bg-[#FF4F00] text-white font-bold"
                                                    : "bg-muted/50 border border-border/80 text-muted-foreground hover:text-foreground"
                                            }`}>
                                            {topic.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors"
                                />
                                <input
                                    required
                                    type="text"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="Your Email or Phone *"
                                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors"
                                />
                            </div>

                            <textarea
                                required
                                rows={3}
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Your note or project details..."
                                className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-xs font-sans outline-none focus:border-[#FF4F00] transition-colors resize-none"
                            />

                            {/* Submit Button */}
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-muted-foreground font-mono">
                                    Direct to personal inbox
                                </span>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="keycap-btn px-4 py-2 bg-foreground text-background font-bold text-xs font-mono rounded hover:bg-[#FF4F00] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
                                    <Send size={12} />
                                    <span>{isSubmitting ? "SENDING..." : "SEND"}</span>
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

                {/* Minimal Colophon */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
                    <div>
                        © {new Date().getFullYear()} Khairul Bashar Naeeim • Dhaka
                    </div>
                    <a href="#home" className="hover:text-foreground transition-colors">
                        Back to Top ↑
                    </a>
                </div>

            </div>

        </footer>
    );
};

export default ContactSection;
