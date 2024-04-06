import '../../assets/css/jobs.css';
import MicrosoftIcon from '../../assets/images/icon1.png';
import IBMLogo from '../../assets/images/IBM-Logo.jpeg';
import AppleLogo from '../../assets/images/Apple_logo.png';
import TeslaLogo from '../../assets/images/Tesla-Logo.png';
import CiscoLogo from '../../assets/images/Cisco-Logo.png';
import { useEffect } from 'react';
import { toggleJobDescription, applyForJob, saveJob, attachJobClickListeners } from './scripts';


const Jobs = () => {
    useEffect(() => {
        document.title = "Jobs"
        attachJobClickListeners();
    }, []);

    return (
        <div>
            <div className="search-bar">
                <input type="text" placeholder="Search jobs" />
            </div>

            <div className='jobs'>
            <div className="job-list">
                <div className="job" data-description="">
                    <img src={MicrosoftIcon} alt="Microsoft Company Logo" />
                    <h3>Microsoft</h3>
                    <h4><strong>Software Engineer</strong></h4>
                    <p>Toronto, ON</p>
                    <p>$160,000 - $200,000</p>
                </div>

                <div className="job" data-description="">
                    <img src={IBMLogo} alt="IBM Company Logo" />
                    <h3>IBM</h3>
                    <h4><strong>Cloud Engineer</strong></h4>
                    <p>Markham, ON</p>
                    <p>$250,000 - $300,000</p>
                </div>

                <div className="job" data-description="">
                    <img src={AppleLogo} alt="Apple Company Logo" />
                    <h3>Apple</h3>
                    <h4><strong>Web Developer</strong></h4>
                    <p>Montreal, QC</p>
                    <p>$190,000 - $220,000</p>
                </div>

                <div className="job" data-description="">
                    <img src={TeslaLogo} alt="Tesla Company Logo" />
                    <h3>Tesla</h3>
                    <h4><strong>Automation Engineer</strong></h4>
                    <p>Ottawa, ON</p>
                    <p>$170,000 - $250,000</p>
                </div>

                <div className="job" data-description="">
                    <img src={CiscoLogo} alt="Cisco Company Logo" />
                    <h3>Cisco</h3>
                    <h4><strong>Product Manager</strong></h4>
                    <p>Vancouver, BC</p>
                    <p>$70,000 - $90,000</p>
                </div>
            </div>

            <div id="jobDescription">
                <span className="close-button" onClick={toggleJobDescription}>x</span>
                <div id="jobDescriptionContent">
                    {/* <h4>Job Description</h4>
                    <p>Job description content will appear here.</p>
                    <div className="additional-panels">
                        <div className="apply-panel">Panel 1</div>
                        <div className="description-panel">Panel 2</div>
                    </div> */}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Jobs;
