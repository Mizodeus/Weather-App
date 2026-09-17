const PRIORITIES = ["high", "medium", "low"];

export default class Todo {
  constructor(title, description, dueDate, priority) {
    if (!title.trim()) {
      throw new Error("Title is required");
    }

    if (!PRIORITIES.includes(priority)) {
      throw new Error(`Unknown priority: ${priority}`);
    }

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }

  update({ title, description, dueDate, priority }) {
    if (title !== undefined) {
      if (!title.trim()) {
        throw new Error("Title cannot be empty");
      }
      this.title = title;
    }

    if (description !== undefined) {
      this.description = description;
    }

    if (dueDate !== undefined) {
      this.dueDate = dueDate;
    }

    if (priority !== undefined) {
      if (!PRIORITIES.includes(priority)) {
        throw new Error(`Unknown priority: ${priority}`);
      }
      this.priority = priority;
    }
  }
}
