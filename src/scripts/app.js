import enquire from "enquire.js";

let isActiveMenu = false;

function mobileInit() {
	const menu = document.querySelector(".menu");
	const clickBurgerHandle = (e) => {
		e.preventDefault();
		if (isActiveMenu) {
			e.currentTarget.classList.remove("is-active");
			menu.classList.remove("menu-active");
			e.currentTarget.setAttribute("aria-label", "Open menu");
		} else {
			e.currentTarget.classList.add("is-active");
			menu.classList.add("menu-active");
			e.currentTarget.setAttribute("aria-label", "Close menu");
		}
		isActiveMenu = !isActiveMenu;
	};

	const menuButton = document.getElementById("menuButton");
	const setStateBurger = () => {
		menuButton.addEventListener("click", clickBurgerHandle);
	};
	const clearStateBurger = () => {
		menu.classList.remove("menu-active");
		menuButton.classList.remove("is-active");
		menuButton.currentTarget.setAttribute("aria-label", "Open menu");
		isActiveMenu = false;
		menuButton.removeEventListener("click", clickBurgerHandle);
	};

	const setState = () => setStateBurger();
	const clearState = () => clearStateBurger();

	return [setState, clearState];
}

const [mobileSetState, mobileClearState] = mobileInit();

/**Setup Media Query
 *
 */
enquire.register("screen and (max-width:768px)", {
	match: function () {
		mobileSetState();
	}, // If supplied, triggered when the media query transitions
	unmatch: function () {
		mobileClearState();
	}, // If supplied, triggered when the media query transitions
	setup: function () {}, // If supplied, triggered once immediately upon registration of the handler

	destroy: function () {}, // If supplied, triggered when handler is unregistered. Place cleanup code here

	deferSetup: false, // OPTIONAL, defaults to false
});
