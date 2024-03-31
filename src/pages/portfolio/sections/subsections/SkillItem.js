import { Button } from 'react-bootstrap';
import { useState } from 'react';

const SkillItem = ({dataInfo, add=false}) => {

    const [isEditing, setIsEditing] = useState(add);
    const [updateValue, setUpdateValue] = useState(dataInfo);

    const proficiency_levels = ["Beginner", "Intermediate", "Expert", "Professional"]

    const editSkill = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const addSkill = () => {
        fetch(`http://localhost:5555/myportfolio/skills/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skill_name: updateValue["skillname"],
                proficiency_level: updateValue["proficiencylevel"],
                rank: 1
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const updateSkill = () => {
        fetch(`http://localhost:5555/myportfolio/skills`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skill_id: dataInfo["skillid"],
                skill_name: updateValue["skillname"],
                proficiency_level: updateValue["proficiencylevel"],
                rank: 1
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const deleteSkill = () => {
        fetch(`http://localhost:5555/myportfolio/skills`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skill_id: dataInfo["skill_id"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    return (
        <div className='mb-3'>
            {!isEditing &&
                <div>
                    <div className='formBtnContainer' style={{'float': 'right'}}>
                        <Button className='btn btn-secondary formBtn' onClick={editSkill}>Edit</Button>
                    </div>
                    <div>
                        <h5><strong>{dataInfo["skillname"]}: </strong> {dataInfo["proficiencylevel"]}</h5>
                    </div>
                </div>
            }

            {isEditing &&
                <div>
                    <div className='table-wrapper'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            className='formTextInput'
                                            type='text'
                                            defaultValue={updateValue["skillname"]}
                                            onChange={(e) => updateValue["skillname"] = e.target.value}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <select defaultValue={updateValue["proficiencylevel"]} onChange={(e) => {updateValue["proficiencylevel"] = e.target.value}}>
                                            {proficiency_levels.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='formBtnContainer'>
                        {add &&
                            <Button className='btn btn-secondary formBtn' onClick={() => window.location.reload()}>Cancel</Button>
                        }
                        {!add &&
                            <Button className='btn btn-secondary formBtn' onClick={deleteSkill}>Delete</Button>
                        }
                        <Button className='btn btn-secondary formBtn' onClick={add ? addSkill : updateSkill}>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default SkillItem;
