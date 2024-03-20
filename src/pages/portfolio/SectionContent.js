import { AboutSection, EduSection, ContactSection } from './sections';

const SectionContent = ({ profileId }) => {

    return (
        <div>
            {(window.location.pathname === "/myportfolio") && 
                <AboutSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/education") && 
                <EduSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/contact") && 
                <ContactSection profileId={profileId} />
            }
        </div>
    );
}

export default SectionContent;
