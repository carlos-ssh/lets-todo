const defaultProject = () => {
	if (!("hasRunCodeBefore" in localStorage)) {
		let lists = [
			{
				name: "To-Doer is here to make your life easy and comfortable",
				description: "",
				priority: "critical selected",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name:
					"To create a new project, click on the new project on the sidebar",
				description: "",
				priority: "medium",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Tasks cannot be created without an existing project",
				description: "",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name:
					"To create a new task, create a new project or use an existing one. The new task button is on the navbar.",
				description: "",
				priority: "low",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Click the todo text to see more details about the task.",
				description: "Good job.",
				priority: "critical selected",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "The colors at the bottom of each task represent priority.",
				description: "Red - Critical↵Orange - High↵Yellow - Medium↵Green - Low",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Click on the todo text to edit the task",
				description: "",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Enjoy To-Doer",
				description: "",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
		];
		let allProjects = [
			{ name: "Welcome", description: "Welcome to To-Doer", lists },
		];
		localStorage.setItem("allProjects", JSON.stringify(allProjects));
		localStorage.setItem("hasRunCodeBefore", true);
	}
}
export default defaultProject;
