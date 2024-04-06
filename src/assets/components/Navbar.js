import mainLogo from '../images/mainLogo.png';
import homeIcon from '../images/homeIcon.png';
import searchIcon from '../images/searchIcon.png';
import jobIcon from '../images/jobIcon.png';
import myPortfolioIcon from '../images/myPortfolioIcon.png';
import "../css/main.css";

const Navbar = () => {

    const logout = () => {
        localStorage.setItem("loggedIn", false);
        fetch(`http://localhost:5555/api/signout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    return (
        <div className='navbars'>
            <img id="mainlogo" src={mainLogo} alt="logo" />
            <div className="logo"></div>

            <div className='navigation'>
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

                {(localStorage.getItem("loggedIn") === "true") && <a href="" onClick={logout} className="icons">Logout</a>}
                {(localStorage.getItem("loggedIn") !== "true") && <a href="/join" className="icons">Sign Up/In</a>}

            </div>
        </div>
    );
}

export default Navbar;
