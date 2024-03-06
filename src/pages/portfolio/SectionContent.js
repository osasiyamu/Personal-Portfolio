import AboutSection from "./AboutSection";

const SectionContent = ({ profileId }) => {

    return (
        <div>
            {(window.location.pathname === "/myportfolio") && 
                <AboutSection profileId={profileId} />
            }
        </div>
    );
}

export default SectionContent;
