import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

const MyPortfolio = ({ profileId }) => {

    profileId = 1;

    useEffect(() => {
        document.title = "MyPortfolio";
    }, []);

    return (
        <div>
            {(localStorage.getItem("loggedIn") === "true") &&
                <div className="container mt-5">
                    <ProfileImgContainer
                        profileId={profileId}
                    />

                    <div id='sectionContainer'>
                        <div id='sectionControls'>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio"}>About</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/education"}>Education</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/experience"}>Experience</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/licenses"}>Licenses</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/projects"}>Projects</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/skills"}>Skills</Button>
                            <Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/myportfolio/contact"}>Contact</Button>
                        </div>
                        <hr />

                        <SectionContent
                            profileId={profileId}
                        />
                    </div>
                </div>
            }

            {(localStorage.getItem("loggedIn") !== "true") && 
                <div className="container mt-5 centralized">
                    <h1>Sorry, you are not logged in!</h1>
                    <Button href="/login" className='errorBtn'>LOGIN</Button>
                </div>
            }
        </div>
    );
}

export default MyPortfolio;
