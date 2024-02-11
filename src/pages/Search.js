import '../assets/css/search.css';

import { useEffect } from 'react';

import personIcon from '../assets/images/personIcon.jpeg';

const Search = () => {
    useEffect(() => {
        document.title = "Search"
    }, []);

    return (
        <div>
            <div>
                <div class="search">
                    <div>
                        <input type="text" placeholder="Search..." style={{flex: 1}} />
                    </div>
                    <div class="filterComponents">
                        <label for="filterBy">Filter By: </label>
                        {/* <a href="#nothing">Jobs</a>
                        <a href="#nothing">People</a>
                        <a href="#nothing">Skills</a> */}
                        <button>Jobs</button>
                        <button id="people">People</button>
                        <button>Skills</button>
                        {/* <i class="fa-regular fa-user"></i> */}
                        {/* <i class="fas fa-building">Organizations</i> */}
                    </div>
                </div>
            </div>

            <div class="searchResults">
                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Kareem Abdo</p>
                        <p>Software Engineering</p>
                        <p>Front-End</p>
                    </div>  
                </div>

                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Ese Iyamu</p>
                        <p>Software Engineering</p>
                        <p>Front-End</p>
                    </div>  
                </div>

                
                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Oyindamola Taiwo-Olupeka</p>
                        <p>Software Engineering</p>
                        <p>Back-End</p>
                    </div>  
                </div>
                
                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Osamudiamen Nwoko</p>
                        <p>Software Engineering</p>
                        <p>Full-Stack</p>
                    </div>  
                </div>
                
                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Osas Iyamu</p>
                        <p>Software Engineering</p>
                        <p>Back-End</p>
                    </div>  
                </div>

                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Osas Iyamu</p>
                        <p>Software Engineering</p>
                        <p>Front-End</p>
                    </div>  
                </div>

                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Osas Iyamu</p>
                        <p>Software Engineering</p>
                        <p>Front-End</p>
                    </div>  
                </div>

                <div class="user">
                    <img src={personIcon} alt="" />
                    <div class="info">
                        <p>Osas Iyamu</p>
                        <p>Software Engineering</p>
                        <p>Front-End</p>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Search;
