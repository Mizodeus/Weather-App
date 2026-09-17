export default class Project {
  constructor(name) {
    if (!name.trim()) {
      throw new Error("Project name cannot be empty");
    }

    this.name = name;
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(todo) {
    this.todos = this.todos.filter((item) => item !== todo);
  }
}
