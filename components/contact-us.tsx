"use client";

import React, { useEffect } from "react";
import { Mail, Github, Linkedin, Send, MapPin, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
            offset: 100,
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Here you can add your form submission logic
        console.log("Form submitted:", { name, email, message });
        
        // Show success message or send to API
        alert("Message sent successfully! (Add your email service integration here)");
        
        // Reset form
        e.currentTarget.reset();
    };

    return (
        <section id="contact" className="py-24 bg-background">
            {/* Exact same container as your Skills and Education sections */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT SIDE: Info (5 Columns) */}
                    <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                                <Sparkles size={14} />
                                <span>Available for Projects</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight mb-4">
                                Let’s chat about your{" "}
                                <span className="text-primary">next big idea</span>.
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                I&apos;m currently looking for new opportunities. Whether you have a
                                question or just want to say hi, I&apos;ll try my best to get back
                                to you!
                            </p>
                        </div>

                        {/* Visual Contact Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors hover:bg-card">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                        Email
                                    </p>
                                    <p className="text-sm font-medium">kmnaeeim@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors hover:bg-card">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                        Location
                                    </p>
                                    <p className="text-sm font-medium">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links with hover states */}
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="#"
                                className="p-4 rounded-2xl border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300">
                                <Github size={20} />
                            </a>
                            <a
                                href="#"
                                className="p-4 rounded-2xl border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Contact Form (7 Columns) */}
                    <div className="lg:col-span-7 relative" data-aos="fade-left">
                        {/* Subtle glow effect behind form */}
                        <div className="absolute -inset-2 bg-linear-to-r from-primary/10 to-transparent rounded-[2rem] blur-2xl opacity-50" />

                        <div className="relative p-8 md:p-10 rounded-[2rem] border border-border bg-card shadow-sm shadow-black/5">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-y-5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter name"
                                            required
                                            className="w-full px-5 py-2 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            required
                                            className="w-full px-5 py-2 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        placeholder="How can I help you?"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                <button type="submit" className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                                    <Send size={18} />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
