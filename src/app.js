import Store from "./store.js";
import Renderer from "./render.js";
import EventHandler from "./events.js";
import dom from "./dom.js";

export function init() {
  const store = new Store();
  const renderer = new Renderer({
    projectTabs: dom.projectTabs,
    todoList: dom.todoList,
    todoListTitle: dom.todoListTitle,
  });
  const events = new EventHandler(store, renderer, dom);

  if (store.projects.length === 0) {
    const defaultProject = store.createProject("Default");
    const workProject = store.createProject("Work");
    const personalProject = store.createProject("Personal");
    store.setActiveProject(defaultProject);

    store.createTodo(defaultProject, {
      title: "Learn JavaScript",
      description: "Study modules and classes",
      dueDate: "2026-09-10",
      priority: "high",
    });
    store.createTodo(defaultProject, {
      title: "Read documentation",
      description: "Go through MDN guides",
      dueDate: "2026-09-08",
      priority: "medium",
    });
    store.createTodo(defaultProject, {
      title: "Set up project build",
      description: "Configure webpack and loaders",
      dueDate: "2026-09-15",
      priority: "low",
    });
    store.createTodo(workProject, {
      title: "Prepare weekly report",
      description: "Summarize completed tasks",
      dueDate: "2026-09-12",
      priority: "high",
    });
    store.createTodo(workProject, {
      title: "Team meeting",
      description: "Sync on Q3 goals",
      dueDate: "2026-09-11",
      priority: "medium",
    });
    store.createTodo(personalProject, {
      title: "Grocery shopping",
      description: "Milk, eggs, bread",
      dueDate: "2026-09-09",
      priority: "low",
    });
  }

  events.init();
  events.render();
}
