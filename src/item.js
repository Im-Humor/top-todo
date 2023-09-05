import './style.css';

export default class todoItem{
    constructor(projectId, title, description, dueDate, priority) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}