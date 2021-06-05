import { getProjects } from "./index.js";
import ProjectListeners from "./projectDynamicListeners.js";
import TodoUI from "./todoUI.js";
const ProjectUI = (() => {
	const hamitems = document.querySelector(".hamitems");
	let activeProject;
	let activeProjectElem;
	let projectIndex;
	let projBtns = document.querySelector(".proj-btns");
	let newTaskBtn = document.querySelector(".new-task-btn");
	let projName = document.querySelector(".proj-name");
	let projDesc = document.querySelector(".proj-desc");

	const addAllProjectsToUI = () => {
		let allProjects = getProjects();
		for (let i = 0; i < allProjects.length; i++) {
			createProjectList(allProjects[i]);
		}
	};

	const addNewProjectToUI = (project) => {
		let projectBtn = createProjectList(project);
		projectBtn.click();
	};

	const removeProjectFromUI = () => {
		let temp = chooseNextProjectAfterDel();
		projBtns.style.display = "none";
		newTaskBtn.style.display = "none";
		hamitems.removeChild(activeProjectElem.parentNode);
		document.querySelector(".accordion").innerHTML = "";
		if (temp) {
			temp.firstElementChild.click();
		} else {
			projName.textContent = "";
			projDesc.textContent = "";
		}

		ProjectListeners.removeListeners();
	};

	const chooseNextProjectAfterDel = () => {
		let temp;
		if (activeProjectElem.parentNode.previousElementSibling) {
			hamitems.removeChild(activeProjectElem.parentNode.previousElementSibling);
			temp = activeProjectElem.parentNode.previousElementSibling;
		}

		if (activeProjectElem.parentNode.nextElementSibling) {
			hamitems.removeChild(activeProjectElem.parentNode.nextElementSibling);
			temp = activeProjectElem.parentNode.nextElementSibling;
		}

		return temp;
	};

	const createProjectList = (project) => {
		if (hamitems.firstElementChild) {
			attachHorizontalRule();
		}

		let projectLi = document.createElement("li");
		let projectBtn = document.createElement("button");
		projectLi.appendChild(projectBtn);
		hamitems.append(projectLi);
		projectBtn.className = "remove-btn";
		projectBtn.textContent = project.name;
		projectBtn.addEventListener("click", printProject);
		return projectBtn;
	};

	const attachHorizontalRule = () => {
		let hr = document.createElement("hr");
		hr.className = "solid";
		hamitems.append(hr);
	};

	const renderAllProjectTodos = () => {
		for (let i = 0; i < activeProject.lists.length; i++) {
			TodoUI.createCard(activeProject.lists[i], i);
		}
	};

	const printProject = (e) => {
		if (activeProjectElem) {
			activeProjectElem.classList.remove("project-active");
		}

		projectIndex = findProject(e.target.parentNode);
		activeProject = getProjects()[projectIndex];
		activeProjectElem = e.target;
		e.target.classList.add("project-active");
		projBtns.style.display = "block";
		newTaskBtn.style.display = "block";
		projName.textContent = activeProject.name;
		projDesc.textContent = activeProject.description;
		document.querySelector(".accordion").innerHTML = "";
		renderAllProjectTodos();
		ProjectListeners.addListeners();
	};

	const findProject = (element) => {
		let index = Array.from(hamitems.children).indexOf(element);
		return index / 2;
	};

	const getActiveProject = () => {
		return { projectIndex, activeProjectElem, activeProject };
	};

	return {
		addAllProjectsToUI,
		addNewProjectToUI,
		getActiveProject,
		removeProjectFromUI,
	};
})();

export { ProjectUI };
