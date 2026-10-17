"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const current = resolvedTheme || theme;
        const nextTheme = current === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    };

    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 rounded-xl border-border/80 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Toggle theme"
                suppressHydrationWarning>
                <Sun className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = (resolvedTheme || theme) === "dark";

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            id="theme-switcher-button"
            className="w-9 h-9 p-0 rounded-xl border-border/80 hover:bg-muted/80 transition-all cursor-pointer relative"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Current: ${isDark ? "Dark" : "Light"} mode. Click to switch to ${isDark ? "Light" : "Dark"}.`}
            suppressHydrationWarning>
            <Sun className="h-[1.15rem] w-[1.15rem] transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-[1.15rem] w-[1.15rem] transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-blue-400" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
