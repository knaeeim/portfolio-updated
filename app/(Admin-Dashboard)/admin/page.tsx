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
    Download,
    Copy,
    GitBranch,
    Database,
    Microscope,
    Brain,
    FlaskConical,
    FileText,
    Code2,
    Link2,
    Compass,
    Trophy,
    Target,
    TrendingUp,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type SectionTab =
    | "overview"
    | "general"
    | "hero"
    | "projects"
    | "research"
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

    // GitHub GitOps Auto-Deploy State
    const [githubToken, setGithubToken] = useState("");

    // Selected project for editing
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
    const [manualImageUrl, setManualImageUrl] = useState<string>("");
    const [manualImageLabel, setManualImageLabel] = useState<string>("");

    // Research Tab New Tech Input State
    const [newResearchTech, setNewResearchTech] = useState<string>("");
    const [uploadingResearchDoc, setUploadingResearchDoc] = useState<boolean>(false);

    // Verify session on mount
    useEffect(() => {
        const sessionToken = sessionStorage.getItem("wz_admin_session");
        const savedGithubToken = localStorage.getItem("wz_github_token");
        if (savedGithubToken) {
            setGithubToken(savedGithubToken);
        }
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

    const handleExportJson = () => {
        if (!data) return;
        const cleanData = { ...data };
        delete cleanData.security;
        delete cleanData._githubToken;
        const blob = new Blob([JSON.stringify(cleanData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "portfolio-content.json";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded portfolio-content.json successfully!");
    };

    const handleCopyJson = () => {
        if (!data) return;
        const cleanData = { ...data };
        delete cleanData.security;
        delete cleanData._githubToken;
        navigator.clipboard.writeText(JSON.stringify(cleanData, null, 2));
        toast.success("Portfolio JSON copied to clipboard!");
    };

    const handleSave = async () => {
        if (!data) return;
        try {
            setIsSaving(true);
            const tokenToUse = githubToken.trim() || (typeof window !== "undefined" ? localStorage.getItem("wz_github_token") || "" : "");

            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(tokenToUse ? { "x-github-token": tokenToUse } : {}),
                },
                body: JSON.stringify({
                    ...data,
                    _githubToken: tokenToUse,
                }),
            });

            const resJson = await res.json().catch(() => null);

            if (res.ok) {
                if (resJson?.savedToMongo) {
                    toast.success("Saved to MongoDB Atlas! Live site is instantly updated.");
                } else if (resJson?.syncedToGitHub) {
                    toast.success("Successfully committed to GitHub! Vercel is deploying your changes live.");
                } else if (resJson?.isReadOnly) {
                    toast.success("Saved to runtime! (Add MONGODB_URI in Vercel for instant permanent cloud persistence).");
                } else {
                    toast.success(resJson?.message || "Portfolio successfully saved and published!");
                }
            } else {
                toast.error(resJson?.error || "Failed to save changes.");
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

    // ==========================================
    // BULLETPROOF CREATION & DELETION HANDLERS
    // ==========================================

    const handleAddNewProject = () => {
        const id = `project-${Date.now().toString(36)}`;
        const newProj = {
            id,
            title: "New Venture Project",
            subtitle: "Full-Stack Web Platform & Enterprise Architecture",
            category: "agency",
            categoryLabel: "Ventures & Solutions",
            role: `Founder & Lead Architect (${data?.general?.company || "WebZen Bangladesh"})`,
            status: "Production Live",
            client: "Corporate Client / High-Impact Venture",
            year: `${new Date().getFullYear()} Production`,
            isFlagship: false,
            description: "High-level overview of the platform architecture, client requirements, and technical deliverables.",
            images: [],
            liveLink: "https://",
            clientLink: "",
            serverLink: "",
            adminLink: "",
            tech: ["Next.js", "TypeScript", "Tailwind CSS"],
            features: [
                { title: "High-Performance Architecture", desc: "Sub-second load times with optimized SSR and edge caching." },
                { title: "Scalable Infrastructure", desc: "Designed for high concurrency and zero downtime." },
            ],
            metrics: [
                { value: "100%", label: "System Uptime" },
                { value: "Sub-second", label: "Latency" },
            ],
        };
        setData((prev: any) => ({
            ...prev,
            projects: [newProj, ...(prev?.projects || [])],
        }));
        setSelectedProjectIndex(0);
        setActiveTab("projects");
        toast.success("New project drafted! You can now configure its details, features, and media.");
    };

    const handleDeleteProject = (index: number) => {
        const proj = data?.projects?.[index];
        if (!proj) return;
        if (data.projects.length <= 1) {
            toast.error("You must have at least one project in your showcase.");
            return;
        }
        const confirmDelete = window.confirm(`Are you sure you want to delete "${proj.title}"? This cannot be undone.`);
        if (!confirmDelete) return;

        setData((prev: any) => {
            const projects = prev.projects.filter((_: any, i: number) => i !== index);
            return { ...prev, projects };
        });
        setSelectedProjectIndex(0);
        toast.success(`Project "${proj.title}" removed.`);
    };

    const handleAddNewExperience = () => {
        const newExp = {
            company: "New Venture / Organization",
            role: "Principal Technical Lead / Architect",
            stack: "Distributed Systems & Cloud Architecture",
            duration: `${new Date().getFullYear()} — Present`,
            location: "Dhaka, Bangladesh",
            badge: "Executive Leadership",
            tech: ["Next.js", "TypeScript", "Node.js", "Cloud Infrastructure"],
            link: "https://",
            linkLabel: "Live Platform / Verification Portal",
            description: [
                "Leading system architecture, product roadmaps, and high-concurrency cloud deployments.",
                "Mentoring software engineers and establishing modern code review standards.",
            ],
        };
        setData((prev: any) => ({
            ...prev,
            experience: [newExp, ...(prev?.experience || [])],
        }));
        setActiveTab("experience");
        toast.success("New executive role drafted! Scroll down to edit details and accomplishments.");
    };

    const handleDeleteExperience = (index: number) => {
        const exp = data?.experience?.[index];
        if (!exp) return;
        const confirmDelete = window.confirm(`Remove experience at "${exp.company}"?`);
        if (!confirmDelete) return;

        setData((prev: any) => ({
            ...prev,
            experience: prev.experience.filter((_: any, i: number) => i !== index),
        }));
        toast.success(`Experience at "${exp.company}" removed.`);
    };

    const handleAddNewSkillDomain = () => {
        const newSkill = {
            title: "New Engineering Domain",
            description: "Designing, engineering, and scaling modern technical systems.",
            skills: ["Architecture", "System Design", "Cloud Infrastructure"],
            color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        };
        setData((prev: any) => ({
            ...prev,
            skills: [...(prev?.skills || []), newSkill],
        }));
        setActiveTab("skills");
        toast.success("New technical skill domain created!");
    };

    const handleDeleteSkillDomain = (index: number) => {
        const cat = data?.skills?.[index];
        if (!cat) return;
        const confirmDelete = window.confirm(`Delete skill domain "${cat.title}"?`);
        if (!confirmDelete) return;

        setData((prev: any) => ({
            ...prev,
            skills: prev.skills.filter((_: any, i: number) => i !== index),
        }));
        toast.success(`Skill domain "${cat.title}" removed.`);
    };

    const handleAddNewCourse = () => {
        const newCourse = {
            title: "Institution / Academy Name",
            level: "Professional Track",
            badge: "Credential / Specialization Name",
            desc: "Comprehensive mastery and practical application of industry-standard technologies.",
        };
        setData((prev: any) => ({
            ...prev,
            education: {
                ...prev?.education,
                courses: [...(prev?.education?.courses || []), newCourse],
            },
        }));
        setActiveTab("education");
        toast.success("New certification / specialization added!");
    };

    const handleDeleteCourse = (index: number) => {
        const course = data?.education?.courses?.[index];
        if (!course) return;
        const confirmDelete = window.confirm(`Delete certification "${course.title} - ${course.badge}"?`);
        if (!confirmDelete) return;

        setData((prev: any) => ({
            ...prev,
            education: {
                ...prev?.education,
                courses: prev.education.courses.filter((_: any, i: number) => i !== index),
            },
        }));
        toast.success("Certification removed.");
    };

    const handleAddNewResearchPillar = () => {
        const newPillar = {
            id: `pillar-${Date.now().toString(36)}`,
            title: "New Research Objective / Topic",
            desc: "Comprehensive description of the algorithmic methodology, mathematical foundations, and diagnostic goals.",
            tag: "Research Domain",
            highlight: "Key Benchmark / Breakthrough",
            bullets: [
                "Primary objective and methodology overview",
                "Model validation and experimental setup",
            ],
        };
        setData((prev: any) => ({
            ...prev,
            research: {
                ...prev?.research,
                pillars: [...(prev?.research?.pillars || []), newPillar],
            },
        }));
        setActiveTab("research");
        toast.success("New research pillar created!");
    };

    const handleDeleteResearchPillar = (index: number) => {
        const pillar = data?.research?.pillars?.[index];
        if (!pillar) return;
        const confirmDelete = window.confirm(`Delete research pillar "${pillar.title}"?`);
        if (!confirmDelete) return;

        setData((prev: any) => ({
            ...prev,
            research: {
                ...prev?.research,
                pillars: prev.research.pillars.filter((_: any, i: number) => i !== index),
            },
        }));
        toast.success("Research pillar removed.");
    };

    const handleAddNewStrategicPillar = () => {
        const newPillar = {
            title: "New Strategic Pillar",
            desc: "Executive vision, business philosophy, and client value proposition.",
            tag: "Executive Vision",
        };
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                pillars: [...(prev?.about?.pillars || []), newPillar],
            },
        }));
        setActiveTab("about");
        toast.success("Strategic pillar added!");
    };

    const handleDeleteStrategicPillar = (index: number) => {
        const pillar = data?.about?.pillars?.[index];
        if (!pillar) return;
        if (!window.confirm(`Delete pillar "${pillar.title}"?`)) return;
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                pillars: prev.about.pillars.filter((_: any, i: number) => i !== index),
            },
        }));
        toast.success("Strategic pillar removed.");
    };

    const handleAddNewTimelineStep = () => {
        const newStep = {
            title: "Milestone Title",
            date: `${new Date().getFullYear()}`,
            role: "Executive / Architectural Role",
            desc: "Description of the milestone, achievements, and impact.",
            badge: "Career Milestone",
        };
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                timeline: [...(prev?.about?.timeline || []), newStep],
            },
        }));
        setActiveTab("about");
        toast.success("Career milestone added!");
    };

    const handleDeleteTimelineStep = (index: number) => {
        const step = data?.about?.timeline?.[index];
        if (!step) return;
        if (!window.confirm(`Delete milestone "${step.title}"?`)) return;
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                timeline: prev.about.timeline.filter((_: any, i: number) => i !== index),
            },
        }));
        toast.success("Milestone removed.");
    };

    const handleAddNewExecutiveTrait = () => {
        const newTrait = {
            title: "Executive Trait",
            info: "Leadership Quality",
            desc: "Description of personal discipline, work ethic, or cultural foundation.",
        };
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                traits: [...(prev?.about?.traits || []), newTrait],
            },
        }));
        setActiveTab("about");
        toast.success("Executive attribute added!");
    };

    const handleDeleteExecutiveTrait = (index: number) => {
        const trait = data?.about?.traits?.[index];
        if (!trait) return;
        if (!window.confirm(`Delete attribute "${trait.title}"?`)) return;
        setData((prev: any) => ({
            ...prev,
            about: {
                ...prev?.about,
                traits: prev.about.traits.filter((_: any, i: number) => i !== index),
            },
        }));
        toast.success("Attribute removed.");
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

    // Handle Research Paper / Manuscript Document Upload (PDF, DOCX)
    const handleResearchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingResearchDoc(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const resJson = await res.json();
                const uploadedUrl = resJson.url;

                setData((prev: any) => ({
                    ...prev,
                    research: {
                        ...prev.research,
                        paperFileUrl: uploadedUrl,
                        paperFileName: file.name,
                    },
                }));

                toast.success(`Manuscript "${file.name}" uploaded successfully! Click "Save Changes" to publish.`);
            } else {
                toast.error("Failed to upload research document.");
            }
        } catch (error) {
            console.error("Research document upload error:", error);
            toast.error("Network error uploading research document.");
        } finally {
            setUploadingResearchDoc(false);
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
                        type="button"
                        onClick={handleExportJson}
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-xs font-semibold gap-1.5"
                        title="Download portfolio-content.json backup">
                        <Download size={14} />
                        <span className="hidden md:inline">Export JSON</span>
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
                        { id: "research", label: "Research & AI", icon: Microscope, badge: data.research ? "Active" : undefined },
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

                            {/* Quick Creation & Addition Hub */}
                            <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-bold flex items-center gap-2">
                                            <Sparkles size={18} className="text-primary" />
                                            <span>Quick Content Creation Hub</span>
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Add and draft new items into your portfolio in 1 click with bulletproof safeguards.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                    <button
                                        type="button"
                                        onClick={handleAddNewProject}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FolderKanban size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ New Project</div>
                                            <div className="text-[10px] text-muted-foreground">Portfolio Grid</div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddNewExperience}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Briefcase size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ New Role</div>
                                            <div className="text-[10px] text-muted-foreground">Career & Leadership</div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddNewSkillDomain}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Sliders size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ Skill Domain</div>
                                            <div className="text-[10px] text-muted-foreground">Tech Stack</div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddNewCourse}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <GraduationCap size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ Certificate</div>
                                            <div className="text-[10px] text-muted-foreground">Specialization</div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddNewResearchPillar}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Microscope size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ Research Pillar</div>
                                            <div className="text-[10px] text-muted-foreground">AI / Medical CV</div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddNewTimelineStep}
                                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/40 transition-all text-left group cursor-pointer space-y-2">
                                        <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Sparkles size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-foreground">+ Milestone</div>
                                            <div className="text-[10px] text-muted-foreground">About Trajectory</div>
                                        </div>
                                    </button>
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

                                <div
                                    onClick={() => setActiveTab("research")}
                                    className="p-6 rounded-2xl bg-card border border-border/80 hover:border-violet-500/40 transition-all cursor-pointer space-y-2 group sm:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500">
                                            <Microscope size={20} />
                                        </div>
                                        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="text-base font-bold">Manage Research Profile (Hybrid-CNN-ViT)</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Update Brain Tumor MRI dataset metrics (98.7% accuracy), research abstract, pipeline architecture phases, and publication status.
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
                                    onClick={handleAddNewProject}
                                    size="sm"
                                    className="rounded-xl font-bold gap-1.5 shadow-sm">
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
                                <button
                                    type="button"
                                    onClick={handleAddNewProject}
                                    className="px-3 py-2 rounded-xl text-xs font-bold bg-muted/40 hover:bg-primary/10 border border-dashed border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all flex items-center gap-1 cursor-pointer shrink-0">
                                    <Plus size={13} />
                                    <span>Draft New</span>
                                </button>
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
                                                <span>Set as Flagship Venture / Spotlight Case Study</span>
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {data.projects[selectedProjectIndex].liveLink && (
                                                <a
                                                    href={data.projects[selectedProjectIndex].liveLink}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                    <ExternalLink size={12} />
                                                    <span>View Live</span>
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteProject(selectedProjectIndex)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 border border-destructive/20 transition-colors flex items-center gap-1.5 cursor-pointer">
                                                <Trash2 size={13} />
                                                <span>Delete Project</span>
                                            </button>
                                        </div>
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
                                            <label className="text-xs font-bold text-muted-foreground">Subtitle / Domain Tagline</label>
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
                                            <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                                                <Link2 size={13} className="text-primary" />
                                                <span>Slug / URL Identifier (/projects/[id])</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].id || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].id = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="e.g. webzen-technologies, imranh-me"
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-xs font-mono"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Category Pill</label>
                                            <select
                                                value={data.projects[selectedProjectIndex].category || "agency"}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].category = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm">
                                                <option value="agency">Ventures &amp; Agency Studio</option>
                                                <option value="healthtech">HealthTech &amp; Clinical</option>
                                                <option value="academic">Academic, Research &amp; Portfolios</option>
                                                <option value="edtech">EdTech &amp; Learning Marketplace</option>
                                                <option value="proptech">PropTech &amp; Real Estate Systems</option>
                                                <option value="saas">Enterprise SaaS Platform</option>
                                                <option value="custom">Custom High-Impact Solution</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Category Pill Display Text</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].categoryLabel || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].categoryLabel = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="e.g. HealthTech & Clinical SaaS"
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Your Executive Role</label>
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
                                            <label className="text-xs font-bold text-muted-foreground">Client / Partner Organization</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].client || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].client = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="e.g. Imran Hossain (BRAC University)"
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Project Year / Stage</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].year || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].year = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="e.g. 2026 Production"
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

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Client Repository (GitHub)</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].clientLink || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].clientLink = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="https://github.com/..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-xs font-mono"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground">Server Repository (GitHub)</label>
                                            <input
                                                type="text"
                                                value={data.projects[selectedProjectIndex].serverLink || ""}
                                                onChange={(e) => {
                                                    const projects = [...data.projects];
                                                    projects[selectedProjectIndex].serverLink = e.target.value;
                                                    setData({ ...data, projects });
                                                }}
                                                placeholder="https://github.com/..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-xs font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-2 pt-2 border-t border-border/60">
                                        <label className="text-xs font-bold text-muted-foreground">Tech Stack (Comma-separated)</label>
                                        <input
                                            type="text"
                                            value={data.projects[selectedProjectIndex].tech?.join(", ") || ""}
                                            onChange={(e) => {
                                                const projects = [...data.projects];
                                                projects[selectedProjectIndex].tech = e.target.value
                                                    .split(",")
                                                    .map((s) => s.trim())
                                                    .filter(Boolean);
                                                setData({ ...data, projects });
                                            }}
                                            placeholder="Next.js 16, TypeScript, Turbopack, Tailwind CSS"
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-xs font-mono"
                                        />
                                        <div className="flex flex-wrap gap-1.5">
                                            {data.projects[selectedProjectIndex].tech?.map((t: string, tIdx: number) => (
                                                <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Detailed Description &amp; Architecture Overview</label>
                                        <textarea
                                            rows={3}
                                            value={data.projects[selectedProjectIndex].description}
                                            onChange={(e) => {
                                                const projects = [...data.projects];
                                                projects[selectedProjectIndex].description = e.target.value;
                                                setData({ ...data, projects });
                                            }}
                                            className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm resize-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Core Features & Deliverables */}
                                    <div className="pt-4 border-t border-border/60 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    Core Features &amp; Deliverables
                                                </h4>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Displayed in project case studies and deep-dive detail views.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const projects = [...data.projects];
                                                    const feats = projects[selectedProjectIndex].features || [];
                                                    projects[selectedProjectIndex].features = [
                                                        ...feats,
                                                        { title: "New Deliverable / Feature", desc: "Detailed breakdown of the architectural solution." },
                                                    ];
                                                    setData({ ...data, projects });
                                                }}
                                                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                <Plus size={13} />
                                                <span>Add Feature</span>
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {(data.projects[selectedProjectIndex].features || []).map((feat: any, fIdx: number) => (
                                                <div key={fIdx} className="p-3 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].features = projects[selectedProjectIndex].features.filter(
                                                                (_: any, i: number) => i !== fIdx
                                                            );
                                                            setData({ ...data, projects });
                                                        }}
                                                        className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-destructive/10 transition-colors">
                                                        <Trash2 size={13} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={feat.title || ""}
                                                        onChange={(e) => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].features[fIdx].title = e.target.value;
                                                            setData({ ...data, projects });
                                                        }}
                                                        placeholder="Feature Title"
                                                        className="w-[calc(100%-2rem)] px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={feat.desc || ""}
                                                        onChange={(e) => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].features[fIdx].desc = e.target.value;
                                                            setData({ ...data, projects });
                                                        }}
                                                        placeholder="Feature Description"
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Performance & Impact Metrics */}
                                    <div className="pt-4 border-t border-border/60 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    Impact &amp; Performance Metrics
                                                </h4>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Numerical achievements (e.g. 100% Automated, 98% Latency Drop).
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const projects = [...data.projects];
                                                    const mets = projects[selectedProjectIndex].metrics || [];
                                                    projects[selectedProjectIndex].metrics = [
                                                        ...mets,
                                                        { value: "100%", label: "Satisfaction / SLA" },
                                                    ];
                                                    setData({ ...data, projects });
                                                }}
                                                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                <Plus size={13} />
                                                <span>Add Metric</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                            {(data.projects[selectedProjectIndex].metrics || []).map((met: any, mIdx: number) => (
                                                <div key={mIdx} className="p-2.5 rounded-xl bg-muted/30 border border-border space-y-1.5 relative group">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].metrics = projects[selectedProjectIndex].metrics.filter(
                                                                (_: any, i: number) => i !== mIdx
                                                            );
                                                            setData({ ...data, projects });
                                                        }}
                                                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive p-0.5">
                                                        <Trash2 size={12} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={met.value || ""}
                                                        onChange={(e) => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].metrics[mIdx].value = e.target.value;
                                                            setData({ ...data, projects });
                                                        }}
                                                        placeholder="Value (e.g. 100%)"
                                                        className="w-[calc(100%-1.5rem)] px-2.5 py-1 rounded-md bg-background border border-border text-xs font-bold text-primary"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={met.label || ""}
                                                        onChange={(e) => {
                                                            const projects = [...data.projects];
                                                            projects[selectedProjectIndex].metrics[mIdx].label = e.target.value;
                                                            setData({ ...data, projects });
                                                        }}
                                                        placeholder="Label"
                                                        className="w-full px-2.5 py-1 rounded-md bg-background border border-border text-[11px] text-muted-foreground"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* IMAGES & SCREENSHOTS SECTION (UPLOADABLE & DIRECT URL) */}
                                    <div className="pt-6 border-t border-border space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-bold flex items-center gap-2">
                                                    <ImageIcon size={16} className="text-primary" />
                                                    <span>Project Screenshots &amp; Media Gallery</span>
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Upload new screenshots or add direct image URLs/paths for multi-device showcase.
                                                </p>
                                            </div>

                                            {/* File upload input */}
                                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity shrink-0">
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

                                        {/* Direct Image URL input */}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-xl bg-muted/20 border border-border/80">
                                            <input
                                                type="text"
                                                value={manualImageUrl}
                                                onChange={(e) => setManualImageUrl(e.target.value)}
                                                placeholder="Or paste image URL / local path (e.g. /projects/imranh.jpg or https://...)"
                                                className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                            />
                                            <input
                                                type="text"
                                                value={manualImageLabel}
                                                onChange={(e) => setManualImageLabel(e.target.value)}
                                                placeholder="Label (e.g. Homepage)"
                                                className="sm:w-36 px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!manualImageUrl.trim()) {
                                                        toast.error("Please enter a valid image URL or path.");
                                                        return;
                                                    }
                                                    const projects = [...data.projects];
                                                    const imgs = projects[selectedProjectIndex].images || [];
                                                    projects[selectedProjectIndex].images = [
                                                        ...imgs,
                                                        {
                                                            src: manualImageUrl.trim(),
                                                            label: manualImageLabel.trim() || "Screenshot",
                                                            caption: "Project showcase screenshot",
                                                        },
                                                    ];
                                                    setData({ ...data, projects });
                                                    setManualImageUrl("");
                                                    setManualImageLabel("");
                                                    toast.success("Image URL added to project gallery!");
                                                }}
                                                className="px-3.5 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs transition-colors shrink-0 cursor-pointer">
                                                Add Image URL
                                            </button>
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

                    {/* 4.5. RESEARCH & DEEP TECH PROFILE TAB */}
                    {activeTab === "research" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-8 animate-in fade-in duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-2">
                                        <Microscope size={14} />
                                        <span>Deep Tech &amp; AI Research Profile</span>
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight">Machine Learning &amp; Computer Vision Research</h2>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Configure your Hybrid-CNN-ViT model specifications, Brain Tumor MRI dataset details, and diagnostic benchmark metrics.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                        Active Profile
                                    </span>
                                </div>
                            </div>

                            {/* Section Header & Subtitle */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Core Research Metadata</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-bold text-muted-foreground">Research Title / Paper Headline</label>
                                        <input
                                            type="text"
                                            value={data.research?.title || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, title: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-bold text-muted-foreground">Subtitle / Architecture Focus</label>
                                        <input
                                            type="text"
                                            value={data.research?.subtitle || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, subtitle: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Section Pill Badge</label>
                                        <input
                                            type="text"
                                            value={data.research?.badge || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, badge: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Research Status / Publication Stage</label>
                                        <input
                                            type="text"
                                            value={data.research?.status || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, status: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Lead Researcher Name</label>
                                        <input
                                            type="text"
                                            value={data.research?.leadResearcher || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, leadResearcher: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground">Academic Institution / Department</label>
                                        <input
                                            type="text"
                                            value={data.research?.institution || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, institution: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-3 sm:col-span-2 pt-2 border-t border-border/40">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                                    <FileText size={14} className="text-cyan-500" />
                                                    <span>Research Paper, Manuscript &amp; Code Links</span>
                                                </label>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                    Provide an external repository link (GitHub/arXiv) and/or upload a PDF/DOCX manuscript for visitors to read.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* External Link Input */}
                                            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                                    1. External Paper / Repository URL
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={data.research?.paperUrl || ""}
                                                        onChange={(e) =>
                                                            setData({
                                                                ...data,
                                                                research: { ...data.research, paperUrl: e.target.value },
                                                            })
                                                        }
                                                        placeholder="https://github.com/knaeeim or https://arxiv.org/..."
                                                        className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono focus:outline-none focus:border-cyan-500"
                                                    />
                                                    {data.research?.paperUrl && (
                                                        <a
                                                            href={data.research.paperUrl}
                                                            target="_blank"
                                                            rel="noreferrer noopener"
                                                            className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border shrink-0 flex items-center justify-center"
                                                            title="Test Link">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Direct Document Upload */}
                                            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                                        2. Upload Document / Manuscript (PDF, DOCX)
                                                    </label>
                                                    {data.research?.paperFileUrl && (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                                            Active File Attached
                                                        </span>
                                                    )}
                                                </div>

                                                {data.research?.paperFileUrl ? (
                                                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            <FileText size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
                                                            <span className="text-xs font-semibold text-foreground truncate max-w-[180px]">
                                                                {data.research?.paperFileName || "Uploaded_Paper.pdf"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 shrink-0">
                                                            <a
                                                                href={data.research.paperFileUrl}
                                                                target="_blank"
                                                                rel="noreferrer noopener"
                                                                className="px-2.5 py-1 rounded-lg bg-cyan-500 text-white text-[11px] font-bold hover:bg-cyan-600 transition-colors inline-flex items-center gap-1">
                                                                <span>View</span>
                                                                <ExternalLink size={10} />
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setData({
                                                                        ...data,
                                                                        research: {
                                                                            ...data.research,
                                                                            paperFileUrl: "",
                                                                            paperFileName: "",
                                                                        },
                                                                    });
                                                                    toast.info("Removed uploaded document. Click 'Save Changes' to update.");
                                                                }}
                                                                className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                                title="Remove Document">
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <label className="flex-1 cursor-pointer">
                                                            <input
                                                                type="file"
                                                                accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf"
                                                                onChange={handleResearchFileUpload}
                                                                disabled={uploadingResearchDoc}
                                                                className="hidden"
                                                            />
                                                            <div className="w-full px-3 py-2 rounded-xl border border-dashed border-border hover:border-cyan-500 text-xs font-semibold text-muted-foreground hover:text-cyan-500 flex items-center justify-center gap-2 transition-colors">
                                                                {uploadingResearchDoc ? (
                                                                    <div className="w-3.5 h-3.5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    <Upload size={14} />
                                                                )}
                                                                <span>
                                                                    {uploadingResearchDoc
                                                                        ? "Uploading document..."
                                                                        : "Upload PDF or Manuscript"}
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                )}
                                                <p className="text-[10px] text-muted-foreground">
                                                    Accepted: PDF, DOCX, DOC. Files are hosted on your server/CDN.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Dataset & Pathology */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Medical Dataset &amp; Pathology Targets</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-bold text-muted-foreground">MRI Dataset Benchmark</label>
                                        <input
                                            type="text"
                                            value={data.research?.dataset || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, dataset: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-bold text-muted-foreground">Target Tumors &amp; Classification Classes</label>
                                        <input
                                            type="text"
                                            value={data.research?.targetTumors || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, targetTumors: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-bold text-muted-foreground">Abstract &amp; Problem Statement</label>
                                        <textarea
                                            rows={4}
                                            value={data.research?.abstract || ""}
                                            onChange={(e) => setData({ ...data, research: { ...data.research, abstract: e.target.value } })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Research Pillars / Objectives (Add/Delete/Edit) */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                            Research Pillars &amp; Core Model Objectives
                                        </h3>
                                        <p className="text-[11px] text-muted-foreground">
                                            Manage your deep learning research streams (e.g. Segmentation, Hybrid-ViT, Explainable AI).
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddNewResearchPillar}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                                        <Plus size={14} /> Add Research Pillar
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {(data.research?.pillars || []).map((pillar: any, pIdx: number) => (
                                        <div key={pIdx} className="p-4 rounded-2xl bg-muted/30 border border-border space-y-3 relative group">
                                            <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                                                        Pillar #{pIdx + 1}
                                                    </span>
                                                    <span className="text-xs font-bold text-foreground truncate max-w-xs">
                                                        {pillar.title || "Untitled Pillar"}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteResearchPillar(pIdx)}
                                                    className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer">
                                                    <Trash2 size={13} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className="space-y-1 sm:col-span-2">
                                                    <label className="text-[11px] font-bold text-muted-foreground">Pillar Title</label>
                                                    <input
                                                        type="text"
                                                        value={pillar.title || ""}
                                                        onChange={(e) => {
                                                            const pillars = [...data.research.pillars];
                                                            pillars[pIdx].title = e.target.value;
                                                            setData({ ...data, research: { ...data.research, pillars } });
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-bold text-muted-foreground">Tag / Category</label>
                                                    <input
                                                        type="text"
                                                        value={pillar.tag || ""}
                                                        onChange={(e) => {
                                                            const pillars = [...data.research.pillars];
                                                            pillars[pIdx].tag = e.target.value;
                                                            setData({ ...data, research: { ...data.research, pillars } });
                                                        }}
                                                        placeholder="e.g. Model Architecture"
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                                    />
                                                </div>
                                                <div className="space-y-1 sm:col-span-3">
                                                    <label className="text-[11px] font-bold text-muted-foreground">Key Highlight Badge</label>
                                                    <input
                                                        type="text"
                                                        value={pillar.highlight || ""}
                                                        onChange={(e) => {
                                                            const pillars = [...data.research.pillars];
                                                            pillars[pIdx].highlight = e.target.value;
                                                            setData({ ...data, research: { ...data.research, pillars } });
                                                        }}
                                                        placeholder="e.g. 3,064+ MRI Benchmark / Dual-Path Feature Fusion"
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[11px] font-bold text-muted-foreground">Description</label>
                                                <textarea
                                                    rows={2}
                                                    value={pillar.desc || ""}
                                                    onChange={(e) => {
                                                        const pillars = [...data.research.pillars];
                                                        pillars[pIdx].desc = e.target.value;
                                                        setData({ ...data, research: { ...data.research, pillars } });
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Diagnostic Benchmark Metrics */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Quantitative Benchmark Metrics</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const metrics = [...(data.research?.metrics || [])];
                                            metrics.push({ label: "New Metric", value: "98.5%", subtext: "Holdout benchmark" });
                                            setData({ ...data, research: { ...data.research, metrics } });
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Metric
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {(data.research?.metrics || []).map((m: any, mIdx: number) => (
                                        <div key={mIdx} className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const metrics = data.research.metrics.filter((_: any, i: number) => i !== mIdx);
                                                    setData({ ...data, research: { ...data.research, metrics } });
                                                }}
                                                className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={13} />
                                            </button>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Metric Label</label>
                                                <input
                                                    type="text"
                                                    value={m.label || ""}
                                                    onChange={(e) => {
                                                        const metrics = [...data.research.metrics];
                                                        metrics[mIdx].label = e.target.value;
                                                        setData({ ...data, research: { ...data.research, metrics } });
                                                    }}
                                                    className="w-full px-2 py-1 rounded bg-background border border-border text-xs font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Value (e.g. 98.7%)</label>
                                                <input
                                                    type="text"
                                                    value={m.value || ""}
                                                    onChange={(e) => {
                                                        const metrics = [...data.research.metrics];
                                                        metrics[mIdx].value = e.target.value;
                                                        setData({ ...data, research: { ...data.research, metrics } });
                                                    }}
                                                    className="w-full px-2 py-1 rounded bg-background border border-border text-sm font-bold text-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Subtext</label>
                                                <input
                                                    type="text"
                                                    value={m.subtext || ""}
                                                    onChange={(e) => {
                                                        const metrics = [...data.research.metrics];
                                                        metrics[mIdx].subtext = e.target.value;
                                                        setData({ ...data, research: { ...data.research, metrics } });
                                                    }}
                                                    className="w-full px-2 py-1 rounded bg-background border border-border text-[11px] text-muted-foreground"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture Pipeline Steps */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Architecture Pipeline Phases</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const steps = [...(data.research?.architectureSteps || [])];
                                            steps.push({
                                                step: `Phase ${steps.length + 1}: Pipeline Stage`,
                                                description: "Describe the phase logic, network layer, or data transformation.",
                                                icon: "Layers"
                                            });
                                            setData({ ...data, research: { ...data.research, architectureSteps: steps } });
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Phase
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {(data.research?.architectureSteps || []).map((step: any, sIdx: number) => (
                                        <div key={sIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const steps = data.research.architectureSteps.filter((_: any, i: number) => i !== sIdx);
                                                    setData({ ...data, research: { ...data.research, architectureSteps: steps } });
                                                }}
                                                className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={14} />
                                            </button>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className="space-y-1 sm:col-span-2">
                                                    <label className="text-xs font-bold text-muted-foreground">Phase Title</label>
                                                    <input
                                                        type="text"
                                                        value={step.step || ""}
                                                        onChange={(e) => {
                                                            const steps = [...data.research.architectureSteps];
                                                            steps[sIdx].step = e.target.value;
                                                            setData({ ...data, research: { ...data.research, architectureSteps: steps } });
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-bold text-muted-foreground">Icon Identifier</label>
                                                    <input
                                                        type="text"
                                                        value={step.icon || "Layers"}
                                                        onChange={(e) => {
                                                            const steps = [...data.research.architectureSteps];
                                                            steps[sIdx].icon = e.target.value;
                                                            setData({ ...data, research: { ...data.research, architectureSteps: steps } });
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground">Phase Description &amp; Mechanics</label>
                                                <textarea
                                                    rows={2}
                                                    value={step.description || ""}
                                                    onChange={(e) => {
                                                        const steps = [...data.research.architectureSteps];
                                                        steps[sIdx].description = e.target.value;
                                                        setData({ ...data, research: { ...data.research, architectureSteps: steps } });
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs leading-relaxed"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Research Tech Stack */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Frameworks &amp; Deep Learning Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(data.research?.techStack || []).map((tech: string, tIdx: number) => (
                                        <span
                                            key={tIdx}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-xs font-medium">
                                            <span>{tech}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const techStack = data.research.techStack.filter((_: any, i: number) => i !== tIdx);
                                                    setData({ ...data, research: { ...data.research, techStack } });
                                                }}
                                                className="text-muted-foreground hover:text-red-500">
                                                <Trash2 size={11} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Add tag (e.g. PyTorch, CUDA, Grad-CAM)"
                                        value={newResearchTech}
                                        onChange={(e) => setNewResearchTech(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (newResearchTech.trim()) {
                                                    const current = data.research?.techStack || [];
                                                    setData({ ...data, research: { ...data.research, techStack: [...current, newResearchTech.trim()] } });
                                                    setNewResearchTech("");
                                                }
                                            }
                                        }}
                                        className="flex-1 px-3 py-1.5 rounded-lg bg-muted/40 border border-border text-xs"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newResearchTech.trim()) {
                                                const current = data.research?.techStack || [];
                                                setData({ ...data, research: { ...data.research, techStack: [...current, newResearchTech.trim()] } });
                                                setNewResearchTech("");
                                            }
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. EXPERIENCE & LEADERSHIP TAB */}
                    {activeTab === "experience" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                                <div>
                                    <h2 className="text-xl font-bold">Leadership &amp; Professional Experience</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Manage corporate leadership positions, ventures, accomplishments, and tech stacks.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddNewExperience}
                                    size="sm"
                                    className="rounded-xl font-bold gap-1.5 shadow-sm">
                                    <Plus size={15} />
                                    <span>Add New Role</span>
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {data.experience?.map((exp: any, eIdx: number) => (
                                    <div key={eIdx} className="p-6 rounded-2xl bg-muted/30 border border-border space-y-5 relative">
                                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                                    Position #{eIdx + 1}
                                                </span>
                                                <span className="text-sm font-bold text-foreground">
                                                    {exp.role || "Untitled Role"} • {exp.company || "Company"}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteExperience(eIdx)}
                                                className="px-3 py-1 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 border border-destructive/20 transition-colors flex items-center gap-1 cursor-pointer">
                                                <Trash2 size={13} />
                                                <span>Delete Role</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Company / Organization</label>
                                                <input
                                                    type="text"
                                                    value={exp.company || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].company = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Role Title</label>
                                                <input
                                                    type="text"
                                                    value={exp.role || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].role = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Duration (e.g. March, 2026 — Present)</label>
                                                <input
                                                    type="text"
                                                    value={exp.duration || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].duration = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Location</label>
                                                <input
                                                    type="text"
                                                    value={exp.location || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].location = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Domain / Stack Headline</label>
                                                <input
                                                    type="text"
                                                    value={exp.stack || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].stack = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    placeholder="e.g. Venture Leadership & Enterprise Architecture"
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Badge Label</label>
                                                <input
                                                    type="text"
                                                    value={exp.badge || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].badge = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    placeholder="e.g. Executive Leadership"
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs font-semibold text-primary"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Verification URL (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={exp.link || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].link = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    placeholder="https://..."
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs font-mono"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Link Display Text</label>
                                                <input
                                                    type="text"
                                                    value={exp.linkLabel || ""}
                                                    onChange={(e) => {
                                                        const newExp = [...data.experience];
                                                        newExp[eIdx].linkLabel = e.target.value;
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    placeholder="e.g. Flagship Production: devojyotidutta.com"
                                                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs"
                                                />
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="space-y-1.5 pt-2 border-t border-border/40">
                                            <label className="text-xs font-bold text-muted-foreground">Tech Stack (Comma-separated)</label>
                                            <input
                                                type="text"
                                                value={exp.tech?.join(", ") || ""}
                                                onChange={(e) => {
                                                    const newExp = [...data.experience];
                                                    newExp[eIdx].tech = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                                    setData({ ...data, experience: newExp });
                                                }}
                                                placeholder="Next.js 15, TypeScript, System Architecture, Cloud Infrastructure"
                                                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs font-mono"
                                            />
                                        </div>

                                        {/* Key Accomplishments (Bullet points) */}
                                        <div className="space-y-2 pt-2 border-t border-border/40">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-muted-foreground">Key Accomplishments &amp; Leadership Impacts</label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newExp = [...data.experience];
                                                        const desc = newExp[eIdx].description || [];
                                                        newExp[eIdx].description = [...desc, "New key accomplishment or deliverable."];
                                                        setData({ ...data, experience: newExp });
                                                    }}
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                    <Plus size={12} />
                                                    <span>Add Accomplishment</span>
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                {(exp.description || []).map((bullet: string, bIdx: number) => (
                                                    <div key={bIdx} className="flex items-center gap-2">
                                                        <span className="text-xs text-primary font-mono font-bold">•</span>
                                                        <input
                                                            type="text"
                                                            value={bullet}
                                                            onChange={(e) => {
                                                                const newExp = [...data.experience];
                                                                newExp[eIdx].description[bIdx] = e.target.value;
                                                                setData({ ...data, experience: newExp });
                                                            }}
                                                            className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border text-xs"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newExp = [...data.experience];
                                                                newExp[eIdx].description = newExp[eIdx].description.filter((_: any, i: number) => i !== bIdx);
                                                                setData({ ...data, experience: newExp });
                                                            }}
                                                            className="text-muted-foreground hover:text-destructive p-1 rounded-md">
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                ))}
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
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                                <div>
                                    <h2 className="text-xl font-bold">Technical Arsenal &amp; Capabilities</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Configure technical skill domains, descriptions, and technology tags.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddNewSkillDomain}
                                    size="sm"
                                    className="rounded-xl font-bold gap-1.5 shadow-sm">
                                    <Plus size={15} />
                                    <span>Add Skill Domain</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {data.skills?.map((cat: any, cIdx: number) => (
                                    <div key={cIdx} className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4 relative">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                                                    Domain #{cIdx + 1}
                                                </span>
                                                <span className="text-sm font-bold text-foreground">
                                                    {cat.title || "Untitled Domain"}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSkillDomain(cIdx)}
                                                className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer">
                                                <Trash2 size={13} />
                                                <span>Delete Domain</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Domain Title</label>
                                                <input
                                                    type="text"
                                                    value={cat.title || ""}
                                                    onChange={(e) => {
                                                        const newSkills = [...data.skills];
                                                        newSkills[cIdx].title = e.target.value;
                                                        setData({ ...data, skills: newSkills });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-muted-foreground">Color Badge Theme</label>
                                                <select
                                                    value={cat.color || "text-blue-500 bg-blue-500/10 border-blue-500/20"}
                                                    onChange={(e) => {
                                                        const newSkills = [...data.skills];
                                                        newSkills[cIdx].color = e.target.value;
                                                        setData({ ...data, skills: newSkills });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs">
                                                    <option value="text-blue-500 bg-blue-500/10 border-blue-500/20">Ocean Blue</option>
                                                    <option value="text-emerald-500 bg-emerald-500/10 border-emerald-500/20">Emerald Green</option>
                                                    <option value="text-violet-500 bg-violet-500/10 border-violet-500/20">Violet Purple</option>
                                                    <option value="text-amber-500 bg-amber-500/10 border-amber-500/20">Amber Gold</option>
                                                    <option value="text-cyan-500 bg-cyan-500/10 border-cyan-500/20">Cyan Teal</option>
                                                    <option value="text-pink-500 bg-pink-500/10 border-pink-500/20">Rose Pink</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <label className="text-xs font-bold text-muted-foreground">Domain Overview &amp; Architectural Focus</label>
                                                <input
                                                    type="text"
                                                    value={cat.description || ""}
                                                    onChange={(e) => {
                                                        const newSkills = [...data.skills];
                                                        newSkills[cIdx].description = e.target.value;
                                                        setData({ ...data, skills: newSkills });
                                                    }}
                                                    placeholder="Designing resilient, high-availability distributed systems and cloud platforms."
                                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-border/40">
                                            <label className="text-xs font-bold text-muted-foreground">Skills (Comma-separated)</label>
                                            <input
                                                type="text"
                                                value={cat.skills?.join(", ") || ""}
                                                onChange={(e) => {
                                                    const newSkills = [...data.skills];
                                                    newSkills[cIdx].skills = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                                    setData({ ...data, skills: newSkills });
                                                }}
                                                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono"
                                            />
                                            <div className="flex flex-wrap gap-1.5">
                                                {cat.skills?.map((s: string, sIdx: number) => (
                                                    <span key={sIdx} className="px-2.5 py-0.5 rounded-md bg-muted text-foreground text-[10px] font-semibold border border-border">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 7. ABOUT ME & VISION */}
                    {activeTab === "about" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-8 animate-in fade-in duration-300">
                            <div className="border-b border-border/60 pb-5">
                                <h2 className="text-xl font-bold">Strategic Pillars, Career Milestones &amp; Attributes</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Manage your 4 executive pillars, career trajectory milestones, and leadership traits.
                                </p>
                            </div>

                            {/* Section 1: Strategic Pillars */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Strategic Executive Pillars</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddNewStrategicPillar}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Pillar
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.about?.pillars?.map((pil: any, pIdx: number) => (
                                        <div key={pIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                            <div className="flex items-center justify-between pb-1">
                                                <input
                                                    type="text"
                                                    value={pil.tag || ""}
                                                    onChange={(e) => {
                                                        const newPillars = [...data.about.pillars];
                                                        newPillars[pIdx].tag = e.target.value;
                                                        setData({ ...data, about: { ...data.about, pillars: newPillars } });
                                                    }}
                                                    placeholder="Pillar Tag"
                                                    className="w-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold uppercase text-primary"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteStrategicPillar(pIdx)}
                                                    className="text-muted-foreground hover:text-destructive p-1 rounded">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={pil.title}
                                                onChange={(e) => {
                                                    const newPillars = [...data.about.pillars];
                                                    newPillars[pIdx].title = e.target.value;
                                                    setData({ ...data, about: { ...data.about, pillars: newPillars } });
                                                }}
                                                placeholder="Pillar Headline"
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
                                                placeholder="Pillar Description"
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Leadership Trajectory (Timeline) */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Leadership Trajectory Milestones</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddNewTimelineStep}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Milestone
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {(data.about?.timeline || []).map((step: any, sIdx: number) => (
                                        <div key={sIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                            <div className="flex items-center justify-between pb-1">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={step.date || ""}
                                                        onChange={(e) => {
                                                            const timeline = [...data.about.timeline];
                                                            timeline[sIdx].date = e.target.value;
                                                            setData({ ...data, about: { ...data.about, timeline } });
                                                        }}
                                                        placeholder="Year (e.g. 2026)"
                                                        className="w-24 px-2 py-0.5 rounded bg-background border border-border text-xs font-mono font-bold text-primary"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={step.badge || ""}
                                                        onChange={(e) => {
                                                            const timeline = [...data.about.timeline];
                                                            timeline[sIdx].badge = e.target.value;
                                                            setData({ ...data, about: { ...data.about, timeline } });
                                                        }}
                                                        placeholder="Badge Label"
                                                        className="w-36 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold uppercase text-muted-foreground"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTimelineStep(sIdx)}
                                                    className="text-muted-foreground hover:text-destructive p-1 rounded">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={step.title || ""}
                                                    onChange={(e) => {
                                                        const timeline = [...data.about.timeline];
                                                        timeline[sIdx].title = e.target.value;
                                                        setData({ ...data, about: { ...data.about, timeline } });
                                                    }}
                                                    placeholder="Milestone Title"
                                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                />
                                                <input
                                                    type="text"
                                                    value={step.role || ""}
                                                    onChange={(e) => {
                                                        const timeline = [...data.about.timeline];
                                                        timeline[sIdx].role = e.target.value;
                                                        setData({ ...data, about: { ...data.about, timeline } });
                                                    }}
                                                    placeholder="Role Focus"
                                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-primary"
                                                />
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={step.desc || ""}
                                                onChange={(e) => {
                                                    const timeline = [...data.about.timeline];
                                                    timeline[sIdx].desc = e.target.value;
                                                    setData({ ...data, about: { ...data.about, timeline } });
                                                }}
                                                placeholder="Milestone details"
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 3: Executive Attributes */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Executive Attributes &amp; Discipline</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddNewExecutiveTrait}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Attribute
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(data.about?.traits || []).map((trait: any, trIdx: number) => (
                                        <div key={trIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 relative group">
                                            <div className="flex items-center justify-between pb-1">
                                                <input
                                                    type="text"
                                                    value={trait.info || ""}
                                                    onChange={(e) => {
                                                        const traits = [...data.about.traits];
                                                        traits[trIdx].info = e.target.value;
                                                        setData({ ...data, about: { ...data.about, traits } });
                                                    }}
                                                    placeholder="Subtext Tag"
                                                    className="w-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold uppercase text-primary"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteExecutiveTrait(trIdx)}
                                                    className="text-muted-foreground hover:text-destructive p-1 rounded">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={trait.title || ""}
                                                onChange={(e) => {
                                                    const traits = [...data.about.traits];
                                                    traits[trIdx].title = e.target.value;
                                                    setData({ ...data, about: { ...data.about, traits } });
                                                }}
                                                placeholder="Attribute Title"
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                            />
                                            <textarea
                                                rows={2}
                                                value={trait.desc || ""}
                                                onChange={(e) => {
                                                    const traits = [...data.about.traits];
                                                    traits[trIdx].desc = e.target.value;
                                                    setData({ ...data, about: { ...data.about, traits } });
                                                }}
                                                placeholder="Description"
                                                className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. EDUCATION & CERTIFICATIONS TAB */}
                    {activeTab === "education" && (
                        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-8 animate-in fade-in duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                                <div>
                                    <h2 className="text-xl font-bold">Academic Degree &amp; Specializations</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        University degree, CGPA, and online certifications/specializations.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddNewCourse}
                                    size="sm"
                                    className="rounded-xl font-bold gap-1.5 shadow-sm">
                                    <Plus size={15} />
                                    <span>Add Certification</span>
                                </Button>
                            </div>

                            {/* Section 1: Academic Degree */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">University Academic Degree</h3>
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

                            {/* Section 2: Specializations, Courses & Professional Certifications */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Specializations &amp; Certifications</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddNewCourse}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        <Plus size={14} /> Add Specialization
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(data.education?.courses || []).map((course: any, cIdx: number) => (
                                        <div key={cIdx} className="p-4 rounded-xl bg-muted/30 border border-border space-y-3 relative group">
                                            <div className="flex items-center justify-between pb-1">
                                                <input
                                                    type="text"
                                                    value={course.level || ""}
                                                    onChange={(e) => {
                                                        const courses = [...data.education.courses];
                                                        courses[cIdx].level = e.target.value;
                                                        setData({ ...data, education: { ...data.education, courses } });
                                                    }}
                                                    placeholder="Track / Level"
                                                    className="w-1/2 px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono font-bold uppercase text-primary"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteCourse(cIdx)}
                                                    className="text-muted-foreground hover:text-destructive p-1 rounded">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-muted-foreground">Institution / Platform</label>
                                                    <input
                                                        type="text"
                                                        value={course.title || ""}
                                                        onChange={(e) => {
                                                            const courses = [...data.education.courses];
                                                            courses[cIdx].title = e.target.value;
                                                            setData({ ...data, education: { ...data.education, courses } });
                                                        }}
                                                        placeholder="e.g. Programming Hero / DeepLearning.AI"
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-muted-foreground">Credential Badge</label>
                                                    <input
                                                        type="text"
                                                        value={course.badge || ""}
                                                        onChange={(e) => {
                                                            const courses = [...data.education.courses];
                                                            courses[cIdx].badge = e.target.value;
                                                            setData({ ...data, education: { ...data.education, courses } });
                                                        }}
                                                        placeholder="e.g. Next Level Development"
                                                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-muted-foreground">Description &amp; Mastery Scope</label>
                                                <textarea
                                                    rows={2}
                                                    value={course.desc || ""}
                                                    onChange={(e) => {
                                                        const courses = [...data.education.courses];
                                                        courses[cIdx].desc = e.target.value;
                                                        setData({ ...data, education: { ...data.education, courses } });
                                                    }}
                                                    placeholder="Description of technologies mastered"
                                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-xs resize-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
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

                            {/* MongoDB Atlas Live Database (Recommended for 100% Instant Updates) */}
                            <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Database size={20} className="text-primary" />
                                        <h3 className="text-base font-bold text-foreground">MongoDB Atlas Cloud Database</h3>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span>Instant Live Persistence</span>
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    MongoDB Atlas দিয়ে আপনি ব্যাকএন্ডে (এই স্টুডিওতে) যেকোনো তথ্য পরিবর্তন করে <strong>Save Changes</strong> দিলেই সাথে সাথে কোনো কমান্ড বা গিট পুশ ছাড়াই লাইভ সাইট ১ সেকেন্ডে আপডেট হয়ে যাবে।
                                </p>
                                <div className="bg-background/80 p-4 rounded-xl border border-border text-xs space-y-2">
                                    <div className="font-bold text-foreground flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-primary" />
                                        <span>সেটআপ করার সহজ ৩ ধাপ (১ মিনিট লাগবে):</span>
                                    </div>
                                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-[11px] leading-relaxed">
                                        <li><a href="https://www.mongodb.com/cloud/atlas/register" target="_blank" rel="noreferrer" className="text-primary underline font-semibold">mongodb.com/cloud/atlas</a> এ গিয়ে একটি ফ্রি M0 ক্লাস্টার তৈরি করুন।</li>
                                        <li><strong>Database Access</strong> এ একটি ইউজার ও পাসওয়ার্ড তৈরি করুন এবং <strong>Network Access</strong> এ <code>0.0.0.0/0</code> (Allow Access from Anywhere) দিন।</li>
                                        <li><strong>Connect</strong> এ ক্লিক করে <strong>Drivers</strong> সিলেক্ট করে কানেকশন স্ট্রিংটি কপি করুন (যেমন: <code>mongodb+srv://...</code>) এবং Vercel Dashboard &gt; Settings &gt; <strong>Environment Variables</strong> এ <code>MONGODB_URI</code> নামে সেভ করুন।</li>
                                    </ol>
                                </div>
                            </div>

                            {/* GitHub GitOps Auto-Deploy (Live Vercel Persistence) */}
                            <div className="p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <GitBranch size={18} className="text-primary" />
                                    <h3 className="text-base font-bold text-foreground">GitHub GitOps Auto-Deploy (For Live Vercel)</h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    On Vercel, serverless filesystems are read-only. To permanently commit edits made in this studio, save a GitHub Personal Access Token (PAT) with repo write access. Whenever you click <strong>Save Changes</strong>, it will automatically commit directly to <code className="text-primary font-mono font-bold">knaeeim/portfolio-updated</code> and trigger a live Vercel deploy!
                                </p>
                                <div className="space-y-2 max-w-lg">
                                    <label className="text-xs font-bold text-muted-foreground">
                                        GitHub Personal Access Token (PAT)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="password"
                                            value={githubToken}
                                            onChange={(e) => setGithubToken(e.target.value)}
                                            placeholder="ghp_... or github_pat_..."
                                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono outline-none"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                localStorage.setItem("wz_github_token", githubToken.trim());
                                                toast.success("GitHub token saved in your browser!");
                                            }}
                                            className="rounded-xl text-xs font-bold px-4">
                                            Save Token
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        Stored securely in your private browser storage. Alternatively, set <code className="text-primary font-mono">GITHUB_TOKEN</code> in your Vercel Project Environment Variables.
                                    </p>
                                </div>
                            </div>

                            {/* Data Export & Backup Tools Card */}
                            <div className="p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <Download size={18} className="text-primary" />
                                    <h3 className="text-base font-bold text-foreground">Data Export &amp; Offline Backup</h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Download your current portfolio data as a complete JSON file anytime, or copy it directly to your clipboard.
                                </p>
                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                    <Button
                                        type="button"
                                        onClick={handleExportJson}
                                        variant="outline"
                                        className="rounded-xl text-xs font-bold gap-2">
                                        <Download size={14} />
                                        <span>Download portfolio-content.json</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleCopyJson}
                                        variant="outline"
                                        className="rounded-xl text-xs font-bold gap-2">
                                        <Copy size={14} />
                                        <span>Copy JSON to Clipboard</span>
                                    </Button>
                                </div>
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
