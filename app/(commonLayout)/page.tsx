import AboutMe from "@/components/AboutMe";
import TerminalHero from "@/components/Banner";
import ContactSection from "@/components/contact-us";
import EducationSection from "@/components/Education";
import ExperienceSection from "@/components/experience";
import { Navbar1 } from "@/components/navbar1";
import SkillSection from "@/components/Skills";
import React from "react";

const CommonLayoutHomePage = () => {
    return (
        <div>
            <Navbar1 />
            <TerminalHero />
            <AboutMe />
            <ExperienceSection />
            <SkillSection />
            <EducationSection />
            <ContactSection />
        </div>
    );
};

export default CommonLayoutHomePage;
