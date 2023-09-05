import './style.css';

let projectList = [];
const projectListHTML = document.querySelector(".menu-project-list");

class project{
    constructor(projectId, title) {
        this.projectId = projectId;
        this.title = title;
        this.itemList = [];
    }
}

// logic for when new project submit button is clicked
const addProjectSubmission = (event) => {
    event.target.removeEventListener("click", addProjectSubmission);
    const generatedId = Math.floor(Math.random() * 1000000);
    const newProjectField = document.querySelector("#project-title-input")
    const newProjectName = newProjectField.value
    const newProject = new project(generatedId, newProjectName)
    projectList.push(newProject)
    refreshProjects();
}

// logic for when add project button is clicked
const addProjectButtonClick = (event) => {
    event.target.removeEventListener("click", addProjectButtonClick)
    event.target.remove()
    const addProjectInput = document.createElement("input")
    addProjectInput.setAttribute('id', "project-title-input")
    projectListHTML.appendChild(addProjectInput)
    const addProjectSubmitBtn = document.createElement("button")
    addProjectSubmitBtn.textContent = "Submit"
    projectListHTML.appendChild(addProjectSubmitBtn)
    addProjectSubmitBtn.addEventListener("click", addProjectSubmission)
}

// refresh project list from array of project objects
// and append project add button
export const refreshProjects = () => {
    projectListHTML.innerHTML = "";
    for (let x = 0; x < projectList.length; x++) {
        const projectListHTMLObj = document.createElement("li")
        projectListHTMLObj.textContent = projectList[x]["title"]
        projectListHTML.appendChild(projectListHTMLObj)
    }
    const projectListAddBtn = document.createElement("button")
    projectListAddBtn.textContent = "Add Project"
    projectListAddBtn.addEventListener("click", addProjectButtonClick)
    projectListHTML.appendChild(projectListAddBtn)
}