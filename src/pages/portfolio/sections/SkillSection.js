import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import SkillItem from './subsections/SkillItem';

const SkillSection = ({ searchId }) => {

    const [skillInfo, setSkillInfo] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const getDataInfo = () => {
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

    const searchUserData = () => {
        fetch(`http://localhost:5555/userprofile/skills/${searchId}`)
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
		if(searchId === 0) {
            getDataInfo();
        } else {
            searchUserData();
        }
    }, []);

    return (
        <div className='subItem'>
            <div className='mb-4'>
                {skillInfo.map((row, index) => (
                    <SkillItem key={index} dataInfo={row} searchId={searchId} />
                ))}

                {isAdding && <SkillItem dataInfo={{}} add={true} />}
            </div>
            

            {!isAdding && (searchId === 0) &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={() => setIsAdding(true)}>Add</Button>
                </div>
            }
        </div>
    );
}

export default SkillSection;
