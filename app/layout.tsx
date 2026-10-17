import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Khairul Bashar Naeeim | Founder & CEO, Principal Full-Stack Architect",
    description:
        "Official executive portfolio of Khairul Bashar Naeeim — Founder & CEO at WebZen, Principal Full-Stack Architect & Product Strategist. Engineering scalable digital ventures, enterprise web platforms, and clinical systems.",
    keywords: [
        "Khairul Bashar Naeeim",
        "Founder & CEO",
        "WebZen",
        "Principal Full-Stack Architect",
        "Next.js 15 Specialist",
        "Web Application Architect",
        "Dr Devojyoti Dutta Portal",
        "Enterprise Software",
        "Tech Executive Bangladesh",
    ],
    authors: [{ name: "Khairul Bashar Naeeim", url: "https://github.com/knaeeim" }],
    creator: "Khairul Bashar Naeeim",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://knaeeim.dev",
        title: "Khairul Bashar Naeeim | Founder & CEO, Principal Full-Stack Architect",
        description:
            "Engineering scalable digital ventures, enterprise web platforms, and visionary software solutions.",
        siteName: "Khairul Bashar Naeeim Portfolio",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                    <Toaster richColors position="top-center" />
                </ThemeProvider>
            </body>
        </html>
    );
}
