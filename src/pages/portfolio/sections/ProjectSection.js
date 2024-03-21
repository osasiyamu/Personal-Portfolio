import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import ProjectItem from './subsections/ProjectItem';

const ProjectSection = ({profileId}) => {

    const [dataInfo, setDataInfo] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/projects/${profileId}`)
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
                <ProjectItem key={index} dataInfo={row} />
            ))}

            {!isAdding &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={() => setIsAdding(true)}>Add</Button>
                </div>
            }

            {isAdding && <ProjectItem dataInfo={{"profileId": profileId}} add={true} />}
        </div>
    );
}

export default ProjectSection;
