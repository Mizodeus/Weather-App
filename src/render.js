export default class Renderer {
  constructor({ projectTabs, todoList, todoListTitle }) {
    this.projectTabs = projectTabs;
    this.todoList = todoList;
    this.todoListTitle = todoListTitle;

    this.onToggleTodo = null;
    this.onEditTodo = null;
    this.onDeleteTodo = null;
    this.onSelectProject = null;
  }

  render(projects, activeProject) {
    this.renderProjects(projects, activeProject);
    this.renderTodos(activeProject);
  }

  renderProjects(projects, activeProject) {
    this.projectTabs.innerHTML = "";

    projects.forEach((project) => {
      const tab = document.createElement("button");
      tab.className = "project-tab";
      tab.textContent = project.name;

      if (project === activeProject) {
        tab.classList.add("active");
      }

      tab.addEventListener("click", () => {
        this.onSelectProject?.(project);
      });

      this.projectTabs.append(tab);
    });
  }

  renderTodos(project) {
    this.todoListTitle.textContent = project?.name ?? "";

    if (!project || project.todos.length === 0) {
      this.todoList.innerHTML = `
        <div class="empty-state">
          <p>No todos yet. Click "+ Add Todo" to create one.</p>
        </div>`;
      return;
    }

    this.todoList.innerHTML = "";

    project.todos.forEach((todo) => {
      this.todoList.append(this.createTodoCard(todo));
    });
  }

  createTodoCard(todo) {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    if (todo.completed) {
      card.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      this.onToggleTodo?.(todo);
    });

    const body = document.createElement("div");
    body.classList.add("todo-body");

    const title = document.createElement("div");
    title.classList.add("todo-title");
    title.textContent = todo.title;

    const description = document.createElement("div");
    description.classList.add("todo-description");
    description.textContent = todo.description;

    const meta = document.createElement("div");
    meta.classList.add("todo-meta");

    const date = document.createElement("span");
    date.classList.add("todo-date");
    date.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("span");
    priority.classList.add("todo-priority", todo.priority);
    priority.textContent = todo.priority;

    meta.append(date, priority);
    body.append(title, description, meta);

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-ghost");
    editButton.title = "Edit";
    editButton.innerHTML = "&#9998;";
    editButton.addEventListener("click", () => {
      this.onEditTodo?.(todo);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-ghost");
    deleteButton.title = "Delete";
    deleteButton.innerHTML = "&#10005;";
    deleteButton.addEventListener("click", () => {
      this.onDeleteTodo?.(todo);
    });

    actions.append(editButton, deleteButton);
    card.append(checkbox, body, actions);

    return card;
  }
}
