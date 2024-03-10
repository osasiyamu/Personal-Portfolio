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
    // <div style={{margin: 50}}>
    //   <h1 style={{textAlign: 'center'}}>User Profile Information</h1>
    //   <hr></hr>
    //   <p>FirstName: {user.firstname}</p>
    //   <p>LastName: {user.lastname}</p>
    //   <p>Occupation: {user.occupation}</p>
    // </div>

    <div className="container mt-5">
        {/* <p>FirstName: {user.firstname}</p>
        <p>LastName: {user.lastname}</p>

        <p>Occupation: {user.occupation}</p> */}
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
