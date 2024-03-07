import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

const MyPortfolio = () => {

    var profileId = 1;
    const myArray = ['Item 1', 'Item 2', 'Item 3'];

    useEffect(() => {
        document.title = "MyPortfolio";
    }, []);

    return (
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

            <div>
                {myArray.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default MyPortfolio;
