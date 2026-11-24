import AboutMe from "@/components/AboutMe";
import TerminalHero from "@/components/Banner";
import ContactSection from "@/components/contact-us";
import EducationSection from "@/components/Education";
import ExperienceSection from "@/components/experience";
import { Navbar1 } from "@/components/navbar1";
import ProjectsSection from "@/components/projects";
import ResearchSection from "@/components/Research";
import SkillSection from "@/components/Skills";
import { HiddenSectionNotice, UnderConstruction } from "@/components/SectionStatus";
import { getPortfolioData } from "@/lib/portfolio-data";
import { SECTIONS, hiddenAnchors, isSectionVisible, type SectionKey } from "@/lib/sections";
import React from "react";

// Enable Incremental Static Regeneration (ISR) with Edge CDN caching
export const revalidate = 60;

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType<{ data: any }>> = {
    hero: TerminalHero,
    about: AboutMe,
    skills: SkillSection,
    projects: ProjectsSection,
    experience: ExperienceSection,
    research: ResearchSection,
    education: EducationSection,
    contact: ContactSection,
};

const CommonLayoutHomePage = async () => {
    const portfolioData = await getPortfolioData();

    const companyName = portfolioData?.general?.company || "WebZen Bangladesh";
    const userName = portfolioData?.general?.name || "Khairul Bashar Naeeim";
    const resumeUrl = portfolioData?.general?.resumeUrl || "/resume.pdf";
    const resumeTitle = portfolioData?.general?.resumeTitle || "Executive CV";

    const visibleSections = SECTIONS.filter((s) => isSectionVisible(portfolioData, s.key));
    if (visibleSections.length === 0) {
        return <UnderConstruction />;
    }
    const hidden = hiddenAnchors(portfolioData);

    return (
        <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
            <Navbar1
                companyName={companyName}
                userName={userName}
                resumeUrl={resumeUrl}
                resumeTitle={resumeTitle}
                hiddenAnchors={hidden}
            />
            <HiddenSectionNotice hiddenAnchors={hidden} />
            <main className="flex-1 w-full">
                {visibleSections.map(({ key }) => {
                    const Section = SECTION_COMPONENTS[key];
                    return <Section key={key} data={portfolioData} />;
                })}
            </main>
        </div>
    );
};

export default CommonLayoutHomePage;
