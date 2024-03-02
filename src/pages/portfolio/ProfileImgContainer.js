import { useEffect, useState } from 'react';

const ProfileImgContainer = ({profileId}) => {

    const [profileInfo, setProfileInfo] = useState([]);

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
		getProfileInfo();
    });

    return (
		<div id="profileImgContainer">
            <img src={"https://avatars.githubusercontent.com/u/1"} id="profileImg" alt="Profile" className='rounded-circle' /> 

            <div id="userBio">
                <p id="username">{profileInfo["firstname"] + " " + profileInfo["lastname"]}</p>
                <p id="userOccupation">{profileInfo["occupation"]}</p>
            </div>
        </div>
    );
}

export default ProfileImgContainer;
