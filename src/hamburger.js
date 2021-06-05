const hamburgerMenu = () => {
	const ham = document.querySelector("#hamburgers");
	ham.addEventListener("change", function () {
		const hamitems = document.querySelector(".hamitems-div");
		if (ham.checked) {
			hamitems.classList.add("active");
			hamitems.classList.remove("hidden");
		} else {
			hamitems.classList.add("hidden");
			hamitems.classList.remove("active");
		}
	});
};
export default hamburgerMenu;
