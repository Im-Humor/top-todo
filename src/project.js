import './style.css';
import { refreshTodos } from './item';

export let projectList = [];
if (localStorage.getItem("projectList") === null) {
    projectList = [];
} else {
    projectList = JSON.parse(localStorage.getItem("projectList"));
}

const projectListHTML = document.querySelector(".menu-project-list");

class project{
    constructor(title) {
        this.title = title;
        this.projectId = Math.floor(Math.random() * 1000000);
        this.isSelected = 0;
        this.itemList = [];
    }
}

// logic for when project in project list is selected
const selectProject = (event) => {
    event.target.removeEventListener("click", selectProject)
    let selectedProject = event.target.id
    for (let x = 0; x < projectList.length; x++) {
        if (projectList[x]["projectId"] == selectedProject) {
            projectList[x]["isSelected"] = 1;
        }
        else {
            projectList[x]["isSelected"] = 0;
        }
        refreshProjects();
    }
    refreshTodos();
}

// logic for when new project submit button is clicked
const addProjectSubmission = (event) => {
    event.target.removeEventListener("click", addProjectSubmission);
    const newProjectField = document.querySelector("#project-title-input")
    const newProjectName = newProjectField.value
    const newProject = new project(newProjectName)
    projectList.push(newProject)
    localStorage.setItem("projectList", JSON.stringify(projectList));;
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

// if no projects, create one and mark it selected
// then refresh project list from array of project objects
// and append project add button

export const refreshProjects = () => {
    if (projectList.length == 0) {
        let dummyProject = new project("Sample Project");
        projectList.push(dummyProject);
        dummyProject.isSelected = 1;
    }
    projectListHTML.innerHTML = "";
    for (let x = 0; x < projectList.length; x++) {
        const projectListHTMLObj = document.createElement("li")
        projectListHTMLObj.textContent = projectList[x]["title"]
        if (projectList[x]["isSelected"] == 1) {
            projectListHTMLObj.classList.add("selected-project")
        }
        projectListHTMLObj.setAttribute("id", projectList[x]["projectId"]);
        projectListHTML.appendChild(projectListHTMLObj)
        projectListHTMLObj.addEventListener("click", selectProject)
    }
    const projectListAddBtn = document.createElement("button")
    projectListAddBtn.textContent = "Add Project"
    projectListAddBtn.addEventListener("click", addProjectButtonClick)
    projectListHTML.appendChild(projectListAddBtn)
}