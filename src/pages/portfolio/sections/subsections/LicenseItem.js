import { Button } from 'react-bootstrap';
import { useState } from 'react';

const LicenseItem = ({dataInfo, add=false}) => {

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

    const editLicense = () => {
        setUpdateValue(dataInfo);
        setIsEditing(true);
    };

    const addLicense = () => {
        fetch(`http://localhost:5555/myportfolio/licenses/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile_id: dataInfo["profileId"],
                licenseName: updateValue["licensename"],
                awardingInsitution: updateValue["issuedby"],
                awardDate: updateValue["issuedate"],
                expirationDate: updateValue["expirydate"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const updateLicense = () => {
        fetch(`http://localhost:5555/myportfolio/licenses/${dataInfo["licenseid"]}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                licenseName: updateValue["licensename"],
                awardingInsitution: updateValue["issuedby"],
                issueDate: updateValue["issuedate"],
                expirationDate: updateValue["expirydate"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const deleteLicense= () => {
        fetch(`http://localhost:5555/myportfolio/licenses/${dataInfo["licenseid"]}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };
    //Come back to this 
    return (
        <div className='mb-4 licenceItem'>
            {!isEditing &&
                <div>
                    <div className='formBtnContainer' style={{'float': 'right'}}>
                        <Button className='btn btn-secondary formBtn' onClick={editLicense}>Edit</Button>
                    </div>
                    <div>
                        <h2><strong>{dataInfo["licensename"]}</strong></h2>
                        <h4>{dataInfo["issuedby"]}</h4>
                        <p>{convertDate(dataInfo["issuedate"])} to {dataInfo["expirydate"] ? convertDate(dataInfo["expirydate"]) : "Present"}</p>
                    </div>
                </div>
            }
            {isEditing &&
                <div>
                    <p><strong>License Name:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["licensename"]}
                        onChange={(e) => updateValue["licensename"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Awarding Institution:</strong>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={updateValue["issuedby"]}
                        onChange={(e) => updateValue["issuedby"] = e.target.value}
                        required
                    /></p>

                    <p><strong>Issue Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        defaultValue={updateValue["issuedate"]}
                        onChange={(e) => updateValue["issuedate"] = e.target.value}
                    /></p>

                    <p><strong>Expiration Date:</strong>
                    <input
                        className='formTextInput'
                        type='date'
                        defaultValue={new Date(updateValue["expirydate"]).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}
                        name='aboutInfoText'
                        onChange={(e) => updateValue["expirydate"] = e.target.value}
                        required
                    /></p>

                    <div className='formBtnContainer'>
                        {add &&
                            <Button className='btn btn-secondary formBtn' onClick={() => window.location.reload()}>Cancel</Button>
                        }
                        {!add &&
                            <Button className='btn btn-secondary formBtn' onClick={deleteLicense}>Delete</Button>
                        }
                        <Button className='btn btn-secondary formBtn' onClick={
                            add ? addLicense : updateLicense
                            }>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default LicenseItem;
