import { ProjectUI } from "./projectUI.js";
import { getProjects } from "./index.js";
import TodoUI from "./todoUI.js";
const Todo = function (name, description, priority, dueDate, completed) {
	return { name, description, priority, dueDate, completed };
};

const addTodo = (event) => {
	event.preventDefault();
	const name = document.querySelector(".new-task-name").value;
	const desc = document.querySelector(".new-task-desc").value;
	const priority = document.querySelector(".new-task-pri").value;
	const dueDate = document.querySelector(".new-task-date").value;
	$("#newTask").modal("hide");

	const allProjects = getProjects();
	const todo = Todo(name, desc, priority, dueDate, false);
	const index = ProjectUI.getActiveProject().projectIndex;
	allProjects[index].lists.push(todo);
	localStorage.setItem("allProjects", JSON.stringify(allProjects));
	TodoUI.createCard(todo, getProjects()[index].lists.length - 1);
};

const removeTodo = (event) => {
	const todoIndex = findTodo(event.target.parentNode.parentNode.parentNode);
	const projectIndex = ProjectUI.getActiveProject().projectIndex;
	const allProjects = getProjects();
	allProjects[projectIndex].lists.splice(todoIndex, 1);
	localStorage.setItem("allProjects", JSON.stringify(allProjects));
	document
		.querySelector("#accordionExample")
		.removeChild(event.target.parentNode.parentNode.parentNode);
};

const editTodo = (event) => {
	event.preventDefault();
	const projectIndex = ProjectUI.getActiveProject().projectIndex;
	const todoIndex = findTodo(event.target.parentNode.parentNode.parentNode);
	const allProjects = getProjects();
	const todo = allProjects[projectIndex].lists[todoIndex];

	todo.name = event.target.querySelector(".edit-task-name").value;
	todo.description = event.target.querySelector(".edit-task-desc").value;
	todo.dueDate = event.target.querySelector(".edit-task-date").value;
	todo.priority = event.target.querySelector(".edit-task-pri").value;

	localStorage.setItem("allProjects", JSON.stringify(allProjects));
	TodoUI.editTodoUI(event.target, todo);
};

const completedTodo = (event) => {
	const projectIndex = ProjectUI.getActiveProject().projectIndex;
	const todoIndex = findTodo(
		event.target.parentNode.parentNode.parentNode.parentNode
	);
	const allProjects = getProjects();
	const todo = allProjects[projectIndex].lists[todoIndex];
	todo.completed = event.target.checked;
	lineThrough(todo.completed, event.target.parentNode.nextElementSibling);
	localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const lineThrough = (completed, button) => {
	if (completed) {
		button.style.textDecoration = "line-through";
		button.setAttribute("disabled", "true");
	} else {
		button.style.textDecoration = "none";
		button.removeAttribute("disabled");
	}
};

const findTodo = (element) => {
	const accordion = document.querySelector("#accordionExample");
	let index = Array.from(accordion.children).indexOf(element);
	return index;
};

export { addTodo, removeTodo, editTodo, completedTodo };
