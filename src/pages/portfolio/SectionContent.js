import { AboutSection, EduSection, ExpSection, LicenseSection, ProjectSection, SkillSection, ContactSection } from './sections';

const SectionContent = () => {

    return (
        <div>
            {(window.location.pathname === "/myportfolio") && 
                <AboutSection />
            }
            {(window.location.pathname === "/myportfolio/education") && 
                <EduSection />
            }
            {(window.location.pathname === "/myportfolio/experience") && 
                <ExpSection />
            }
            {(window.location.pathname === "/myportfolio/licenses") && 
                <LicenseSection />
            }
            {(window.location.pathname === "/myportfolio/projects") && 
                <ProjectSection />
            }
            {(window.location.pathname === "/myportfolio/skills") && 
                <SkillSection />
            }
            {(window.location.pathname === "/myportfolio/contact") && 
                <ContactSection />
            }
        </div>
    );
}

export default SectionContent;
