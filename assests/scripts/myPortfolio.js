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

    container.appendChild(createSectionButton("About"));
    container.appendChild(createSectionButton("Search"));
    container.appendChild(createSectionButton("Education"));
    container.appendChild(createSectionButton("Experience"));
    container.appendChild(createSectionButton("Licenses"));
    container.appendChild(createSectionButton("Project"));
    container.appendChild(createSectionButton("Skills"));
    container.appendChild(createSectionButton("Contact"));
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

function createSectionButton(name) {
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "getSectionContent('" + name + "')");
    buttonElement.className = "btn btn-primary";
    buttonElement.id = "ctrlBtn";
    buttonElement.textContent = name;
    return buttonElement;
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
