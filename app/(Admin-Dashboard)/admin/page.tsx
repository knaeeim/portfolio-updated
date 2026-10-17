"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Briefcase,
    Layers,
    FolderKanban,
    GraduationCap,
    Mail,
    Save,
    RotateCcw,
    ExternalLink,
    Plus,
    Trash2,
    Upload,
    CheckCircle2,
    Image as ImageIcon,
    Sliders,
    Globe,
    Shield,
    ShieldCheck,
    Sparkles,
    User,
    ArrowLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Tag,
    Lock,
    Unlock,
    Key,
    LogOut,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type SectionTab =
    | "overview"
    | "general"
    | "hero"
    | "projects"
    | "experience"
    | "skills"
    | "about"
    | "education"
    | "security";

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<SectionTab>("overview");
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingFor, setUploadingFor] = useState<string | null>(null);

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    // Security Tab - Change Password States
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Selected project for editing
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

    // Verify session on mount
    useEffect(() => {
        const sessionToken = sessionStorage.getItem("wz_admin_session");
        if (sessionToken) {
            setIsAuthenticated(true);
            fetchData();
        } else {
            setIsCheckingAuth(false);
            setIsLoading(false);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordInput.trim()) return;

        try {
            setIsLoggingIn(true);
            setLoginError(null);
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: passwordInput.trim() }),
            });

            const json = await res.json();
            if (res.ok && json.success) {
                sessionStorage.setItem("wz_admin_session", json.token);
                setIsAuthenticated(true);
                setIsCheckingAuth(false);
                toast.success("Authentication successful! Welcome to WebZen Studio.");
                fetchData();
            } else {
                setLoginError(json.error || "Incorrect master password. Access denied.");
                toast.error("Access denied: Incorrect password.");
            }
        } catch (err) {
            setLoginError("Network connection error. Please try again.");
            toast.error("Authentication failed due to network error.");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("wz_admin_session");
        setIsAuthenticated(false);
        setPasswordInput("");
        setLoginError(null);
        toast.info("Admin dashboard locked and session closed.");
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 4) {
            toast.error("New password must be at least 4 characters long.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            setIsChangingPassword(true);
            const res = await fetch("/api/admin/auth", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const json = await res.json();
            if (res.ok && json.success) {
                toast.success("Administrator password updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                toast.error(json.error || "Failed to update master password.");
            }
        } catch (err) {
            toast.error("Failed to update password. Server error.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/portfolio");
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                toast.error("Failed to load portfolio data");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Error connecting to data API");
        } finally {
            setIsLoading(false);
            setIsCheckingAuth(false);
        }
    };

    const handleSave = async () => {
        if (!data) return;
        try {
            setIsSaving(true);
            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success("Portfolio successfully saved and published!");
            } else {
                toast.error("Failed to save changes.");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Network error while saving.");
        } finally {
            setIsSaving(false);
        }
    };

    // Generic state updaters
    const updateGeneral = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            general: { ...prev.general, [field]: value },
        }));
    };

    const updateHero = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            hero: { ...prev.hero, [field]: value },
        }));
    };

    // Handle Image Upload for a Project
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectIdx: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingFor(`project-${projectIdx}`);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const resJson = await res.json();
                const newImgUrl = resJson.url;

                // Add to project images
                setData((prev: any) => {
                    const projects = [...prev.projects];
                    const targetProj = { ...projects[projectIdx] };
                    targetProj.images = [
                        ...targetProj.images,
                        {
                            src: newImgUrl,
                            label: file.name.replace(/\.[^/.]+$/, ""),
                            caption: "Project screenshot",
                        },
                    ];
                    projects[projectIdx] = targetProj;
                    return { ...prev, projects };
                });

                toast.success(`Image uploaded successfully! Added to project gallery.`);
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload failed.");
        } finally {
            setUploadingFor(null);
            e.target.value = "";
        }
    };

    // Handle Hero Section Portrait / CEO Image Upload
    const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingFor("hero-image");
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const resJson = await res.json();
                const newImgUrl = resJson.url;

                setData((prev: any) => ({
                    ...prev,
                    general: {
                        ...prev.general,
                        profileImage: newImgUrl,
                    },
                    hero: {
                        ...prev.hero,
                        profileImage: newImgUrl,
                    },
                }));

                toast.success("Hero image uploaded! Click 'Save Changes' to publish live.");
            } else {
                toast.error("Failed to upload hero image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload failed.");
        } finally {
            setUploadingFor(null);
            e.target.value = "";
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground font-mono">Verifying Founder Session...</p>
            </div>
        );
    }

    // RESTRICTED ACCESS SCREEN: Password Gate
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full max-w-md relative z-10" data-aos="zoom-in">
                    <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-2xl shadow-2xl p-7 sm:p-8 space-y-6">
                        {/* Header with Restricted Shield */}
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-blue-600 text-primary-foreground shadow-xl shadow-primary/25 mx-auto">
                                <Lock size={26} />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
                                    <Shield size={12} />
                                    <span>Restricted Founder Access</span>
                                </div>
                                <h1 className="text-2xl font-black text-foreground tracking-tight">
                                    WebZen Admin Studio
                                </h1>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Direct management console for Khairul Bashar Naeeim. Enter master password to proceed.
                                </p>
                            </div>
                        </div>

                        {/* Password Unlock Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-0.5">
                                    Master Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={passwordInput}
                                        onChange={(e) => {
                                            setPasswordInput(e.target.value);
                                            setLoginError(null);
                                        }}
                                        placeholder="Enter administrator password..."
                                        autoFocus
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-11 text-sm font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                        title={showPassword ? "Hide password" : "Show password"}>
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {loginError && (
                                    <p className="text-xs text-destructive flex items-center gap-1 pt-1 font-medium">
                                        <AlertCircle size={13} />
                                        <span>{loginError}</span>
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoggingIn || !passwordInput.trim()}
                                className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer">
                                <Unlock size={16} />
                                <span>{isLoggingIn ? "Verifying Credentials..." : "Unlock Studio"}</span>
                            </Button>
                        </form>

                        {/* Helper info & return link */}
                        <div className="pt-2 border-t border-border/60 flex flex-col items-center gap-3 text-center">
                            <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-[11px] text-muted-foreground w-full">
                                <span className="font-semibold text-foreground">Default Password: </span>
                                <code className="px-1.5 py-0.5 rounded bg-background font-mono text-primary font-bold">admin</code>
                                <span className="ml-1 text-[10px] opacity-80">(can be changed inside studio)</span>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                                <ArrowLeft size={14} />
                                <span>Return to Public Portfolio</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground font-mono">Loading WebZen Admin Studio...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 text-foreground flex flex-col">
            {/* Top Command Bar */}
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="p-2 rounded-xl bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Back to Portfolio">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-black text-[11px] tracking-tight">
                            KBN
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm font-bold tracking-tight">WebZen Control Center</h1>
                                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Founder Session
                                </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Portfolio Content Management Studio</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold gap-1.5">
                        <a href="/" target="_blank" rel="noreferrer noopener">
                            <Eye size={14} />
                            <span className="hidden sm:inline">View Live Site</span>
                            <ExternalLink size={12} className="opacity-70" />
                        </a>
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        size="sm"
                        className="rounded-xl px-4 sm:px-5 text-xs font-bold gap-1.5 shadow-md shadow-primary/20 hover:shadow-lg">
                        <Save size={14} />
                        <span>{isSaving ? "Publishing..." : "Save Changes"}</span>
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        size="sm"
                        className="rounded-xl text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 px-3"
                        title="Lock Dashboard & Sign Out">
                        <LogOut size={14} />
                        <span className="hidden md:inline">Lock Studio</span>
                    </Button>
                </div>
            </header>

            {/* Main Layout Body */}
            <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 gap-8">
                {/* Left Navigation Sidebar */}
                <aside className="w-full md:w-64 shrink-0 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        Studio Sections
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-1.5">
                    {[
                        { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
                        { id: "general", label: "General & Branding", icon: User },
                        { id: "hero", label: "Hero & Banner", icon: Sparkles },
                        { id: "projects", label: "Projects & Images", icon: FolderKanban, badge: data.projects?.length },
                        { id: "experience", label: "Leadership & Exp", icon: Briefcase, badge: data.experience?.length },
                        { id: "skills", label: "Technical Arsenal", icon: Layers },
                        { id: "about", label: "Vision & Pillars", icon: Sliders },
                        { id: "education", label: "Education & Degrees", icon: GraduationCap },
                        { id: "security", label: "Security & Passwords", icon: ShieldCheck },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id as SectionTab)}
                                className={`w-full flex items-center justify-between px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-card/70"
                                }`}>
                                <div className="flex items-center gap-2 sm:gap-2.5 truncate">
                                    <Icon size={15} className="shrink-0" />
                                    <span className="truncate">{tab.label}</span>
                                </div>
                                {tab.badge !== undefined && (
                                    <span
                                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-muted text-muted-foreground"
                                        }`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                    </div>

                    <div className="hidden md:block pt-6 px-3">
                        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                <Shield size={14} className="text-emerald-500" />
                                <span>Direct Disk Sync</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Every edit saves permanently to your portfolio JSON store and disk.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Right Content Editor Area */}
                <main className="flex-1 min-w-0">
                    {/* 1. OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Platform Command Center</h2>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Manage, rebrand, and update all content displayed on your executive portfolio.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-1">
                                    <span className="text-xs text-muted-foreground">Active Ventures</span>
                                    <div className="text-2xl font-black text-foreground">{data.projects?.length || 0}</div>
                                    <span className="text-[11px] text-emerald-500 font-semibold">1 Flagship Client Live</span>
                                </div>
                                <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-1">
                                    <span className="text-xs text-muted-foreground">Company Entity</span>
                                    <div className="text-2xl font-black text-primary">{data.general?.company || "WebZen"}</div>
                                    <span className="text-[11px] text-muted-foreground">Founder &amp; CEO</span>
                                </div>
                                <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-1">
                                    <span className="text-xs text-muted-foreground">Technical Arsenal</span>
                                    <div className="text-2xl font-black text-foreground">{data.skills?.length || 0} Domains</div>
                                    <span className="text-[11px] text-blue-500 font-semibold">Next.js 15 &amp; Cloud</span>
                                </div>
                            </div>

                            {/* Quick Action Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div
                                    onClick={() => setActiveTab("projects")}
                                    className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-all cursor-pointer space-y-2 group">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                            <FolderKanban size={20} />
                                        </div>
                                        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="text-base font-bold">Manage Flagship Projects &amp; Images</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Upload screenshots, edit Dr. Devojyoti Dutta case study, or add new client works.
                                    </p>
                                </div>

                                <div
                                    onClick={() => setActiveTab("general")}
                                    className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-all cursor-pointer space-y-2 group">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                                            <User size={20} />
                                        </div>
                                        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="text-base font-bold">Edit Company &amp; Executive Info</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Update your company name (WebZen), contact phone/WhatsApp, and credentials.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. GENERAL & BRANDING TAB */}
                    {activeTab === "general" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">General Executive &amp; Branding Setup</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Control primary titles, company name, contact numbers, and public social URLs.
                                </p>
                            </div>

                            {/* Executive Profile Photo Card */}
                            <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-border shadow-xs bg-muted shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={data.general?.profileImage || data.hero?.profileImage || "/profilePicture.jpg"}
                                            alt="Executive Profile"
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground">Executive Profile &amp; Hero Portrait</div>
                                        <p className="text-[11px] text-muted-foreground">Used across the Hero Banner and executive plates.</p>
                                        <span className="text-[10px] font-mono text-muted-foreground/70 truncate block max-w-[240px]">
                                            {data.general?.profileImage || data.hero?.profileImage || "/profilePicture.jpg"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:shadow-md cursor-pointer transition-all">
                                        {uploadingFor === "hero-image" ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Uploading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={13} />
                                                <span>Change Photo</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            disabled={uploadingFor === "hero-image"}
                                            onChange={handleHeroImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("hero")}
                                        className="px-3 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground">
                                        Advanced View
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.general?.name || ""}
                                        onChange={(e) => updateGeneral("name", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Company Name</label>
                                    <input
                                        type="text"
                                        value={data.general?.company || ""}
                                        onChange={(e) => updateGeneral("company", e.target.value)}
                                        placeholder="e.g. WebZen"
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none font-bold text-primary"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Executive Role</label>
                                    <input
                                        type="text"
                                        value={data.general?.role || ""}
                                        onChange={(e) => updateGeneral("role", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Availability Status</label>
                                    <input
                                        type="text"
                                        value={data.general?.availabilityStatus || ""}
                                        onChange={(e) => updateGeneral("availabilityStatus", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Executive Email</label>
                                    <input
                                        type="email"
                                        value={data.general?.email || ""}
                                        onChange={(e) => updateGeneral("email", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Phone / WhatsApp Number</label>
                                    <input
                                        type="text"
                                        value={data.general?.phone || ""}
                                        onChange={(e) => updateGeneral("phone", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Location &amp; Remote Scope</label>
                                    <input
                                        type="text"
                                        value={data.general?.location || ""}
                                        onChange={(e) => updateGeneral("location", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">GitHub Profile URL</label>
                                    <input
                                        type="text"
                                        value={data.general?.github || ""}
                                        onChange={(e) => updateGeneral("github", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-bold text-muted-foreground">LinkedIn Profile URL</label>
                                    <input
                                        type="text"
                                        value={data.general?.linkedin || ""}
                                        onChange={(e) => updateGeneral("linkedin", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. HERO & BANNER TAB */}
                    {activeTab === "hero" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">Hero Section &amp; Metrics</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Customize the hero banner copy, executive portrait photo, and the 4 impact metric numbers.
                                </p>
                            </div>

                            {/* Hero CEO Portrait Image Upload Section */}
                            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <ImageIcon size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground">Hero Section Portrait / CEO Image</h3>
                                            <p className="text-[11px] text-muted-foreground">The prominent portrait photo displayed on the hero banner.</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground truncate max-w-xs">
                                        {data.hero?.profileImage || data.general?.profileImage || "/profilePicture.jpg"}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                                    {/* Live Image Preview */}
                                    <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-border shadow-md bg-muted shrink-0 group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={data.hero?.profileImage || data.general?.profileImage || "/profilePicture.jpg"}
                                            alt="Hero Portrait Preview"
                                            className="w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold text-center px-1">
                                            Active Portrait
                                        </div>
                                    </div>

                                    {/* Upload Controls */}
                                    <div className="flex-1 w-full space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-muted-foreground">Image URL or Local Path</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={data.hero?.profileImage || data.general?.profileImage || ""}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData((prev: any) => ({
                                                            ...prev,
                                                            general: { ...prev.general, profileImage: val },
                                                            hero: { ...prev.hero, profileImage: val },
                                                        }));
                                                    }}
                                                    placeholder="e.g. /profilePicture.jpg or uploaded URL"
                                                    className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-border text-xs focus:border-primary outline-none font-mono"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData((prev: any) => ({
                                                            ...prev,
                                                            general: { ...prev.general, profileImage: "/profilePicture.jpg" },
                                                            hero: { ...prev.hero, profileImage: "/profilePicture.jpg" },
                                                        }));
                                                        toast.info("Reset to default profile picture.");
                                                    }}
                                                    className="px-3 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground cursor-pointer">
                                                    Reset Default
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <label className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all cursor-pointer">
                                                {uploadingFor === "hero-image" ? (
                                                    <>
                                                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <span>Uploading Image...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload size={14} />
                                                        <span>Upload New Portrait Photo</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    disabled={uploadingFor === "hero-image"}
                                                    onChange={handleHeroImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                            <span className="text-[11px] text-muted-foreground">Supports JPG, PNG, WEBP (Saved to /public/uploads)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Hero Status Badge</label>
                                    <input
                                        type="text"
                                        value={data.hero?.badge || ""}
                                        onChange={(e) => updateHero("badge", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Headline Prefix</label>
                                        <input
                                            type="text"
                                            value={data.hero?.headlinePrefix || ""}
                                            onChange={(e) => updateHero("headlinePrefix", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Gradient Highlight</label>
                                        <input
                                            type="text"
                                            value={data.hero?.headlineHighlight || ""}
                                            onChange={(e) => updateHero("headlineHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none font-bold text-primary"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Headline Suffix</label>
                                        <input
                                            type="text"
                                            value={data.hero?.headlineSuffix || ""}
                                            onChange={(e) => updateHero("headlineSuffix", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-muted-foreground">Executive Bio Statement</label>
                                    <textarea
                                        rows={3}
                                        value={data.hero?.bio || ""}
                                        onChange={(e) => updateHero("bio", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:border-primary outline-none resize-none"
                                    />
                                </div>

                                {/* 4 Metrics */}
                                <div className="pt-4 border-t border-border space-y-3">
                                    <label className="text-xs font-bold text-foreground">4 Key Milestone Metrics</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.hero?.metrics?.map((metric: any, mIdx: number) => (
                                            <div key={mIdx} className="p-3 rounded-xl bg-muted/30 border border-border space-y-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={metric.value}
                                                        onChange={(e) => {
                                                            const newMetrics = [...data.hero.metrics];
                                                            newMetrics[mIdx].value = e.target.value;
                                                            updateHero("metrics", newMetrics);
                                                        }}
                                                        placeholder="Value (e.g. 15+)"
                                                        className="w-24 px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={metric.label}
                                                        onChange={(e) => {
                                                            const newMetrics = [...data.hero.metrics];
                                                            newMetrics[mIdx].label = e.target.value;
                                                            updateHero("metrics", newMetrics);
                                                        }}
                                                        placeholder="Label"
                                                        className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. PROJECTS & IMAGES TAB (CORE FLEXIBILITY) */}
                    {activeTab === "projects" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold">Projects &amp; Image Management</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Manage your project showcase, upload new screenshots, and modify live links.
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    onClick={() => {
                                        const newProj = {
                                            id: `project-${Date.now()}`,
                                            title: "New Venture Title",
                                            subtitle: "Platform Subtitle",
                                            category: "healthtech",
                                            categoryLabel: "Custom Solution",
                                            role: `Founder & Lead Architect (${data.general?.company || "WebZen"})`,
                                            status: "Production Live",
                                            year: "2026",
                                            isFlagship: false,
                                            description: "Comprehensive description of the platform architecture, client requirements, and deliverables.",
                                            images: [],
                                            liveLink: "https://example.com",
                                            tech: ["Next.js", "TypeScript", "Tailwind CSS"],
                                            features: [{ title: "Core Feature", desc: "Detailed description of the feature." }],
                                            metrics: [{ value: "100%", label: "Satisfaction" }],
                                        };
                                        setData((prev: any) => ({
                                            ...prev,
                                            projects: [newProj, ...prev.projects],
                                        }));
                                        setSelectedProjectIndex(0);
                                        toast.success("New project drafted! You can now edit its details and upload images.");
                                    }}
                                    size="sm"
                                    className="rounded-xl font-bold gap-1.5">
                                    <Plus size={15} />
                                    <span>Add New Project</span>
                                </Button>
                            </div>

                            {/* Project Selector Bar */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
                                {data.projects?.map((proj: any, idx: number) => (
                                    <button
                                        key={proj.id || idx}
                                        type="button"
                                        onClick={() => setSelectedProjectIndex(idx)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                                            selectedProjectIndex === idx
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "bg-card border border-border text-muted-foreground hover:text-foreground"
                                        }`}>
                                        <span>{proj.title}</span>
                                        {proj.isFlagship && (
                                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black">
                                                FLAGSHIP
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Active Project Editor */}
                            {data.projects?.[selectedProjectIndex] && (
                                <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6">
                                    {/* Project Header Config */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!data.projects[selectedProjectIndex].isFlagship}
                                                    onChange={(e) => {
                                                        const projects = [...data.projects];
                                                        projects[selectedProjectIndex].isFlagship = e.target.checked;
                                                        setData({ ...data, projects });
                                                    }}
                                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                                />
                                                <span>Set as Flagship Venture of the Year</span>
                                            </label>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (data.projects.length <= 1) {
                                                    toast.error("You must have at least one project.");
                                                    return;
                                                }
                                                const projects = data.projects.filter((_: any, i: number) => i !== selectedProjectIndex);
                                                setData({ ...data, projects });
                                                setSelectedProjectIndex(0);
                                                toast.success("Project removed.");
                                            }}
                                            className="text-xs text-destructive hover:underline flex items-center gap-1 font-semibold cursor-pointer">
                                            <Trash2 size={13} />
                                            <span>Delete Project</span>
                                        </button>
                                    </div>

                                    {/* Basic Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Project Title</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].title}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].title = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm font-bold"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Subtitle / Domain</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].subtitle}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].subtitle = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Category Pill</label>
                                            <select
                                                value={data.projects[selectedProjectIndex].category}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].category = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm">
                                                <option value="healthtech">HealthTech &amp; Clinical</option>
                                                <option value="edtech">EdTech &amp; Marketplace</option>
                                                <option value="proptech">PropTech &amp; Systems</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Your Role</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].role}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].role = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Live URL</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].liveLink}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].liveLink = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="https://..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Admin / Extra URL</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].adminLink || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].adminLink = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="e.g. /admin"
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Detailed Description</label>
                                        <textarea
                                            rows={3}
                                            value={data.projects[selectedProjectIndex].description}
                                            onChange={(e) => {
                                                const projects = [...data.projects];
                                                projects[selectedProjectIndex].description = e.target.value;
                                                setData({ ...data, projects });
                                            }}
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm resize-none"
                                        />
                                    </div>

                                    {/* IMAGES & SCREENSHOTS SECTION (UPLOADABLE) */}
                                    <div className="pt-6 border-t border-border space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-bold flex items-center gap-2">
                                                    <ImageIcon size={16} className="text-primary" />
                                                    <span>Project Screenshots &amp; Media Gallery</span>
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Upload new screenshots or change labels and captions for the multi-device slider.
                                                </p>
                                            </div>

                                            {/* File upload input */}
                                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity">
                                                <Upload size={14} />
                                                <span>
                                                    {uploadingFor === `project-${selectedProjectIndex}`
                                                        ? "Uploading..."
                                                        : "Upload New Screenshot"}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageUpload(e, selectedProjectIndex)}
                                                />
                                            </label>
                                        </div>

                                        {/* Image List */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {data.projects[selectedProjectIndex].images?.map((img: any, iIdx: number) => (
                                                <div
                                                    key={iIdx}
                                                    className="p-3.5 rounded-2xl bg-muted/30 border border-border space-y-3">
                                                    {/* Image thumbnail */}
                                                    <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-muted">
                                                        <Image
                                                            src={img.src}
                                                            alt={img.label || "Screenshot"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-muted-foreground">
                                                                Image Label / Tab Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={img.label}
                                                                onChange={(e) => {
                                                                    const projects = [...data.projects];
                                                                    projects[selectedProjectIndex].images[iIdx].label = e.target.value;
                                                                    setData({ ...data, projects });
                                                                }}
                                                                placeholder="e.g. Booking Engine"
                                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                            />
                                                        </div>

                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-muted-foreground">
                                                                Image Caption / Summary
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={img.caption}
                                                                onChange={(e) => {
                                                                    const projects = [...data.projects];
                                                                    projects[selectedProjectIndex].images[iIdx].caption = e.target.value;
                                                                    setData({ ...data, projects });
                                                                }}
                                                                placeholder="Caption text"
                                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-between pt-1">
                                                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[180px]">
                                                                {img.src}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const projects = [...data.projects];
                                                                    projects[selectedProjectIndex].images = projects[selectedProjectIndex].images.filter(
                                                                        (_: any, ind: number) => ind !== iIdx
                                                                    );
                                                                    setData({ ...data, projects });
                                                                    toast.success("Image removed from project.");
                                                                }}
                                                                className="text-xs text-destructive hover:underline cursor-pointer">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 5. EXPERIENCE & LEADERSHIP TAB */}
                    {activeTab === "experience" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">Leadership &amp; Professional Experience</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Manage corporate leadership positions, mentorship, and accomplishments.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {data.experience?.map((exp: any, eIdx: number) => (
                                    <div key={eIdx} className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground">Company</label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].company = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground">Role Title</label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].role = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground">Duration</label>
                                                <input
                                                    type="text"
                                                    value={exp.duration}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].duration = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground">Location</label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].location = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. TECHNICAL ARSENAL (SKILLS) */}
                    {activeTab === "skills" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">Technical Arsenal &amp; Capabilities</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Configure skill domains and technology tags.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {data.skills?.map((cat: any, cIdx: number) => (
                                    <div key={cIdx} className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground">Domain Title</label>
                                            <input
                                                type="text"
                                                value={cat.title}
                                                onChange={(e) => {
                                                    const newSkills = [...data.skills];
                                                    newSkills[cIdx].title = e.target.value;
                                                    setData({ ...data, skills: newSkills });
                                                }}
                                                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm font-bold"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground">Skills (Comma-separated)</label>
                                            <input
                                                type="text"
                                                value={cat.skills?.join(", ")}
                                                onChange={(e) => {
                                                    const newSkills = [...data.skills];
                                                    newSkills[cIdx].skills = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                                    setData({ ...data, skills: newSkills });
                                                }}
                                                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 7. ABOUT ME & VISION */}
                    {activeTab === "about" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">Strategic Pillars &amp; Milestones</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Edit the 4 executive pillars and career milestones.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-foreground">4 Strategic Pillars</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.about?.pillars?.map((pil: any, pIdx: number) => (
                                        <div key={pIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                                            <input
                                                type="text"
                                                value={pil.title}
                                                onChange={(e) => {
                                                    const newPillars = [...data.about.pillars];
                                                    newPillars[pIdx].title = e.target.value;
                                                    setData({ ...data, about: { ...data.about, pillars: newPillars } });
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                            />
                                            <textarea
                                                rows={2}
                                                value={pil.desc}
                                                onChange={(e) => {
                                                    const newPillars = [...data.about.pillars];
                                                    newPillars[pIdx].desc = e.target.value;
                                                    setData({ ...data, about: { ...data.about, pillars: newPillars } });
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. EDUCATION TAB */}
                    {activeTab === "education" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold">Academic Degree &amp; Specializations</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    University education, CGPA, and online certifications.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground">Degree Title</label>
                                    <input
                                        type="text"
                                        value={data.education?.degree || ""}
                                        onChange={(e) => setData({ ...data, education: { ...data.education, degree: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground">University / Institution</label>
                                    <input
                                        type="text"
                                        value={data.education?.institution || ""}
                                        onChange={(e) => setData({ ...data, education: { ...data.education, institution: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground">CGPA</label>
                                    <input
                                        type="text"
                                        value={data.education?.cgpa || ""}
                                        onChange={(e) => setData({ ...data, education: { ...data.education, cgpa: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground">Timeline</label>
                                    <input
                                        type="text"
                                        value={data.education?.timeline || ""}
                                        onChange={(e) => setData({ ...data, education: { ...data.education, timeline: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION: SECURITY & MASTER PASSWORD */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <div className="border-b border-border/60 pb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <ShieldCheck className="text-primary" size={22} />
                                    <span>Master Security &amp; Password Controls</span>
                                </h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Secure your portfolio management studio. Access is strictly private and hidden from the public navbar.
                                </p>
                            </div>

                            {/* Security Status Card */}
                            <div className="p-5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                                            <Shield size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">
                                                Studio Security Status: Protected
                                            </div>
                                            <div className="text-[11px] text-muted-foreground">
                                                Gated with master password authentication
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Founder Session Active</span>
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50 space-y-1">
                                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                                        <Lock size={13} className="text-primary" />
                                        <span>Private URL Access Only</span>
                                    </div>
                                    <p className="text-[11px] leading-relaxed">
                                        Per your specification, the Admin link is completely removed from the navbar. 
                                        You access this dashboard directly by visiting <code className="text-primary font-mono font-bold">/admin</code> in your browser.
                                    </p>
                                </div>
                            </div>

                            {/* Change Password Card */}
                            <div className="p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm space-y-5">
                                <div className="flex items-center gap-2">
                                    <Key size={18} className="text-primary" />
                                    <h3 className="text-base font-bold text-foreground">Change Master Password</h3>
                                </div>

                                <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">
                                            Current Master Password
                                        </label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter existing password (e.g. admin)"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">
                                            New Master Password
                                        </label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter strong new password (min. 4 characters)"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            placeholder="Re-type new password"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium outline-none"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={isChangingPassword || !newPassword}
                                            className="rounded-xl font-bold px-6 text-xs gap-2">
                                            <Key size={14} />
                                            <span>{isChangingPassword ? "Updating Password..." : "Update Master Password"}</span>
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Sign Out Card */}
                            <div className="p-5 rounded-2xl border border-destructive/20 bg-destructive/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-bold text-foreground">Terminate Founder Session</div>
                                    <div className="text-xs text-muted-foreground">
                                        Lock the Admin Studio. You will be prompted for your password upon next visit.
                                    </div>
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    variant="destructive"
                                    size="sm"
                                    className="rounded-xl font-bold gap-2 self-start sm:self-auto cursor-pointer">
                                    <LogOut size={14} />
                                    <span>Lock &amp; Sign Out</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
