function profileImgContainerSetup() {
    const container = document.getElementById("profileImgContainer");

    const profile = document.createElement("img");
    profile.id = "profileImg";
    profile.src = getProfilePic();
    profile.alt = "Profile Image";

    const tempDiv1 = document.createElement("div");
    tempDiv1.appendChild(profile);

    const name = document.createElement("h1");
    name.innerHTML = getUserName();

    const occupation = document.createElement("h3");
    occupation.innerHTML = getUserOcupation();

    const tempDiv2 = document.createElement("div");
    tempDiv2.id = "userBio"
    tempDiv2.appendChild(name);
    tempDiv2.appendChild(occupation);
    
    container.appendChild(tempDiv1);
    container.appendChild(tempDiv2);
}

function getProfilePic() {
    // set the user's profile picture
    return "/images/connectImage.png"; // todo: get
}

function getUserName() {
    // set the user's name
    return "User Name"; // todo: get
}

function getUserOcupation() {
    // set the user's occupation
    return "User Occupation"; // todo: get
}

function sectionControlsSetup() {
    const container = document.getElementById("sectionControls");

    container.appendChild(createSectionButton("About"));
    container.appendChild(createSectionButton("Search"));
    container.appendChild(createSectionButton("Education"));
    container.appendChild(createSectionButton("Experience"));
    container.appendChild(createSectionButton("Licenses"));
    container.appendChild(createSectionButton("Project"));
    container.appendChild(createSectionButton("Skills"));
    container.appendChild(createSectionButton("Contact"));
}

function createSectionButton(name) {
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "getSectionContent('" + name + "')");
    buttonElement.className = "btn btn-primary";
    buttonElement.id = "ctrlBtn";
    buttonElement.textContent = name;
    return buttonElement;
}

function getSectionContent(name) {
    const container = document.getElementById("sectionContent");
    const contentDiv = document.createElement("div");

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
    editButtonDiv.id = "editBtnContainer";
    editButtonDiv.appendChild(createEditButton(name));

    container.innerHTML = "";
    container.appendChild(contentDiv);
    container.appendChild(editButtonDiv);
}

function createEditButton(section) {
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "editSection('" + section + "')");
    buttonElement.className = "btn btn-Secondary";
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
