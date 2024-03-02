import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/myPortfolio.css';

import ProfileImgContainer from './ProfileImgContainer';
import SectionContent from './SectionContent';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const MyPortfolio = () => {

    var profileId = 1;
    const [profileInfo, setProfileInfo] = useState([]);
    const myArray = ['Item 1', 'Item 2', 'Item 3'];

    const getProfileInfo = () => {
        fetch(`http://localhost:5555/myportfolio/${profileId}`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setProfileInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    useEffect(() => {
        document.title = "MyPortfolio";
		getProfileInfo();
    }, []);

    return (
        <div className="container mt-5">
            <ProfileImgContainer
                imgSrc="https://avatars.githubusercontent.com/u/1"
                fname={profileInfo["firstname"]}
                lname={profileInfo["lastname"]}
                occupation={profileInfo["occupation"]}
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

                <div id='editBtnContainer'>
                    <Button className='btn btn-secondary'>Edit</Button>
                </div>
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
