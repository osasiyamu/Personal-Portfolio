import AboutSection from "./AboutSection";

const SectionContent = ({sectionName}) => {

    return (
        <div>
            <p>Content for {sectionName}</p>
            <AboutSection {...sectionName == "About"} />
        </div>
    );
}

export default SectionContent;
