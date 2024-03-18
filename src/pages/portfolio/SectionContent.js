import { AboutSection, EduSection } from './sections';

const SectionContent = ({ profileId }) => {

    return (
        <div>
            {(window.location.pathname === "/myportfolio") && 
                <AboutSection profileId={profileId} />
            }
            {(window.location.pathname === "/myportfolio/education") && 
                <EduSection profileId={profileId} />
            }
        </div>
    );
}

export default SectionContent;
