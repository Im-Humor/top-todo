import './style.css';
import { projectList } from './project.js';

const todoHeader = document.querySelector(".main-project-header")
const todoListHTML = document.querySelector(".main-todos-list")
const noteSection = document.querySelector(".notes-note-header")


class todoItem{
    constructor(projectId, title, description, dueDate, priority) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.itemId = Math.floor(Math.random() * 1000000);
    }
}


// TODO maybe refactor using isSelected state?
const updateInputSubmit = (event) => {
    if (event.key == "Enter") {

        const currentProjectId = todoHeader.id
        const currentItemId = event.target.parentNode.id
        const currentProject = projectList.find(item => item.projectId == currentProjectId)
        const currentItem = currentProject.itemList.find(item => item.itemId == currentItemId)
        if (event.target.parentNode.classList.contains("note-name")) {
            currentItem.title = `${event.target.value}`
            event.target.parentNode.innerHTML = `<h3 class="note-name">${currentItem.title}</h3>`;
        }
        else if (event.target.parentNode.classList.contains("note-duedate")) {
            currentItem.dueDate = `${event.target.value}`
            event.target.parentNode.innerHTML = `<h5 class="note-duedate">${currentItem.dueDate}</h5>`;
        }
        else if (event.target.parentNode.classList.contains("note-priority")) {
            currentItem.priority = `${event.target.value}`
            event.target.parentNode.innerHTML = `<h5 class="note-priority">${currentItem.priority}</h5>`;
        }
        event.target.removeEventListener("keypress", updateInputSubmit)
        refreshTodos();
    }
}

const clickableUpdate = (event) => {
    event.target.removeEventListener("click", clickableUpdate)
    const updateInput = document.createElement("input")
    updateInput.setAttribute("id", `${event.target.id}`)
    event.target.textContent = ""
    event.target.appendChild(updateInput)
    updateInput.addEventListener("keypress", updateInputSubmit)
}

const updateTodoInfo = (event) => {
    noteSection.innerHTML = "";
    const currentProjectId = todoHeader.id
    const currentItemId = event.target.id
    const currentProject = projectList.find(item => item.projectId == currentProjectId)
    const currentItem = currentProject.itemList.find(item => item.itemId == currentItemId)
    const noteSectionHeader = document.createElement("div")
    noteSectionHeader.classList.add("notes-note-header")
    const noteSectionTitle = document.createElement("h3");
    noteSectionTitle.classList.add("note-name")
    noteSectionTitle.textContent = `${currentItem.title}`
    noteSectionTitle.setAttribute("id", `${currentItem.itemId}`)
    const noteSectionDueDate = document.createElement("h5");
    noteSectionDueDate.classList.add("note-duedate")
    noteSectionDueDate.textContent = `Due date: ${currentItem.dueDate}`
    noteSectionDueDate.setAttribute("id", `${currentItem.itemId}`)
    const noteSectionPriority = document.createElement("h5");
    noteSectionPriority.classList.add("note-priority")
    noteSectionPriority.textContent = `Priority: ${currentItem.priority}`
    noteSectionPriority.setAttribute("id", `${currentItem.itemId}`)
    noteSection.appendChild(noteSectionHeader)
    noteSectionHeader.appendChild(noteSectionTitle)
    noteSectionHeader.appendChild(noteSectionDueDate)
    noteSectionHeader.appendChild(noteSectionPriority)
    const childNodes = noteSection.childNodes
    childNodes.forEach(node => node.addEventListener("click", clickableUpdate))
}


// when the submit button is pressed, takes the value
// inside the input field and uses that to create a new todo item
const todoInputSubmitClick = (event) => {
    event.target.removeEventListener("click", addTodoButtonClick)
    const todoTitleInput = document.querySelector('#todo-title-input').value
    const newTodoItem = new todoItem(todoHeader.id, todoTitleInput, "", "", "")
    const currentProject = projectList.find(item => item.projectId == todoHeader.id)
    currentProject.itemList.push(newTodoItem);
    refreshTodos();
}


// when the new todo item button is clicked,
// remove that button and replace with an input field and
// another button which will submit and create a new item for that project
const addTodoButtonClick = (event) => {
    event.target.removeEventListener("click", addTodoButtonClick)
    event.target.remove()
    const todoInput = document.createElement("input");
    todoInput.setAttribute("id","todo-title-input");
    todoListHTML.appendChild(todoInput);
    const todoInputSubmit = document.createElement("button")
    todoInputSubmit.textContent = "Add"
    todoListHTML.appendChild(todoInputSubmit)
    todoInputSubmit.addEventListener("click", todoInputSubmitClick)
}


// function to refresh list of todos based on 
// which project currently has 'isSelected' set to 1
// also adds button to create new todo items
export const refreshTodos = () => {
    todoHeader.innerHTML = "";
    todoListHTML.innerHTML = "";
    const currentProject = projectList.find(item => item.isSelected == 1)
    todoHeader.innerHTML = `<h3>${currentProject.title}</h3>`;
    todoHeader.setAttribute("id", `${currentProject.projectId}`)
    if (currentProject.itemList.length == 0) {
        let initTodoItem = new todoItem(currentProject.projectId, "New Item",
        "", "", "")
        currentProject.itemList.push(initTodoItem);
    }
    for (let x = 0; x < currentProject.itemList.length; x++) {
        let todoListHTMLObj = document.createElement("li")
        todoListHTMLObj.textContent = currentProject.itemList[x]["title"];
        todoListHTMLObj.classList.add("main-todos-item");
        todoListHTML.appendChild(todoListHTMLObj);
        todoListHTMLObj.setAttribute("id", `${currentProject.itemList[x].itemId}`)
        todoListHTMLObj.addEventListener("click", updateTodoInfo)
    }
    let newTodoButton = document.createElement("button")
    newTodoButton.textContent = "New Todo Item"
    todoListHTML.appendChild(newTodoButton);
    newTodoButton.addEventListener("click", addTodoButtonClick)
}

