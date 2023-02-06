import enquire from "enquire.js";

let isActiveMenu = false;

function mobileInit() {
	const menu = document.querySelector(".menu");
	const menuItemsFocus = Array.from(
		document.querySelectorAll("[data-menu-item]")
	);
	const menuFocus = Array.from(document.querySelectorAll("[data-menu-focus]"));
	let activeMenuItemFocus = -1;

	const clickBurgerHandle = (e) => {
		e.preventDefault();
		if (isActiveMenu) {
			e.currentTarget.classList.remove("is-active");
			menu.classList.remove("menu-active");
			menu.ariaHidden = true;
			e.currentTarget.setAttribute("aria-label", "Open menu");
			menuItemsFocus.forEach((item) => {
				item.tabIndex = -1;
			});
			activeMenuItemFocus = -1;
		} else {
			e.currentTarget.classList.add("is-active");
			menu.classList.add("menu-active");
			menu.ariaHidden = false;
			e.currentTarget.ariaLabel = "Close menu";
			menuItemsFocus.forEach((item) => {
				item.tabIndex = 0;
			});
			activeMenuItemFocus = -1;
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
		menuButton.ariaLabel = "Open menu";
		isActiveMenu = false;
		menuButton.removeEventListener("click", clickBurgerHandle);
	};

	const setHandleFocused = (event) => {
		if (!isActiveMenu) return;

		if (event.key === "Tab" && !event.shiftKey) {
			event.preventDefault();
			++activeMenuItemFocus;
			if (activeMenuItemFocus === menuFocus.length) {
				activeMenuItemFocus = 0;
			}
			menuFocus[activeMenuItemFocus].focus();
			return;
		}
		if (event.key === "Tab" && event.shiftKey) {
			event.preventDefault();
			--activeMenuItemFocus;
			if (activeMenuItemFocus <= -1) {
				activeMenuItemFocus = menuFocus.length - 1;
			}
			menuFocus[activeMenuItemFocus].focus();
		}
	};

	const setState = () => {
		menuItemsFocus.forEach((item) => {
			item.tabIndex = -1;
		});
		setStateBurger();
		document.addEventListener("keydown", setHandleFocused);
	};
	const clearState = () => {
		menuItemsFocus.forEach((item) => {
			item.tabIndex = 0;
		});

		clearStateBurger();
		document.removeEventListener("keydown", setHandleFocused);
	};

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
