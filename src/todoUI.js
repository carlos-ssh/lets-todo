import addListeners from "./todoDynamicListeners";
const TodoUI = (() => {
	const createCard = (todo, index) => {
		const accordion = document.querySelector(".accordion");
		const card = document.createElement("div");
		card.className = "card shadow mb-4";
		accordion.appendChild(card);
		card.appendChild(createCardHeader(todo, index));
		card.appendChild(createCardBodyContainer(todo, index));
		addListeners(index);
	};

	const createCardHeader = (todo, index) => {
		const cardHeader = document.createElement("div");
		const headingTag = document.createElement("h2");
		const checkboxDiv = document.createElement("div");
		const checkbox = document.createElement("input");
		const accordionBtn = document.createElement("button");
		const delTaskBtn = document.createElement("button");
		const delIcon = document.createElement("i");

		cardHeader.className = `card-header shadow pt-0 ${todo.priority} d-flex justify-content-between align-items-baseline`;
		headingTag.className = "mb-0 d-flex align-items-baseline";
		checkboxDiv.className = "form-check mr-1";
		checkbox.className =
			"form-check-input position-static task-complete-checkbox";
		accordionBtn.className =
			"btn btn-block text-left px-0 w-auto task-title-btn";
		delTaskBtn.className = "remove-btn task-del-btn";
		delIcon.className = "far fa-trash-alt";
		accordionBtn.textContent = todo.name;

		checkbox.type = "checkbox";
		checkbox.id = `checkbox${index}`;
		checkbox.checked = todo.completed;
		delTaskBtn.id = `del${index}`;
		checkbox.setAttribute = ("aria-label", "checkbox");
		cardHeader.id = `heading${index}`;
		accordionBtn.type = "button";
		accordionBtn.setAttribute("data-toggle", "collapse");
		accordionBtn.setAttribute("data-target", `#collapse${index}`);
		accordionBtn.setAttribute("aria-expanded", "true");
		accordionBtn.setAttribute("aria-controls", `collapse${index}`);
		lineThrough(todo.completed, accordionBtn);

		checkboxDiv.appendChild(checkbox);
		headingTag.appendChild(checkboxDiv);
		headingTag.appendChild(accordionBtn);
		delTaskBtn.appendChild(delIcon);
		cardHeader.appendChild(headingTag);
		cardHeader.appendChild(delTaskBtn);
		return cardHeader;
	};

	const lineThrough = (completed, button) => {
		if (completed) {
			button.style.textDecoration = "line-through";
			button.setAttribute("disabled", "true");
		}
	};

	const createCardBodyContainer = (todo, index) => {
		const container = document.createElement("div");
		const cardBody = document.createElement("div");

		container.className = "collapse";
		cardBody.className = `card-body ${todo.priority}`;
		container.id = `collapse${index}`;

		container.setAttribute("data-parent", "#accordionExample");
		container.setAttribute("aria-labelledby", `heading${index}`);

		container.appendChild(cardBody);
		cardBody.appendChild(createTaskEditForm(todo, index));
		return container;
	};

	const createTaskEditForm = (todo, index) => {
		const form = document.createElement("form");
		const label = document.createElement("label");
		const nameInput = document.createElement("input");
		const labelDesc = document.createElement("label");
		const descInput = document.createElement("textarea");
		const dateAndPriorityDiv = document.createElement("div");

		nameInput.className = "form-control mb-2 edit-task-name";
		form.className = "todo-form";
		form.id = `form${index}`;
		form.action = "index.html";
		nameInput.id = `name${index}`;
		nameInput.value = todo.name;
		nameInput.maxlength = "20";
		nameInput.type = "text";
		nameInput.name = "name";
		nameInput.required = "true";
		descInput.className = "form-control mb-2 edit-task-desc";
		descInput.id = `description${index}`;
		descInput.value = todo.description;
		descInput.maxlength = "150";
		descInput.rows = "3";
		descInput.name = "description";
		label.textContent = "Task Name";
		labelDesc.textContent = "Task Description";
		dateAndPriorityDiv.className =
			"form-row justify-content-between align-items-center";

		label.for = `name${index}`;
		labelDesc.for = `description${index}`;

		form.appendChild(label);
		form.appendChild(nameInput);
		form.appendChild(labelDesc);
		form.appendChild(descInput);
		form.appendChild(dateAndPriorityDiv);
		form.appendChild(formFooter());
		dateAndPriorityDiv.appendChild(dueDateInput(todo.dueDate, index));
		dateAndPriorityDiv.appendChild(priority(todo.priority, index));
		return form;
	};

	const dueDateInput = (date, index) => {
		const container = document.createElement("div");
		const label = document.createElement("label");
		const input = document.createElement("input");

		container.className = "col-auto my-1";
		label.for = `date${index}`;
		label.textContent = "Due Date";
		input.className = "form-control edit-task-date";
		input.id = `date${index}`;
		input.value = date;
		input.type = "date";
		input.name = "date";
		input.required = "true";

		container.appendChild(label);
		container.appendChild(input);
		return container;
	};

	const priority = (priority, index) => {
		const container = document.createElement("div");
		const label = document.createElement("label");
		const select = document.createElement("select");
		const critical = document.createElement("option");
		const high = document.createElement("option");
		const medium = document.createElement("option");
		const low = document.createElement("option");

		container.className = "col-auto my-1";
		label.for = `priority${index}`;
		label.textContent = "Priority Level";
		select.className = "custom-select mr-sm-2 edit-task-pri";
		select.value = priority;
		select.id = `priority${index}`;

		critical.value = "critical";
		critical.textContent = "Critical";
		high.textContent = "High";
		high.value = "high";
		medium.textContent = "Medium";
		medium.value = "medium";
		low.textContent = "Low";
		low.value = "low";

		container.appendChild(label);
		container.appendChild(select);
		select.appendChild(critical);
		select.appendChild(high);
		select.appendChild(medium);
		select.appendChild(low);
		findIndexOfPriority(select, priority);
		return container;
	};

	const findIndexOfPriority = (select, priority) => {
		for (let i = 0; i < select.options.length; i++) {
			if (select.options[i].value === priority) {
				select.options[i].selected = "true";
			}
		}
	};

	const formFooter = () => {
		const div = document.createElement("div");
		const saveBtn = document.createElement("button");

		div.className = "form-footer float-right mt-3";
		saveBtn.className = "btn bg-purple text-white edit-task-submit submit";
		saveBtn.type = "submit";
		saveBtn.textContent = "Save";
		div.appendChild(saveBtn);
		return div;
	};

	const editTodoUI = (form, todo) => {
		form.querySelector(".edit-task-name").value = todo.name;
		form.querySelector(".edit-task-desc").value = todo.description;
		form.querySelector(".edit-task-date").value = todo.dueDate;
		findIndexOfPriority(form.querySelector(".edit-task-pri"), todo.priority);
		const cardHeader = form.parentNode.parentNode.previousElementSibling;
		const taskBtn = cardHeader.querySelector(".task-title-btn");
		const cardBody = form.parentNode;
		cardBody.className = `card-body ${todo.priority}`;
		cardHeader.className = `card-header shadow pt-0 ${todo.priority} d-flex justify-content-between align-items-baseline`;
		taskBtn.textContent = todo.name;
	};

	return { createCard, editTodoUI };
})();

export default TodoUI;
