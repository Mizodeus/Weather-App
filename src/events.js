export default class EventHandler {
  constructor(store, renderer, dom) {
    this.store = store;
    this.renderer = renderer;
    this.dom = dom;
    this.editingTodo = null;
  }

  init() {
    this.renderer.onSelectProject = (project) => {
      this.store.setActiveProject(project);
      this.render();
    };

    this.renderer.onToggleTodo = (todo) => {
      this.store.toggleTodo(todo);
      this.render();
    };

    this.renderer.onEditTodo = (todo) => {
      this.openModal(todo);
    };

    this.renderer.onDeleteTodo = (todo) => {
      this.store.deleteTodo(this.store.activeProject, todo);
      this.render();
    };

    this.dom.addTodoButton.addEventListener("click", () => this.openModal());
    this.dom.cancelButton.addEventListener("click", () => this.closeModal());
    this.dom.modalOverlay.addEventListener("click", (event) => {
      if (event.target === this.dom.modalOverlay) {
        this.closeModal();
      }
    });
    this.dom.modalForm.addEventListener("submit", (event) =>
      this.handleFormSubmit(event),
    );

    this.dom.addProjectButton.addEventListener("click", () =>
      this.showProjectInput(),
    );
    this.dom.deleteProjectButton.addEventListener("click", () =>
      this.deleteActiveProject(),
    );
    this.dom.projectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.createProject();
    });
    this.dom.projectNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.cancelProjectInput();
      }
    });
  }

  render() {
    this.renderer.render(this.store.projects, this.store.activeProject);
  }

  openModal(todo = null) {
    this.editingTodo = todo;

    this.dom.modalTitle.textContent = todo ? "Edit Todo" : "New Todo";
    this.dom.submitButton.textContent = todo ? "Save" : "Create";
    this.dom.titleInput.value = todo?.title ?? "";
    this.dom.descriptionInput.value = todo?.description ?? "";
    this.dom.dateInput.value = todo?.dueDate ?? "";
    this.dom.prioritySelect.value = todo?.priority ?? "medium";

    this.dom.modalOverlay.classList.add("visible");
    this.dom.titleInput.focus();
  }

  closeModal() {
    this.editingTodo = null;
    this.dom.modalOverlay.classList.remove("visible");
  }

  showProjectInput() {
    this.dom.addProjectButton.hidden = true;
    this.dom.projectNameInput.hidden = false;
    this.dom.projectNameInput.value = "";
    this.dom.projectNameInput.focus();
  }

  cancelProjectInput() {
    this.dom.projectNameInput.hidden = true;
    this.dom.addProjectButton.hidden = false;
  }

  createProject() {
    const name = this.dom.projectNameInput.value.trim();
    this.cancelProjectInput();

    if (!name) {
      return;
    }

    let project = this.store.projects.find((item) => item.name === name);

    if (!project) {
      project = this.store.createProject(name);
    }

    this.store.setActiveProject(project);
    this.render();
  }

  deleteActiveProject() {
    if (!this.store.activeProject) {
      return;
    }

    const { name } = this.store.activeProject;

    if (!window.confirm(`Delete project "${name}" and all its todos?`)) {
      return;
    }

    this.store.deleteProject(name);
    this.render();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (!this.store.activeProject) {
      return;
    }

    const fields = {
      title: this.dom.titleInput.value,
      description: this.dom.descriptionInput.value,
      dueDate: this.dom.dateInput.value,
      priority: this.dom.prioritySelect.value,
    };

    if (this.editingTodo) {
      this.store.updateTodo(this.editingTodo, fields);
    } else {
      this.store.createTodo(this.store.activeProject, fields);
    }

    this.closeModal();
    this.render();
  }
}
