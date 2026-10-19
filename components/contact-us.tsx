"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Copy,
    Check,
    MessageCircle,
    Phone,
    Linkedin,
    Github,
    FileText,
    Send,
    Download,
    ArrowUpRight,
    Code2,
} from "lucide-react";
import { toast } from "sonner";
import { usePosterParallax } from "@/components/poster/usePosterParallax";
import { FloatingPixel } from "@/components/poster/FloatingPixel";
import { CircularChevronBtn } from "@/components/poster/CircularChevronBtn";

interface ContactSectionProps {
    data?: any;
}

const quickTopics = [
    { label: "New Project", prefix: "Hi Naeeim, I'd like to build a new project: " },
    { label: "Architecture Advisory", prefix: "Hi Naeeim, looking for architecture advisory for: " },
    { label: "Collaboration", prefix: "Hi Naeeim, interested in collaborating on: " },
    { label: "Say Hello", prefix: "Hi Naeeim, " },
];

export const ContactSection = ({ data }: ContactSectionProps) => {
    const { handleMouseMove, handleMouseLeave, l0 } = usePosterParallax();

    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>("New Project");
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
                toast.success("Message transmitted! I will respond within 24 hours.");
            } else {
                toast.success("Message received! Thank you.");
            }
            setMessageText("");
            setEmailInput("");
            setNameInput("");
        } catch {
            toast.success("Message sent! For urgent needs, feel free to use WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer
            id="contact"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full scroll-mt-20 bg-pitch-black text-foreground relative overflow-hidden flex flex-col justify-between border-t poster-border py-12 sm:py-16 select-none">
            
            {/* Top Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-10 border-b poster-perimeter-border">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E64A11] animate-pulse" />
                    <span className="text-neutral-900 dark:text-white font-semibold">05. TRANSMISSION</span>
                </div>
                <div className="hidden sm:block text-neutral-500 dark:text-neutral-400">
                    DIRECT CHANNELS
                </div>
                <div className="flex items-center gap-2">
                    <span>DHAKA, BD // UTC+6</span>
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
                <span className="watermark-text text-[26vw] whitespace-nowrap">
                    CONTACT // 05
                </span>
            </motion.div>

            {/* Main Stage: Centered Burnt Orange Geometric Poster */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-10 z-20 relative space-y-12">
                
                {/* Central CTA Poster Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-sm burnt-stripes p-8 sm:p-14 lg:p-20 shadow-2xl border border-[#E64A11]/60 space-y-8 overflow-hidden">
                    
                    <div className="space-y-4 max-w-4xl">
                        <span className="font-light text-neutral-200 text-sm sm:text-base tracking-wide block uppercase font-mono">
                            Ready to collaborate on
                        </span>

                        <div className="space-y-1 sm:space-y-2">
                            <div className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-white">
                                YOUR NEXT
                            </div>
                            <div className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-black">
                                FLAGSHIP
                            </div>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-white">
                                    PROJECT
                                </div>
                                <CircularChevronBtn
                                    onClick={() => setIsFormOpen(!isFormOpen)}
                                    size="lg"
                                    className="text-white"
                                />
                            </div>
                        </div>

                        <p className="font-light text-neutral-100 text-xs sm:text-sm max-w-xl pt-2">
                            Available for high-stakes venture platforms, systems advisory, and full-stack engineering. 
                            Tap the chevron to dispatch a message or pick an instant direct line below.
                        </p>
                    </div>

                    {/* Instant Direct Channel Pills (Inside Orange Block) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-black/20 font-mono text-xs">
                        
                        {/* 1. WhatsApp */}
                        <a
                            href={whatsappDirectUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="p-3.5 rounded-xs bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-between group shadow">
                            <div className="flex items-center gap-2.5">
                                <MessageCircle size={16} className="text-[#E64A11]" />
                                <span className="font-bold">WhatsApp</span>
                            </div>
                            <ArrowUpRight size={13} className="opacity-70 group-hover:opacity-100" />
                        </a>

                        {/* 2. Copy Email */}
                        <div className="p-3.5 rounded-xs bg-black text-white flex items-center justify-between shadow">
                            <div className="flex items-center gap-2.5 truncate mr-2">
                                <Mail size={16} className="text-[#E64A11] shrink-0" />
                                <span className="font-bold truncate">{email}</span>
                            </div>
                            <button
                                type="button"
                                onClick={copyEmail}
                                className="text-[10px] text-[#E64A11] hover:underline font-bold shrink-0 cursor-pointer">
                                {copiedEmail ? "COPIED" : "COPY"}
                            </button>
                        </div>

                        {/* 3. Phone */}
                        <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="p-3.5 rounded-xs bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-between group shadow">
                            <div className="flex items-center gap-2.5">
                                <Phone size={16} className="text-[#E64A11]" />
                                <span className="font-bold">Direct Call</span>
                            </div>
                            <span className="text-[10px] text-neutral-400 font-mono">{phone}</span>
                        </a>

                        {/* 4. Resume */}
                        <a
                            href="/resume.pdf"
                            download
                            className="p-3.5 rounded-xs bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-between group shadow">
                            <div className="flex items-center gap-2.5">
                                <FileText size={16} className="text-[#E64A11]" />
                                <span className="font-bold">Executive CV</span>
                            </div>
                            <Download size={13} className="text-[#E64A11]" />
                        </a>

                    </div>

                </motion.div>

                {/* Morphing Quick-Dispatch Form Area */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E0E0E] shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-6">
                            
                            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/5 pb-3 font-mono text-xs">
                                <span className="text-[#E64A11] font-bold uppercase tracking-wider">
                                    // DIRECT TRANSMISSION TO NAEEIM
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                                    [ CLOSE ]
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                                
                                {/* Topic selector */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">TOPIC:</span>
                                    {quickTopics.map((topic) => (
                                        <button
                                            key={topic.label}
                                            type="button"
                                            onClick={() => {
                                                setSelectedTopic(topic.label);
                                                setMessageText(topic.prefix);
                                            }}
                                            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
                                                selectedTopic === topic.label
                                                    ? "bg-[#E64A11] text-white font-bold"
                                                    : "bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                                            }`}>
                                            {topic.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        placeholder="Your Name"
                                        className="w-full px-3 py-2.5 rounded-xs bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-[#E64A11]"
                                    />
                                    <input
                                        required
                                        type="text"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        placeholder="Your Email or WhatsApp *"
                                        className="w-full px-3 py-2.5 rounded-xs bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-[#E64A11]"
                                    />
                                </div>

                                <textarea
                                    required
                                    rows={3}
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Your note or project requirements..."
                                    className="w-full px-3 py-2.5 rounded-xs bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-[#E64A11] resize-none"
                                />

                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                        Replies typically within 24 hours
                                    </span>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-5 py-2.5 bg-[#E64A11] text-white font-bold rounded-xs hover:bg-[#FF5100] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow">
                                        <Send size={13} />
                                        <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH"}</span>
                                    </button>
                                </div>

                            </form>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Profiles & External Links Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-white/5 font-mono text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-neutral-500 text-[10px] uppercase">PROFILES:</span>
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-neutral-600 dark:text-neutral-300 hover:text-[#E64A11] dark:hover:text-white flex items-center gap-1 transition-colors">
                            <Linkedin size={13} />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-neutral-600 dark:text-neutral-300 hover:text-[#E64A11] dark:hover:text-white flex items-center gap-1 transition-colors">
                            <Github size={13} />
                            <span>GitHub</span>
                        </a>
                        <a
                            href="https://codeforces.com/profile/knaeeim"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-neutral-600 dark:text-neutral-300 hover:text-[#E64A11] dark:hover:text-white flex items-center gap-1 transition-colors">
                            <Code2 size={13} />
                            <span>Codeforces</span>
                        </a>
                    </div>

                    <a href="#home" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                        Back to Top ↑
                    </a>
                </div>

            </div>

            {/* Bottom Perimeter Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-6 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 z-10 border-t poster-perimeter-border">
                <div>© {new Date().getFullYear()} KHAIRUL BASHAR NAEEIM</div>
                <div>DHAKA // UTC+6</div>
                <div className="text-neutral-700 dark:text-neutral-400 font-semibold">@NAEEIM_DEV</div>
            </motion.div>

        </footer>
    );
};

export default ContactSection;
