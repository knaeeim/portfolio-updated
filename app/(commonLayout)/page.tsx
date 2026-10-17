import AboutMe from "@/components/AboutMe";
import TerminalHero from "@/components/Banner";
import ContactSection from "@/components/contact-us";
import EducationSection from "@/components/Education";
import ExperienceSection from "@/components/experience";
import { Navbar1 } from "@/components/navbar1";
import ProjectsSection from "@/components/projects";
import SkillSection from "@/components/Skills";
import { getPortfolioData } from "@/lib/portfolio-data";
import React from "react";

// Always re-evaluate on request so admin edits appear instantly
export const dynamic = "force-dynamic";

const CommonLayoutHomePage = async () => {
    const portfolioData = await getPortfolioData();

    const companyName = portfolioData?.general?.company || "WebZen";
    const userName = portfolioData?.general?.name || "Khairul Bashar Naeeim";

    return (
        <div>
            <Navbar1 companyName={companyName} userName={userName} />
            <TerminalHero data={portfolioData} />
            <AboutMe data={portfolioData} />
            <ExperienceSection data={portfolioData} />
            <SkillSection data={portfolioData} />
            <ProjectsSection data={portfolioData} />
            <EducationSection data={portfolioData} />
            <ContactSection data={portfolioData} />
        </div>
    );
};

export default CommonLayoutHomePage;
