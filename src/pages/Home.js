import '../assets/css/index.css';

import mainImage from '../assets/images/mainImage.webp';
import skillImage from '../assets/images/skillImage.webp';
import connectImage from '../assets/images/connectImage.png';

const Home = () => {
    return (
        <div>
            <div class="content">
                <h1>Your Portfolio, Your Way</h1>
                <div class="main-image">
                    <img src={mainImage} alt="" />
                </div>
                <p>Post your portfolio for others to view in a new innovative way</p>
                <a href="/myPortfolio.html" class="button-style">My Portfolio</a>

                <div class="icons-container">
                    <div class="icon-box">
                    <div class="icon">
                        <img src={skillImage} alt="" />
                    </div>
                    <p>Show off your skills</p>
                    </div>
                    <div class="icon-box">
                        <div class="icon">
                            <img src={connectImage} alt="" />
                        </div>
                        <p>Connect with people</p>
                    </div>
                </div>

                <div class="join-section">
                    <p>Join now and stand out from the rest</p>
                    <a href="/join.html" class="button-style">Join</a>
                </div>
            </div>

            <div class="contact">
                <button>Contact us</button>
            </div>
        </div>
    );
}

export default Home;
