import '../assets/css/search.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import personIcon from '../assets/images/personIcon.jpeg';


const Search = () => {
    useEffect(() => {
        document.title = "Search";
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [result, setResults] = useState([]);
    
    // const history = useHistory();
    const redirect = useNavigate();

    const getProfileInfos = () => {
        fetch(`http://localhost:5555/userprofiles`)
		.then(response => {
			if (!response.ok) {
			  	throw new Error('Network response was not ok');
			}
			return response.json();
		})
        .then(data => {
            setResults(data);
        })
		.catch(error => {
			console.error("Error fetching data: ", error);
		});
    };

    const getUserProfile = (user) => {
        console.log(user.firstname)
        console.log(user.lastname)
        redirect('/userprofile', { state: { userData: user } });
    }

    useEffect(() => {
		getProfileInfos();
    }, []);

    useEffect(() => {
        if (result.length > 0) {
            const filteredResults = result.filter(user =>
                user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.occupation.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(filteredResults);
        }
    }, [searchQuery, result]);

    return (
        <div>
            <div class="search">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{ flex: 1 }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div class="filterComponents">
                    <label htmlFor="filterBy">Filter By: </label>
                    <button id="people">People</button>
                    <button>Portfolios</button>
                    <button>Skills</button>
                </div>
            </div>

            <div class="searchResults">
                {filteredResults.map((user, index) => (
                    <div key={index} class="user" onClick={() => getUserProfile(user)}>
                        <img src={personIcon} alt="" />
                        <div class="info">
                            <p>{user.firstname} {user.lastname}</p>
                            <p>{user.occupation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;