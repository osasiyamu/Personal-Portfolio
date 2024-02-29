import '../../assets/css/jobs.css';
import toggleJobDescription from './scripts';

import { useEffect } from 'react';

const Jobs = () => {
    useEffect(() => {
        document.title = "Jobs"
    }, []);

    return (
        <div>
            <div class="filter-bar">
                {/* Filter bar above the job list */}
                <input type="text" placeholder="Filter jobs" />
            </div>

            <div class="search-bar">
                {/* Search bar at the top right */}
                <input type="text" placeholder="Search jobs" />
            </div>

            <div class="job-list">
                {/* Panels for job titles - Replace this with dynamic content */}
                <div class="job" data-description="Description of Job 1">
                    <img src="company_logo_1.jpg" alt="Company Logo 1" />
                    <h3>Company Name 1</h3>
                    <h4>Job Title 1</h4>
                    <p>Location: City, Country</p>
                    <p>Salary: $60,000 - $80,000</p>
                </div>

                <div class="job" data-description="Description of Job 2">
                    <img src="company_logo_2.jpg" alt="Company Logo 2" />
                    <h3>Company Name 2</h3>
                    <h4>Job Title 2</h4>
                    <p>Location: City, Country</p>
                    <p>Salary: $70,000 - $90,000</p>
                </div>

                <div class="job" data-description="Description of Job 3">
                    <img src="company_logo_3jpg" alt="Company Logo 3" />
                    <h3>Company Name 3</h3>
                    <h4>Job Title 3</h4>
                    <p>Location: City, Country</p>
                    <p>Salary: $70,000 - $90,000</p>
                </div>

                <div class="job" data-description="Description of Job 4">
                    <img src="company_logo_4.jpg" alt="Company Logo 4" />
                    <h3>Company Name 4</h3>
                    <h4>Job Title 4</h4>
                    <p>Location: City, Country</p>
                    <p>Salary: $70,000 - $90,000</p>
                </div>

                <div class="job" data-description="Description of Job 5">
                    <img src="company_logo_5.jpg" alt="Company Logo 5" />
                    <h3>Company Name 5</h3>
                    <h4>Job Title 5</h4>
                    <p>Location: City, Country</p>
                    <p>Salary: $70,000 - $90,000</p>
                </div>
                {/* Add more job panels here */}
            </div>

            <div class="job-display-panel" id="jobDescription">
                <span class="close-button" onclick={toggleJobDescription}>x</span>
                <div id="jobDescriptionContent">
                    <h4>Job Description</h4>
                    <p>Job description content will appear here.</p>
                    <div class="additional-panels">
                        <div class="apply-panel">Panel 1</div>
                        <div class="description-panel">Panel 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
