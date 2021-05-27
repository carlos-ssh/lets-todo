import defaultProject from 'pressetTasks';

const getProjects = () => {
	return JSON.parse(localStorage.getItem("allProjects") || "[]");
}

const init = () => {
	hamburgerMenu();
	addListeners();
	ProjectUI.addAllProjectsToUI();
	let hamitems = document.querySelector(".hamitems");
	let firstProjectListTag = hamitems.firstElementChild;

	//goes to the first project page on document load
	if (firstProjectListTag) {
		firstProjectListTag.firstElementChild.click();
	}
}

const addListeners = () => {
	document
		.querySelector("#new-proj-form")
		.addEventListener("submit", addProject);
	$("#editProj").on("shown.bs.modal", projectEditForm);
}

window.onload = defaultProject();
init();
export { getProjects };