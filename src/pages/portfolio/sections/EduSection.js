import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import EduItem from './subsections/EduItem';

const EduSection = ({profileId}) => {

    const [dataInfo, setDataInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updateValue, setUpdateValue] = useState("");

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/education/${profileId}`)
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
            {dataInfo.map((row, index) => (
                <EduItem key={index} dataInfo={row} />
            ))}
        </div>
    );
}

export default EduSection;
