import { Button } from 'react-bootstrap';
import { useState } from 'react';

const EduItem = ({dataInfo}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [updateValue, setUpdateValue] = useState(dataInfo);

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
        return formattedDate;  
    };

    const editEducation = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const updateEducation = () => {
        fetch(`http://localhost:5555/myportfolio/education/${dataInfo["educationid"]}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                institution: updateValue["institution"],
                degree: updateValue["degree"],
                fieldofstudy: updateValue["fieldofstudy"],
                start_date: updateValue["startdate"],
                end_date: updateValue["enddate"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    return (
        <div className='mb-4'>
            {!isEditing &&
                <div>
                    <div className='formBtnContainer' style={{'float': 'right'}}>
                        <Button className='btn btn-secondary formBtn' onClick={editEducation}>Edit</Button>
                    </div>
                    <div>
                        <h2>{dataInfo["institution"]}</h2>
                        <h4>{dataInfo["degree"]}{dataInfo["fieldofstudy"] ? ": " + dataInfo["fieldofstudy"] : ""}</h4>
                        <p>{convertDate(dataInfo["startdate"])} to {dataInfo["enddate"] ? convertDate(dataInfo["enddate"]) : "Present"}</p>
                    </div>
                </div>
            }
            {isEditing &&
                <div>
                    <h6><strong>Editting education...</strong></h6>

                    <p><strong>Institution name:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        value={updateValue["institution"]}
                        name='aboutInfoText'
                        onChange={(e) => (updateValue["institution"] = e.target.value)}
                        required
                    /></p>

                    <p><strong>Degree:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        value={updateValue["degree"]}
                        name='aboutInfoText'
                        onChange={(e) => (updateValue["degree"] = e.target.value)}
                        required
                    /></p>

                    <p><strong>Field of Study:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        value={updateValue["fieldofstudy"]}
                        name='aboutInfoText'
                        onChange={(e) => (updateValue["fieldofstudy"] = e.target.value)}
                    /></p>

                    <p><strong>Start Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        value={(new Date(updateValue["startdate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        }))}
                        name='aboutInfoText'
                        onChange={(e) => (updateValue["startdate"] = e.target.value)}
                        required
                    /></p>

                    <p><strong>End Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        value={updateValue["enddate"] ? (new Date(updateValue["enddate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })) : ""}
                        name='aboutInfoText'
                        onChange={(e) => (updateValue["enddate"] = e.target.value)}
                    /></p>

                    <div className='formBtnContainer'>
                        
                    </div>

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn'>Delete</Button>
                        <Button className='btn btn-secondary formBtn' onClick={updateEducation}>Submit</Button>
                    </div>
                </div>
             }
        </div>
    );
}

export default EduItem;
