import mainLogo from '../images/mainLogo.png';
import homeIcon from '../images/homeIcon.png';
import searchIcon from '../images/searchIcon.png';
import jobIcon from '../images/jobIcon.png';
import myPortfolioIcon from '../images/myPortfolioIcon.png';

const Navbar = () => {
    return (
        <div className='navbar'>
            <img id="mainlogo" src={mainLogo} alt="logo" />
            <div className="logo"></div>

            <a href="/" className="icons">
                <img src={homeIcon} alt="homeIcon" />
                Home
            </a>
            <a href="/searchPage.html" className="icons">
                <img src={searchIcon} alt="searchIcon" />
                Search
            </a>
            <a href="/jobs.html" className="icons">
                <img src={jobIcon} alt="jobIcon" />
                Jobs
            </a>
            <a href="/myportfolio" className="icons">
                <img src={myPortfolioIcon} alt="myPortfolioIcon" />
                My Portfolio
            </a>
            <a href="/join.html" className="icons"> Sign Up/In</a>
        </div>
    );
}

export default Navbar;
