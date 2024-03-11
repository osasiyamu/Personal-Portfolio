import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const AboutSection = ({profileId}) => {

    const [dataInfo, setDataInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    // const token = localStorage.getItem('token');  // get the CSRF token
    // localStorage.getItem(String(profileId)) ? dataInfo.push(JSON.parse(localStorage.getItem(String(profileInfo)))) : null; 
    const [updateValue, setUpdateValue] = useState("");

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

    const editAboutSection = () => {
        setUpdateValue(dataInfo["about"]);
        setIsEditing(true);
    };

    const updateAboutSection = () => {
        fetch(`http://localhost:5555/myportfolio/about/${profileId}`, {
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
    };

    useEffect(() => {
		getDataInfo();
    });

    return (
        <div>
            {!isEditing && <p>{dataInfo["about"]}</p>}
            {!isEditing &&
                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={editAboutSection}>Edit</Button>
                </div>
            }

            {isEditing && 
                <h5><strong>Edit About Section</strong></h5> &&
                
                <div className='formInputContainer'>
                    <input 
                        className='formTextInput'
                        type='text'
                        value={updateValue}
                        name='aboutInfoText'
                        onChange={(e) => setUpdateValue(e.target.value)}
                        required
                    />
                </div> &&

                <div className='formBtnContainer'>
                    <Button className='btn btn-secondary formBtn' onClick={updateAboutSection}>Submit</Button>
                </div>
            }
        </div>
    );
}

export default AboutSection;
