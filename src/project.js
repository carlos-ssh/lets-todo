import { getProjects } from "./index.js";
import { ProjectUI } from "./projectUI.js";

const Project = function (name, description) {
	const allProjects = getProjects();
	allProjects.push({ name, description, lists: [] });
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
	return { name, description };
};

const addProject = (event) => {
	event.preventDefault();
	const projName = document.querySelector(".new-proj-name").value;
	const projDesc = document.querySelector(".new-proj-desc").value;
	const newProject = Project(projName, projDesc);
	ProjectUI.addNewProjectToUI(newProject);
	$("#newProj").modal("hide");
};

const removeProject = () => {
	let answer = confirm("Are you sure you want to delete this project?");
	if (!answer) {
		return;
  }
  
	const index = ProjectUI.getActiveProject().projectIndex;
	let allProjects = getProjects();
	allProjects.splice(index, 1);
	localStorage.setItem("allProjects", JSON.stringify(allProjects));
	ProjectUI.removeProjectFromUI();
};

const projectEditForm = () => {
	const projName = ProjectUI.getActiveProject().activeProject.name;
	const projDesc = ProjectUI.getActiveProject().activeProject.description;
	document.querySelector(".edit-proj-name").value = projName;
	document.querySelector(".edit-proj-desc").value = projDesc;
};

const editProject = (event) => {
	event.preventDefault();
	const index = ProjectUI.getActiveProject().projectIndex;
	const projectBtn = ProjectUI.getActiveProject().activeProjectElem;
	let allProjects = getProjects();
	allProjects[index].name = document.querySelector(".edit-proj-name").value;
	allProjects[index].description = document.querySelector(
		".edit-proj-desc"
	).value;
	projectBtn.textContent = allProjects[index].name;
	localStorage.setItem("allProjects", JSON.stringify(allProjects));
	projectBtn.click();
	$("#editProj").modal("hide");
};

export { addProject, projectEditForm, editProject, removeProject };
