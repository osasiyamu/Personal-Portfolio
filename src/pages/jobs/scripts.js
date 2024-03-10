function toggleJobDescription() {
    const jobDescription = document.getElementById('jobDescription');
    jobDescription.style.display = (jobDescription.style.display == 'none') ? 'block' : 'none';
}

function applyForJob(title) {
    alert(`Applying for ${title}`)
}

function saveJob(title) {
    alert(`Saving ${title}`)
}

function attachJobClickListeners() {
    const jobList = document.querySelectorAll('.job');
    jobList.forEach(job => {
        const titleElement = job.querySelector('h4');
        titleElement.style.cursor = 'pointer';
        titleElement.addEventListener('click', function () {
            const title = titleElement.innerText;
            const description = job.getAttribute('data-description');
            const company = job.querySelector('h3').innerText;
            const location = job.querySelectorAll('p')[0].innerText;
            const salary = job.querySelectorAll('p')[1].innerText;
            const jobDescriptionContent = document.getElementById('jobDescriptionContent');
            jobDescriptionContent.innerHTML = `<h4>${title}</h4>
                <div class="additional-panels">
                    <div class="apply-panel">
                    <p><strong></strong> ${company}</p>
                    <p><strong></strong> ${location}</p>
                    <p><strong></strong> ${salary}</p>
                        <button class="apply-button" onclick="applyForJob('${title}')">Apply</button>
                        <button class="save-button" onclick="saveJob('${title}')">Save</button>
                    </div>
                    <div class="description-panel">${description}</div>
                </div>`;
            toggleJobDescription();
        });
    });
}

export {toggleJobDescription, applyForJob, saveJob, attachJobClickListeners};
