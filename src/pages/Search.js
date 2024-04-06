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
    const [filterType, setFilterType] = useState('people'); // New state for filter type

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
        localStorage.setItem('searchId', user["userid"]);
        redirect('/userprofile');
    };

    useEffect(() => {
        getProfileInfos();
    }, []);

    useEffect(() => {
        if (result.length > 0) {
            const filtered = result.filter(user => {
                const query = searchQuery.toLowerCase();
                if (filterType === 'people') {
                    return user.firstname.toLowerCase().includes(query) || user.lastname.toLowerCase().includes(query);
                } else if (filterType === 'occupation') {
                    return user.occupation.toLowerCase().includes(query);
                }
                return false; // Ensure all paths return a value
            });
            setFilteredResults(filtered);
        }
    }, [searchQuery, result, filterType]);

    return (
        <div className="searchPage">
            <div className="search">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{ flex: 1 }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filterComponents">
    <label htmlFor="filterBy">Filter By: </label>
    <button
        id="filterPeople"
        onClick={() => setFilterType('people')}
        className={filterType === 'people' ? 'activeFilter' : ''}
    >
        People
    </button>
    <button
        id="filterOccupation"
        onClick={() => setFilterType('occupation')}
        className={filterType === 'occupation' ? 'activeFilter' : ''}
    >
        Occupation
    </button>
                </div>
            </div>

            <div className="searchResults">
                {filteredResults.map((user, index) => (
                    <div key={index} className="user" onClick={() => getUserProfile(user)}>
                        <img src={personIcon} alt="" />
                        <div className="info">
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
