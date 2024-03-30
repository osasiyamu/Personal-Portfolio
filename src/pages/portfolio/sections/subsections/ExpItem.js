import { Button } from 'react-bootstrap';
import { useState } from 'react';

const ExpItem = ({dataInfo, add=false}) => {
    const [isEditing, setIsEditing] = useState(add);
    const [updateValue, setUpdateValue] = useState(dataInfo);

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long'
        });
        return formattedDate;  
    };

    const editExperience = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const addExperience = () => {
        fetch(`http://localhost:5555/myportfolio/experience/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                companyName: updateValue["company"],
                positionTitle: updateValue["position"],
                description: updateValue["details"],
                startDate: updateValue["startdate"],
                endDate: updateValue["enddate"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const updateExperience = () => {
        fetch(`http://localhost:5555/myportfolio/experience`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                experience_id: dataInfo["experienceid"],
                companyName: updateValue["company"],
                positionTitle: updateValue["position"],
                description: updateValue["details"],
                startDate: updateValue["startdate"],
                endDate: updateValue["enddate"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const deleteExperience = () => {
        fetch(`http://localhost:5555/myportfolio/experience`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                experience_id: dataInfo["experienceid"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };
    
    return (
        <div className='mb-4 subItem'>
            {!isEditing &&
                <div>
                    <div className='formBtnContainer' style={{'float': 'right'}}>
                        <Button className='btn btn-secondary formBtn' onClick={editExperience}>Edit</Button>
                    </div>
                    <div>
                        <h2><strong>Company Name: {dataInfo["company"]}</strong></h2>
                        <h4>Position Title: {dataInfo["position"]}</h4>
                        <h4>Description: {dataInfo["details"]}</h4>
                        <p>Validity Date: {convertDate(dataInfo["startdate"])} to {dataInfo["enddate"] ? convertDate(dataInfo["enddate"]) : "Present"}</p>
                    </div>
                </div>
            }
            {isEditing &&
                <div>
                    <p><strong>Company Name:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["company"]}
                        onChange={(e) => updateValue["company"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Position Title:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["position"]}
                        onChange={(e) => updateValue["position"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Description:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["details"]}
                        onChange={(e) => updateValue["details"] = e.target.value}
                    /></p>

                    <p><strong>Start Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        defaultValue={new Date(updateValue["startdate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}
                        onChange={(e) => updateValue["startdate"] = e.target.value}
                    /></p>

                    <p><strong>End Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        defaultValue={new Date(updateValue["enddate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}
                        name='aboutInfoText'
                        onChange={(e) => updateValue["enddate"] = e.target.value}
                        required
                    /></p>

                    <div className='formBtnContainer'>
                        {add &&
                            <Button className='btn btn-secondary formBtn' onClick={() => window.location.reload()}>Cancel</Button>
                        }
                        {!add &&
                            <Button className='btn btn-secondary formBtn' onClick={deleteExperience}>Delete</Button>
                        }
                        <Button className='btn btn-secondary formBtn' onClick={
                            add ? addExperience : updateExperience
                            }>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ExpItem;