import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const ContactSection = ({profileId}) => {

    const [contactInfo, setContactInfo] = useState([]);
    const [websiteInfo, setWebsiteInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [contactUpdate, setContactUpdate] = useState([]);
    var [websiteUpdate, setWebsiteUpdate] = useState([]);

    const countrycodes = ["1", "1-242", "1-246", "1-264", "1-268", "1-284", "1-340", "1-345", "1-441", "1-473", "1-649", "1-664", "1-670", "1-671", "1-684", "1-758", "1-767", "1-784", "1-787", "1-809", "1-829", "1-868", "1-869", "1-876", "1-939", "20", "212", "213", "216", "218", "220", "221", "222", "223", "224", "225", "226", "227", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "27", "290", "291", "297", "298", "299", "30", "31", "32", "33", "34", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "36", "370", "371", "372", "373", "374", "375", "376", "377", "378", "380", "385", "386", "387", "389", "39", "40", "41", "418", "420", "421", "423", "43", "44", "45", "46", "47", "48", "49", "500", "501", "502", "503", "504", "505", "506", "507", "508", "509", "51", "52", "53", "54", "55", "56", "57", "58", "590", "591", "592", "593", "594", "595", "596", "597", "598", "599", "60", "61", "62", "63", "64", "65", "66", "670", "672", "673", "674", "675", "676", "677", "678", "679", "680", "681", "682", "683", "685", "686", "687", "688", "689", "690", "691", "692", "7", "81", "82", "84", "850", "852", "853", "855", "856", "86", "880", "886", "90", "91", "92", "93", "94", "95", "960", "961", "962", "963", "964", "965", "966", "967", "968", "970", "971", "972", "973", "974", "975", "976", "977", "98", "992", "993", "994", "995", "996", "998"]

    const getContactInfo = () => {
        fetch(`http://localhost:5555/myportfolio/contact/${profileId}`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setContactInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const getWebsiteInfo = () => {
        fetch(`http://localhost:5555/myportfolio/website/${profileId}`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setWebsiteInfo(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const updateContactDetails = () => {
        fetch(`http://localhost:5555/myportfolio/contact/${profileId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: contactUpdate["email"],
                countrycode: contactUpdate["countrycode"],
                phonenumber: contactUpdate["phonenumber"],
                extension: contactUpdate["extension"]
            })
        })
        .then(window.location.reload())
		.catch(error => {
			console.error("Error fetching data: ", error);
		});

        websiteUpdate.forEach(item => {
            fetch(`http://localhost:5555/myportfolio/website/${item["websiteid"]}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    description: item["description"],
                    url: item["url"]
                })
            })
            .then(window.location.reload())
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
        });
    };

    const editContact = () => {
        setContactUpdate(contactInfo);
        setWebsiteUpdate(websiteInfo);
        setIsEditing(true);
    };

    useEffect(() => {
		getContactInfo();
        getWebsiteInfo();
    }, []);

    return (
        <div>
            {!isEditing &&
                <div>
                    <h5><strong>Email:</strong> {contactInfo["email"]}</h5>
                    <h5><strong>Phone Number:</strong> +{contactInfo["countrycode"]}{contactInfo["phonenumber"]}</h5>

                    {websiteInfo.map((row, index) => (
                        row["description"] && row["url"] && <h5 key={index}><strong>{row["description"]}:</strong> {row["url"]}</h5>
                    ))}

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={editContact}>Edit</Button>
                    </div>
                </div>
            }

            {isEditing &&
                <div>
                    <p><strong>Email:</strong>
                    <input
                        className='formTextInput'
                        type='email'
                        defaultValue={contactUpdate["email"]}
                        onChange={(e) => contactUpdate["email"] = e.target.value}
                    /></p>

                    <p><strong>Phone Number: </strong>
                    <select defaultValue={contactUpdate["countrycode"]} onChange={(e) => {contactUpdate["countrycode"] = e.target.value}}>
                        {countrycodes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <input
                        className='formTextInput'
                        type='text'
                        defaultValue={contactUpdate["phonenumber"]}
                        onChange={(e) => contactUpdate["phonenumber"] = e.target.value}
                    /></p>

                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Website Name</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {websiteInfo.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className='formTextInput'
                                                type='text'
                                                defaultValue={row["description"]}
                                                onChange={(e) => row["description"] = e.target.value}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className='formTextInput'
                                                type='text'
                                                defaultValue={row["url"]}
                                                onChange={(e) => row["url"] = e.target.value}
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='formBtnContainer'>
                        <Button className='btn btn-secondary formBtn' onClick={updateContactDetails}>Submit</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ContactSection;
