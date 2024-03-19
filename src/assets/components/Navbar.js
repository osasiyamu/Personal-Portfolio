import mainLogo from '../images/mainLogo.png';
import homeIcon from '../images/homeIcon.png';
import searchIcon from '../images/searchIcon.png';
import jobIcon from '../images/jobIcon.png';
import myPortfolioIcon from '../images/myPortfolioIcon.png';

import React from 'react';
import { isAuthenticated, logout } from '../../Authentication'; // Adjust the import path as needed

const Navbar = () => {
  // This function will handle the logout process
  const handleLogout = () => {
    logout(); // Clear the authentication status
    window.location.href = '/'; // Redirect to the home page or login page as desired
  };
    return (
        <div className='navbar'>
            <img id="mainlogo" src={mainLogo} alt="logo" />
            <div className="logo"></div>

            <a href="/" className="icons">
                <img src={homeIcon} alt="homeIcon" />
                Home
            </a>
            <a href="/search" className="icons">
                <img src={searchIcon} alt="searchIcon" />
                Search
            </a>
            <a href="/jobs" className="icons">
                <img src={jobIcon} alt="jobIcon" />
                Jobs
            </a>
            <a href="/myportfolio" className="icons">
                <img src={myPortfolioIcon} alt="myPortfolioIcon" />
                My Portfolio
            </a>
            {isAuthenticated() ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <div>
          <a href="/login">Log In</a>
        </div>
      )}
        </div>
    );
}

export default Navbar;
