"use client";

import React from "react";
import { Menu, LayoutDashboard, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./Theme-Switcher";
import Link from "next/link";

interface Navbar1Props {
    className?: string;
    companyName?: string;
    userName?: string;
}

const navLinks = [
    { title: "Overview", url: "#home" },
    { title: "About", url: "#about" },
    { title: "Leadership", url: "#experience" },
    { title: "Projects", url: "#projects" },
    { title: "Arsenal", url: "#skills" },
    { title: "Education", url: "#education" },
    { title: "Contact", url: "#contact" },
];

export const Navbar1 = ({
    className,
    companyName = "WebZen",
    userName = "Khairul Bashar Naeeim",
}: Navbar1Props) => {
    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 transition-all",
                className,
            )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Brand Logo - Sleek & Guaranteed No Wrapping */}
                <a href="#home" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-blue-600 text-primary-foreground font-black text-[11px] tracking-tight shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                        <span>KBN</span>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-background" />
                    </div>
                    <div className="flex flex-col whitespace-nowrap">
                        <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
                            {userName}
                        </span>
                        <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mt-1 leading-none">
                            <span>Founder &amp; CEO</span>
                            <span className="w-1 h-1 rounded-full bg-primary/40" />
                            <span className="text-primary font-bold">{companyName}</span>
                        </span>
                    </div>
                </a>

                {/* Desktop Concise Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                    {navLinks.map((item) => (
                        <a
                            key={item.title}
                            href={item.url}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                            {item.title}
                        </a>
                    ))}
                </nav>

                {/* Right Action Cluster */}
                <div className="flex items-center gap-2.5 shrink-0">
                    {/* Live Availability Pill - Clean Single Line */}
                    <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span>Available for Projects</span>
                    </div>



                    {/* Theme Toggle */}
                    <ModeToggle />

                    {/* Direct Contact CTA */}
                    <Button
                        asChild
                        size="sm"
                        className="rounded-xl font-bold px-4 h-9 shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                        <a href="#contact">
                            <span>Schedule Call</span>
                        </a>
                    </Button>

                    {/* Mobile Menu Hamburger */}
                    <div className="block lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72 p-6 flex flex-col justify-between">
                                <div>
                                    <SheetHeader className="text-left mb-6">
                                        <SheetTitle className="flex items-center gap-2.5">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-black text-[11px] tracking-tight">
                                                KBN
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{userName}</span>
                                                <span className="text-xs text-muted-foreground font-normal">
                                                    Founder &amp; CEO, {companyName}
                                                </span>
                                            </div>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="flex flex-col space-y-2">
                                        {navLinks.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.url}
                                                className="px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>


                                <div className="pt-4 border-t border-border/60">
                                    <Button asChild className="w-full rounded-xl font-bold">
                                        <a href="#contact">Schedule Consultation</a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};
