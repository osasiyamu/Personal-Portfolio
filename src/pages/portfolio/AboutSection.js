import { useEffect, useState } from 'react';

const AboutSection = ({profileId}) => {

    const [dataInfo, setDataInfo] = useState([]);

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/about/${profileId}`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setDataInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    useEffect(() => {
		getDataInfo();
    });

    return (
        <div>
            <p>{dataInfo["about"]}</p>
        </div>
    );
}

export default AboutSection;
