export default class Task {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority; 
      this.completed = false;
      this.createdAt = new Date().toISOString();
    }
  }