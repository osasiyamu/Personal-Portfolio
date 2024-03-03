function toggleJobDescription() {
    console.log("clicked")
    const jobDescription = document.getElementById('jobDescription');
    jobDescription.style.display = (jobDescription.style.display === 'none' || jobDescription.style.display === '') ? 'block' : 'none';
}

const jobList = document.querySelectorAll('.job');
jobList.forEach(job => {
    job.addEventListener('click', function() {
        const title = this.querySelector('h4').innerText;
        const description = this.getAttribute('data-description');
        const jobDescriptionContent = document.getElementById('jobDescriptionContent');
        jobDescriptionContent.innerHTML = `<h4>${title}</h4>
        <p>${description}</p>
        <div class="additional-panels">
            <div class="apply-panel">
                <p>Job Title: ${title}</p>
                <button onclick="applyForJob('${title}')">Apply</button>
                <button onclick="saveJob('${title}')">&#128278; Save Job</button>
            </div>
            <div class="description-panel">Panel 2</div>
        </div>`;
        toggleJobDescription();
    })
});

function applyForJob(title) {
    // Add your logic for applying for the job here
    alert(`Applying for ${title}`)
}

function saveJob(title) {
    // Add your logic for saving the job here
    alert(`Saving ${title}`)
}
