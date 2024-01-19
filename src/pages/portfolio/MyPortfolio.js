import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const MyPortfolio = () => {
    const [currSection, setCurrSection] = useState("About");

    return (
        <section className="container mt-5">
            <ProfileImgContainer />

            <div className='sectionContainer'>
                <div id='sectionControls'>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("About")}>About</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Search")}>Search</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Education")}>Education</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Experience")}>Experience</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Licenses")}>Licenses</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Projects")}>Projects</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Skills")}>Skills</Button>
                    <Button className='btn btn-primary' id='ctrlBtn' onClick={() => setCurrSection("Contact")}>Contact</Button>
                </div>
                <hr />

                <SectionContent {...currSection} />

                <div id='editBtnContainer'>
                    <Button className='btn btn-secondary'>Edit</Button>
                </div>
                
            </div>
        </section>
    );
}

export default MyPortfolio;
