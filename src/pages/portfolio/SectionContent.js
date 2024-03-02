import AboutSection from "./AboutSection";

const SectionContent = ({ profileId }) => {

    return (
        <div>
            <p>Content for {window.location.pathname}</p>

            {(window.location.pathname === "/myportfolio") && 
                <AboutSection profileId={profileId} />
            }
        </div>
    );
}

export default SectionContent;
