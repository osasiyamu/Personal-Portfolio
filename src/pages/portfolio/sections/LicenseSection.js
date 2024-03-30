import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import LicenseItem from './subsections/LicenseItem';

const LicenseSection = () => {

    const [dataInfo, setDataInfo] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/licenses`)
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
    }, []);

    return (
        <div>
            {dataInfo.map((row, index) => (
                <LicenseItem key={index} dataInfo={row} />
            ))}

            {!isAdding &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={() => setIsAdding(true)}>Add</Button>
                </div>
            }

            {isAdding && <LicenseItem dataInfo={{}} add={true} />}
        </div>
    );
}

export default LicenseSection;
