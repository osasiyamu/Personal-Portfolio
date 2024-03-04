import '../assets/css/search.css';
import { useEffect, useState } from 'react';
import personIcon from '../assets/images/personIcon.jpeg';

// Dummy data for demonstration purposes
const userData = [
    { name: 'Kareem Abdo', role: 'Software Engineering', specialty: 'Front-End' },
    { name: 'Ese Iyamu', role: 'Software Engineering', specialty: 'Front-End' },
    { name: 'Oyindamola Taiwo-Olupeka', role: 'Software Engineering', specialty: 'Back-End' },
    { name: 'Osamudiamen Nwoko', role: 'Software Engineering', specialty: 'Full-Stack' },
    { name: 'Osas Iyamu', role: 'Software Engineering', specialty: 'Back-End' },
    // Add more user objects as needed
];

const Search = () => {
    useEffect(() => {
        document.title = "Search";
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState(userData);

    useEffect(() => {
        const results = userData.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(results);
    }, [searchQuery]);

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
                    <div key={index} class="user">
                        <img src={personIcon} alt="" />
                        <div class="info">
                            <p>{user.name}</p>
                            <p>{user.role}</p>
                            <p>{user.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;