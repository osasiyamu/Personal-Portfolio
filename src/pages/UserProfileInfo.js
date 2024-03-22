import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SectionContent from './portfolio/SectionContent';
import ProfileImgContainer from './portfolio/ProfileImgContainer';



function UserProfileInfo() {
  const location = useLocation();
  const user = location.state?.userData;
  console.log(user);
  if (!user) {
    return <div>No user data found</div>;
  }

  return (

    <div className="container mt-5">
        <ProfileImgContainer
                profileId={user.profileid}
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
                profileId={user.profileid}
            />
        </div>
    </div>
    
  );
}

export default UserProfileInfo;
