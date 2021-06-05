import { editProject, removeProject } from "./project.js";
import { addTodo } from "./todo.js";

const ProjectListeners = (() => {
	const editProjForm = document.querySelector("#edit-proj-form");
	const projDelBtn = document.querySelector(".proj-del-btn");
	const newTaskForm = document.querySelector("#new-task-form");

	const addListeners = () => {
		editProjForm.addEventListener("submit", editProject);
		projDelBtn.addEventListener("click", removeProject);
		newTaskForm.addEventListener("submit", addTodo);
	};

	const removeListeners = () => {
		editProjForm.removeEventListener("submit", editProject);
		projDelBtn.removeEventListener("click", removeProject);
		newTaskForm.removeEventListener("submit", addTodo);
  };
  
	return { addListeners, removeListeners };
})();

export default ProjectListeners;
