import { useEffect, useState } from 'react';

import AboutSection from "./AboutSection";

const SectionContent = ({ profileId }) => {

    const [profileInfo, setProfileInfo] = useState([]);

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
