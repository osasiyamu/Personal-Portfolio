function toggleJobDescription() {
    console.log("clicked")
    const jobDescription = document.getElementById('jobDescription');
    jobDescription.style.display = (jobDescription.style.display === 'none' || jobDescription.style.display === '') ? 'block' : 'none';
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
            const jobDescriptionContent = document.getElementById('jobDescriptionContent');
            jobDescriptionContent.innerHTML = `<h4>${title}</h4>
                <p>${description}</p>
                <div class="additional-panels">
                    <div class="apply-panel">
                        <p>${title}</p>
                        <button class="apply-button" onclick="applyForJob('${title}')">Apply</button>
                        <button class="save-button" onclick="saveJob('${title}')">Save</button>
                    </div>
                    <div class="description-panel">Panel 2</div>
                </div>`;
            toggleJobDescription();
        });
    });
}

export {toggleJobDescription, applyForJob, saveJob, attachJobClickListeners};
