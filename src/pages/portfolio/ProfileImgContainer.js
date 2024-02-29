import { useEffect, useState } from 'react';

const ProfileImgContainer = () => {
    var profileId = 1;
    const [userDesc, setUserDesc] = useState([]);

    const getUserDescription = () => {
        fetch(`http://localhost:5555/myportfolio/${profileId}`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setUserDesc(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    useEffect(() => {
		getUserDescription();
    }, []);

    return (
		<div id="profileImgContainer">
            <img src={"https://avatars.githubusercontent.com/u/1"} id="profileImg" alt="Profile Image" className='rounded-circle' /> 

            <div id="userBio">
                <p id="username">{userDesc["firstname"] + " " + userDesc["lastname"]}</p>
                <p id="userOccupation">{userDesc["occupation"]}</p>
            </div>
        </div>
    );
}

export default ProfileImgContainer;
