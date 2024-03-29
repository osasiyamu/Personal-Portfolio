import { AboutSection, EduSection, ExpSection, LicenseSection, ProjectSection, SkillSection, ContactSection } from './sections';

const SectionContent = ({ profileId }) => {

    return (
        <div>
            {(window.location.pathname === "/myportfolio") && 
                <AboutSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/education") && 
                <EduSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/experience") && 
                <ExpSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/licenses") && 
                <LicenseSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/projects") && 
                <ProjectSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/skills") && 
                <SkillSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/contact") && 
                <ContactSection profileId={profileId} />
            }
        </div>
    );
}

export default SectionContent;
