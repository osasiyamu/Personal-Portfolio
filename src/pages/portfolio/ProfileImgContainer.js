const ProfileImgContainer = (info) => {

    return (
		<div id="profileImgContainer">
            <img src={info.imgSrc} id="profileImg" alt="Profile Image" className='rounded-circle' /> 

            <div id="userBio">
                <p id="username">{info.fname + " " + info.lname}</p>
                <p id="userOccupation">{info.occupation}</p>
            </div>
        </div>
    );
}

export default ProfileImgContainer;
