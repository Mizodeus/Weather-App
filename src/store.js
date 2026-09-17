import Todo from "./todo.js";
import Project from "./project.js";

const STORAGE_KEY = "todo-app-data";

export default class Store {
  constructor() {
    this.projects = [];
    this.activeProject = null;
    this.load();
  }

  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.save();
    return project;
  }

  deleteProject(name) {
    this.projects = this.projects.filter((project) => project.name !== name);

    if (!this.projects.includes(this.activeProject)) {
      this.setActiveProject(this.projects[0] ?? null);
    }
    this.save();
  }

  setActiveProject(project) {
    this.activeProject = project;
    this.save();
  }

  createTodo(project, { title, description, dueDate, priority }) {
    const todo = new Todo(title, description, dueDate, priority);
    project.add(todo);
    this.save();
    return todo;
  }

  deleteTodo(project, todo) {
    project.remove(todo);
    this.save();
  }

  updateTodo(todo, fields) {
    todo.update(fields);
    this.save();
  }

  toggleTodo(todo) {
    todo.toggle();
    this.save();
  }

  save() {
    const data = {
      projects: this.projects.map((project) => ({
        name: project.name,
        todos: project.todos.map((todo) => ({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          priority: todo.priority,
          completed: todo.completed,
        })),
      })),
      activeProjectName: this.activeProject?.name ?? null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    try {
      const data = JSON.parse(raw);
      this.projects = data.projects.map((p) => {
        const project = new Project(p.name);
        p.todos.forEach((t) => {
          const todo = new Todo(t.title, t.description, t.dueDate, t.priority);
          todo.completed = t.completed;
          project.add(todo);
        });
        return project;
      });
      this.activeProject =
        this.projects.find((p) => p.name === data.activeProjectName) ??
        this.projects[0] ??
        null;
      return true;
    } catch {
      return false;
    }
  }
}
