import { useEffect, useState } from 'react';

const ProfileImgContainer = () => {
    const [data, setData] = useState(["https://avatars.githubusercontent.com/u/1", "John Doe", "Doctor"]);
    var profileId = 0;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/data${profileId}`);
            setData(response.json());
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div id="profileImgContainer">
            <img src={data[0]} id="profileImg" alt="Profile Image" className='rounded-circle' /> 

            <div id="userBio">
                <p id="username">{data[1]}</p>
                <p id="userOccupation">{data[2]}</p>
            </div>
        </div>
    );
}

export default ProfileImgContainer;
