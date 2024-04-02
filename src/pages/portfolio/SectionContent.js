import { AboutSection, EduSection, ExpSection, LicenseSection, ProjectSection, SkillSection, ContactSection } from './sections';

const SectionContent = ({ searchId }) => {

    return (
        <div>
            {(["/myportfolio", "/userprofile"].includes(window.location.pathname)) && 
                <AboutSection searchId={searchId} />
            }
            {(["/myportfolio/education", "/userprofile/education"].includes(window.location.pathname)) && 
                <EduSection searchId={searchId} />
            }
            {(["/myportfolio/experience", "/userprofile/experience"].includes(window.location.pathname)) && 
                <ExpSection searchId={searchId} />
            }
            {(["/myportfolio/licenses", "/userprofile/licenses"].includes(window.location.pathname)) && 
                <LicenseSection searchId={searchId} />
            }
            {(["/myportfolio/projects", "/userprofile/projects"].includes(window.location.pathname)) && 
                <ProjectSection searchId={searchId} />
            }
            {(["/myportfolio/skills", "/userprofile/skills"].includes(window.location.pathname)) && 
                <SkillSection searchId={searchId} />
            }
            {(["/myportfoliocontact", "/userprofilecontact"].includes(window.location.pathname)) && 
                <ContactSection searchId={searchId} />
            }
        </div>
    );
}

export default SectionContent;
