import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import ExpItem from './subsections/ExpItem';

const ExpSection = ({ searchId }) => {
    const [dataInfo, setDataInfo] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/experience`)
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

    const searchUserData = () => {
        fetch(`http://localhost:5555/userprofile/experience/${searchId}`)
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
		if(searchId === 0) {
            getDataInfo();
        } else {
            searchUserData();
        }
    }, []);

    return (
        <div>
            {dataInfo.map((row, index) => (
                <ExpItem key={index} dataInfo={row} searchId={searchId} />
            ))}

            {!isAdding && (searchId === 0) &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={() => setIsAdding(true)}>Add</Button>
                </div>
            }

            {isAdding && <ExpItem dataInfo={{}} add={true} />}
        </div>
    );
}

export default ExpSection;