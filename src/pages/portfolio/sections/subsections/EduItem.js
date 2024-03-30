import { Button } from 'react-bootstrap';
import { useState } from 'react';

const EduItem = ({dataInfo, add=false}) => {

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

    const editEducation = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const addEducation = () => {
        fetch(`http://localhost:5555/myportfolio/education/add`, {
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

    const updateEducation = () => {
        fetch(`http://localhost:5555/myportfolio/education`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                education_id: dataInfo["educationid"],
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

    const deleteEducation = () => {
        fetch(`http://localhost:5555/myportfolio/education`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                education_id: dataInfo["educationid"]
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
                        <Button className='btn btn-secondary formBtn' onClick={editEducation}>Edit</Button>
                    </div>
                    <div>
                        <h2><strong>{dataInfo["institution"]}</strong></h2>
                        <h4>{dataInfo["degree"]}{dataInfo["fieldofstudy"] ? ": " + dataInfo["fieldofstudy"] : ""}</h4>
                        <p>{convertDate(dataInfo["startdate"])} to {dataInfo["enddate"] ? convertDate(dataInfo["enddate"]) : "Present"}</p>
                    </div>
                </div>
            }
            {isEditing &&
                <div>
                    <p><strong>Institution name:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["institution"]}
                        onChange={(e) => updateValue["institution"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Degree:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["degree"]}
                        onChange={(e) => updateValue["degree"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Field of Study:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["fieldofstudy"]}
                        onChange={(e) => updateValue["fieldofstudy"] = e.target.value}
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
                        name='aboutInfoText'
                        onChange={(e) => updateValue["startdate"] = e.target.value}
                        required
                    /></p>

                    <p><strong>End Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        defaultValue={updateValue["enddate"] ? (new Date(updateValue["enddate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })) : ""}
                        onChange={(e) => updateValue["enddate"] = (new Date(e.target.value).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }))}
                    /></p>

                    <div className='formBtnContainer'>
                        {add &&
                            <Button className='btn btn-secondary formBtn' onClick={() => window.location.reload()}>Cancel</Button>
                        }
                        {!add &&
                            <Button className='btn btn-secondary formBtn' onClick={deleteEducation}>Delete</Button>
                        }
                        <Button className='btn btn-secondary formBtn' onClick={
                            add ? addEducation : updateEducation
                            }>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default EduItem;
