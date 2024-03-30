import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const SkillSection = () => {

    const [skillInfo, setSkillInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [skillsUpdate, setSkillsUpdate] = useState([]);

    const proficiency_levels = ["Beginner", "Intermediate", "Expert", "Professional"]

    const getSkillInfo = () => {
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

    const updateSkillInfo = () => {
        skillInfo.forEach(item => {
            fetch(`http://localhost:5555/myportfolio/skills`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skill_id: item["skillid"],
                    skill_name: item["skillname"],
                    proficiency_level: item["proficiencylevel"]
                })
            })
            .then(window.location.reload())
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
        });
    };

    const editSkills = () => {
        setSkillsUpdate(skillInfo);
        setIsEditing(true);
    };

    useEffect(() => {
		getSkillInfo();
    }, []);

    return (
        <div className='subItem'>
            {!isEditing &&
                <div>
                    {skillInfo.map((row, index) => (
                        row["skillname"] && row["proficiencylevel"] && <h5 key={index}><strong>{row["skillname"]}:</strong> {row["proficiencylevel"]}</h5>
                    ))}

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={editSkills}>Edit</Button>
                    </div>
                </div>
            }

            {isEditing &&
                <div>
                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Skill Name</th>
                                    <th>Proficiency Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillsUpdate.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className='formTextInput'
                                                type='text'
                                                defaultValue={row["skillname"]}
                                                onChange={(e) => row["description"] = e.target.value}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <select defaultValue={row["proficiencylevel"]} onChange={(e) => {row["proficiencylevel"] = e.target.value}}>
                                                {proficiency_levels.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                                ))}
                                        </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={updateSkillInfo}>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default SkillSection;
