function profileImgContainerSetup() {
    const container = document.getElementById("profileImgContainer");

    const profile = document.createElement("img");
    profile.id = "prifileImg";
    profile.src = "/images/connectImage.png"; // todo: get user's image
    profile.alt = "Profile Image";
    profile.style.height = "auto";
    profile.style.width = "200px";

    const tempDiv1 = document.createElement("div");
    tempDiv1.appendChild(profile);

    const name = document.createElement("h1");
    name.innerHTML = "User Name"; // todo: get user's name

    const occupation = document.createElement("h3");
    occupation.innerHTML = "User Occupation"; // todo: get user's occupation

    const tempDiv2 = document.createElement("div");
    tempDiv2.appendChild(name);
    tempDiv2.appendChild(occupation);
    
    container.appendChild(tempDiv1);
    container.appendChild(tempDiv2);
}

function sectionControlsSetup() {
    const container = document.getElementById("sectionControls");

    container.appendChild(createButton("About"));
    container.appendChild(createButton("Search"));
    container.appendChild(createButton("Education"));
    container.appendChild(createButton("Experience"));
    container.appendChild(createButton("Licenses"));
    container.appendChild(createButton("Project"));
    container.appendChild(createButton("Skills"));
    container.appendChild(createButton("Contact"));
}

function getSectionContent(name) {
    const container = document.getElementById("sectionContent");
    const contentDiv = document.createElement("div");
    // You can customize this logic to handle different names
    if (name === "About") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Search") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Education") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Experience") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Licenses") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Project") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Skills") {
        contentDiv.innerHTML = "Content for " + name;
    } else if (name === "Contact") {
        contentDiv.innerHTML = "Content for " + name;
    }

    const editButtonDiv = document.createElement("div");
    editButtonDiv.setAttribute("margin-top", "10px");
    editButtonDiv.appendChild(createSectionEditButton(name));

    container.appendChild(contentDiv);
    container.appendChild(editButtonDiv);
}

function createButton(name) {
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "getSectionContent('" + name + "')");
    buttonElement.setAttribute("class", "btn btn-primary")
    buttonElement.textContent = name;
    return buttonElement;
}

function createSectionEditButton(section) {
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "getSectionContent('" + section + "')");
    buttonElement.setAttribute("class", "btn btn-Secondary")
    buttonElement.textContent = "Edit";
    return buttonElement;
}

function editSection(sectionName) {
    // return the edit form for the specified section for the user
}

window.onload = function() {
    profileImgContainerSetup();
    sectionControlsSetup();
    getSectionContent("About");
}
