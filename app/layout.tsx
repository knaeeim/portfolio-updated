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
    metadataBase: new URL("https://www.naeeim.site"),
    title: "Khairul Bashar Naeeim | Founder & CEO, Principal Full-Stack Architect",
    description:
        "Official executive portfolio of Khairul Bashar Naeeim — Founder & CEO at WebZen, Principal Full-Stack Architect & Product Strategist. Engineering scalable digital ventures, enterprise web platforms, and clinical systems.",
    keywords: [
        "Khairul Bashar Naeeim",
        "Founder & CEO",
        "WebZen",
        "Principal Full-Stack Architect",
        "Next.js 16 Specialist",
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
        url: "https://www.naeeim.site",
        title: "Khairul Bashar Naeeim | Founder & CEO, Principal Full-Stack Architect",
        description:
            "Engineering scalable digital ventures, enterprise web platforms, and visionary software solutions.",
        siteName: "Khairul Bashar Naeeim Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1477,
                height: 825,
                alt: "Khairul Bashar Naeeim — Software Architect & Founder",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Khairul Bashar Naeeim | Founder & CEO, Principal Full-Stack Architect",
        description:
            "Engineering scalable digital ventures, enterprise web platforms, and visionary software solutions.",
        images: ["/og-image.png"],
        creator: "@knaeeim",
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "32x32" },
            { url: "/icon.png", type: "image/png", sizes: "512x512" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen bg-background text-foreground`}>
                <div className="film-grain-bg" aria-hidden="true" />
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
