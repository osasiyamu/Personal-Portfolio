import '../assets/css/index.css';

import { useEffect } from 'react';

import mainImage from '../assets/images/mainImage.webp';
import skillImage from '../assets/images/skillImage.webp';
import connectImage from '../assets/images/connectImage.png';

const Home = () => {
    useEffect(() => {
        document.title = "SearchMeUp"
    }, []);

    return (
        <div>
            <div className="content">
                <h1>Your Portfolio, Your Way</h1>
                <div className="main-image">
                    <img src={mainImage} alt="" />
                </div>
                <p>Post your portfolio for others to view in a new innovative way</p>
                <a href="/myPortfolio" className="button-style">My Portfolio</a>
                <div className="icons-container">
                    <div className="icon-box">
                    <div className="icon">
                        <img src={skillImage} alt="" />
                    </div>
                    <p>Show off your skills</p>
                    </div>
                    <div className="icon-box">
                        <div className="icon">
                            <img src={connectImage} alt="" />
                        </div>
                        <p>Connect with people</p>
                    </div>
                </div>

                <div className="join-section">
                    <p>Join now and stand out from the rest</p>
                    <a href="/join" className="button-style">Join</a>
                </div>
            </div>

            <div className="contact">
                <a href="/Contact Us" className="button-style">Contact us</a>
            </div>
        </div>
    );
}

export default Home;
