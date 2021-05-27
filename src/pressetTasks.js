const defaultProject = () => {
	if (!("hasRunCodeBefore" in localStorage)) {
		let lists = [
			{
				name: "Go to Super Market",
				description: "",
				priority: "critical selected",
				dueDate: "2021-05-24",
				completed: false,
			},
			{
				name:
					"Go at the doctor",
				description: "",
				priority: "medium",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Dinner with friends",
				description: "",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name:
					"Commit messages in GItHub.",
				description: "",
				priority: "low",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Prepare new recipe to brew.",
				description: "Good job.",
				priority: "critical selected",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Buy malt, hops and yeast.",
				description: "Red - Critical↵Orange - High↵Yellow - Medium↵Green - Low",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Clean house",
				description: "",
				priority: "high",
				dueDate: "2021-01-14",
				completed: false,
			},
			{
				name: "Dinner with friends",
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