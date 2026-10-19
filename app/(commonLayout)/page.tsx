import AboutMe from "@/components/AboutMe";
import TerminalHero from "@/components/Banner";
import ContactSection from "@/components/contact-us";
import EducationSection from "@/components/Education";
import ExperienceSection from "@/components/experience";
import { Navbar1 } from "@/components/navbar1";
import ProjectsSection from "@/components/projects";
import ResearchSection from "@/components/Research";
import SkillSection from "@/components/Skills";
import { getPortfolioData } from "@/lib/portfolio-data";
import React from "react";

// Always re-evaluate on request so admin edits appear instantly
export const dynamic = "force-dynamic";

const CommonLayoutHomePage = async () => {
    const portfolioData = await getPortfolioData();

    const companyName = portfolioData?.general?.company || "WebZen Bangladesh";
    const userName = portfolioData?.general?.name || "Khairul Bashar Naeeim";

    return (
        <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
            <Navbar1 companyName={companyName} userName={userName} />
            <main className="flex-1 w-full">
                <TerminalHero data={portfolioData} />
                <AboutMe data={portfolioData} />
                <SkillSection data={portfolioData} />
                <ProjectsSection data={portfolioData} />
                <ExperienceSection data={portfolioData} />
                <ResearchSection data={portfolioData} />
                <EducationSection data={portfolioData} />
                <ContactSection data={portfolioData} />
            </main>
        </div>
    );
};

export default CommonLayoutHomePage;
