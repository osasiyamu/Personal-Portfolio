import React from 'react';
import { Button } from 'react-bootstrap';
import ProfileImgContainer from './portfolio/ProfileImgContainer';
import SectionContent from './portfolio/SectionContent';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/myPortfolio.css';

function UserProfileInfo() {
	var searchId = localStorage.getItem('searchId');

	if (!searchId) {
		return <div>No user data found</div>;
	}

	return (
		<div className="container mt-5">
			<ProfileImgContainer searchId={searchId} />

			<div id='sectionContainer'>
				<div id='sectionControls'>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile"}>About</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/education"}>Education</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/experience"}>Experience</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/licenses"}>Licenses</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/projects"}>Projects</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/skills"}>Skills</Button>
					<Button className='btn btn-primary' id='ctrlBtn' onClick={() => window.location.href="/userprofile/contact"}>Contact</Button>
				</div>
				<hr />

				<SectionContent searchId={searchId} />
			</div>
		</div>
	);
}

export default UserProfileInfo;
