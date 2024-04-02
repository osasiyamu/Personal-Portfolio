import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const AboutSection = ({ searchId }) => {

    const [dataInfo, setDataInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updateValue, setUpdateValue] = useState("");

    const getDataInfo = () => {
        fetch(`http://localhost:5555/myportfolio/about`)
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
        fetch(`http://localhost:5555/userprofile/about/${searchId}`)
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

    const editAboutSection = () => {
        setUpdateValue(dataInfo["about"]);
        setIsEditing(true);
    };

    const updateAboutSection = () => {
        fetch(`http://localhost:5555/myportfolio/about`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: updateValue })
        })
        .then(data => {
            setIsEditing(false);
            setDataInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
        window.location.reload();
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
            {!isEditing && 
                <div className='subItem'>
                    <p>{dataInfo["about"]}</p>
                    {(searchId === 0) && <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={editAboutSection}>Edit</Button>
                    </div> }
                </div>
            }
            
            {isEditing &&
                <div>
                    <h5><strong>Edit About Section</strong></h5>

                    <div className='formInputContainer'>
                        <textarea
                            type='text'
                            value={updateValue}
                            name='aboutInfoText'
                            onChange={(e) => setUpdateValue(e.target.value)}
                            required
                        />
                    </div>

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={updateAboutSection}>Submit</Button>
                    </div>
                </div>
             }
        </div>
    );
}

export default AboutSection;
