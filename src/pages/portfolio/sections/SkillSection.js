import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import SkillItem from './subsections/SkillItem';

const SkillSection = () => {

    const [skillInfo, setSkillInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [skillsUpdate, setSkillsUpdate] = useState([]);

    const getSkillInfo = () => {
        fetch(`http://localhost:5555/myportfolio/skills`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setSkillInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    useEffect(() => {
		getSkillInfo();
    }, []);

    return (
        <div className='subItem'>
            <div className='mb-4'>
                {skillInfo.map((row, index) => (
                    <SkillItem key={index} dataInfo={row} />
                ))}

                {isAdding && <SkillItem dataInfo={{}} add={true} />}
            </div>
            

            {!isAdding &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={() => setIsAdding(true)}>Add</Button>
                </div>
            }
        </div>
    );
}

export default SkillSection;
