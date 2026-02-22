"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type BannerSettings = {
    profileImage: string;
    resumeFile: string;
    githubProfile: string;
};

const BANNER_SETTINGS_KEY = "portfolioBannerSettings";

const defaultBannerSettings: BannerSettings = {
    profileImage: "/profilePicture.jpg",
    resumeFile: "/resume.pdf",
    githubProfile: "https://github.com/your-username",
};

const DashboardPage = () => {
    const [settings, setSettings] = React.useState<BannerSettings>(defaultBannerSettings);
    const [saved, setSaved] = React.useState(false);

    React.useEffect(() => {
        const storedSettings = localStorage.getItem(BANNER_SETTINGS_KEY);
        if (!storedSettings) return;

        try {
            const parsed = JSON.parse(storedSettings) as Partial<BannerSettings>;
            setSettings((prev) => ({ ...prev, ...parsed }));
        } catch {
            setSettings(defaultBannerSettings);
        }
    }, []);

    const updateField = (field: keyof BannerSettings, value: string) => {
        setSaved(false);
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    const saveSettings = () => {
        localStorage.setItem(BANNER_SETTINGS_KEY, JSON.stringify(settings));
        setSaved(true);
    };

    const resetSettings = () => {
        localStorage.removeItem(BANNER_SETTINGS_KEY);
        setSettings(defaultBannerSettings);
        setSaved(true);
    };

    return (
        <section className="container mx-auto max-w-2xl px-6 py-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Banner Dashboard</h1>
            <p className="text-muted-foreground mb-8">
                Update banner image, resume download file, and GitHub profile link.
            </p>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Image Path/URL</label>
                    <input
                        value={settings.profileImage}
                        onChange={(e) => updateField("profileImage", e.target.value)}
                        placeholder="/profilePicture.jpg"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Resume File Path/URL</label>
                    <input
                        value={settings.resumeFile}
                        onChange={(e) => updateField("resumeFile", e.target.value)}
                        placeholder="/resume.pdf"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub Profile URL</label>
                    <input
                        value={settings.githubProfile}
                        onChange={(e) => updateField("githubProfile", e.target.value)}
                        placeholder="https://github.com/your-username"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Button onClick={saveSettings}>Save Changes</Button>
                    <Button variant="outline" onClick={resetSettings}>
                        Reset Defaults
                    </Button>
                </div>

                {saved && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Settings updated. Refresh the home page to see banner changes.
                    </p>
                )}
            </div>
        </section>
    );
};

export default DashboardPage;
