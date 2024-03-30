import { Button } from 'react-bootstrap';
import { useState } from 'react';

const ProjectItem = ({dataInfo, add=false}) => {

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

    const editProject = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const addProject = () => {
        fetch(`http://localhost:5555/myportfolio/projects/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_name: updateValue["projectname"],
                details: updateValue["details"],
                start_date: updateValue["startdate"],
                end_date: updateValue["enddate"],
                project_url: updateValue["projecturl"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const updateProject = () => {
        fetch(`http://localhost:5555/myportfolio/projects`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                project_id: dataInfo["projectid"],
                project_name: updateValue["projectname"],
                details: updateValue["details"],
                start_date: updateValue["startdate"],
                end_date: updateValue["enddate"],
                project_url: updateValue["projecturl"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const deleteProject = () => {
        fetch(`http://localhost:5555/myportfolio/projects`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                project_id: dataInfo["projectid"]
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
                        <Button className='btn btn-secondary formBtn' onClick={editProject}>Edit</Button>
                    </div>
                    <div>
                        <h2><strong>{dataInfo["projectname"]}</strong></h2>
                        <p>{convertDate(dataInfo["startdate"])} to {dataInfo["enddate"] ? convertDate(dataInfo["enddate"]) : "Present"}</p>
                        <p>{dataInfo["details"]}</p>
                        <p>{dataInfo["projecturl"] ? <strong>Link:</strong> : null} {dataInfo["projecturl"]}</p>
                    </div>
                </div>
            }
            {isEditing &&
                <div>
                    <p><strong>Project Name:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["projectname"]}
                        onChange={(e) => updateValue["projectname"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Details:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["details"]}
                        onChange={(e) => updateValue["details"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Project URL:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["projecturl"]}
                        onChange={(e) => updateValue["projecturl"] = e.target.value}
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
                            <Button className='btn btn-secondary formBtn' onClick={deleteProject}>Delete</Button>
                        }
                        <Button className='btn btn-secondary formBtn' onClick={
                            add ? addProject : updateProject
                            }>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProjectItem;
