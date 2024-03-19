import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../Authentication'; // Adjust the import path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';

const MyPortfolio = ({ profileId }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        document.title = "MyPortfolio";
        // Check if the user is authenticated and update state accordingly
        setUserAuthenticated(isAuthenticated());
    }, []);

    if (!userAuthenticated) {
        return (
            <div className="text-center mt-5">
                <h2>You need to be logged in to access this page.</h2>
                <Button className='btn btn-primary mt-3' onClick={() => (window.location.href = '/login')}>Login</Button>
            </div>
        );
    }

    // If authenticated, render the MyPortfolio content
    return (
        <div className="container mt-5">
            <ProfileImgContainer profileId={profileId} />

            <div id='sectionContainer'>
                <div id='sectionControls'>
                    <Button className='btn btn-primary' id='ctrlBtn'>About</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Education</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Experience</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Licenses</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Projects</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Skills</Button>
                    <Button className='btn btn-primary' id='ctrlBtn'>Contact</Button>
                </div>
                <hr />

                <SectionContent profileId={profileId} />
            </div>
        </div>
    );
}

export default MyPortfolio;