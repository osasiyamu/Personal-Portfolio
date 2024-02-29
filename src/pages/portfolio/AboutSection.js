import { useEffect, useState } from 'react';

const AboutSection = ({profileId}) => {
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
        <div>
            <p>{userDesc['about']}</p>
        </div>
    );
}

export default AboutSection;
