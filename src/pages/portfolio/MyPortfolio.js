import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const MyPortfolio = () => {
    useEffect(() => {
        document.title = "MyPortfolio"
    }, []);

    const [currSection, setCurrSection] = useState("About");

    return (
        <div className="container mt-5">
            <ProfileImgContainer />

            <div id='sectionContainer'>
                <div id='sectionControls'>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("About")}>About</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Education")}>Education</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Experience")}>Experience</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Licenses")}>Licenses</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Projects")}>Projects</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Skills")}>Skills</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Contact")}>Contact</Button>
                </div>
                <hr />

                <SectionContent sectionName={currSection} />

                <div id='editBtnContainer'>
                    <Button className='btn btn-secondary'>Edit</Button>
                </div>
            </div>
        </div>
    );
}

export default MyPortfolio;
