export default function mobileInit() {
	let isActiveMenu = false;
	const menu = document.querySelector(".menu");
	const menuContainer = document.querySelector(".menu-container");
	const menuItemsFocus = Array.from(
		document.querySelectorAll("[data-menu-item]")
	);
	const menuFocus = Array.from(document.querySelectorAll("[data-menu-focus]"));
	const menuButton = document.getElementById("menuButton");
	let activeMenuItemFocus = -1;

	const clickHandleOverlayMenu = (e) => {
		if (!menuContainer.contains(e.target)) {
			clickBurgerHandle(e);
		}
	};

	const clickBurgerHandle = (e) => {
		e.preventDefault();
		if (isActiveMenu) {
			menuButton.classList.remove("is-active");
			menuButton.ariaLabel = "Open menu";
			menu.removeEventListener("click", clickHandleOverlayMenu);
			menu.classList.remove("menu-active");
			menu.ariaHidden = true;
			menuItemsFocus.forEach((item) => {
				item.tabIndex = -1;
			});
			activeMenuItemFocus = -1;
		} else {
			menuButton.classList.add("is-active");
			menuButton.ariaLabel = "Close menu";
			menu.addEventListener("click", clickHandleOverlayMenu);
			menu.classList.add("menu-active");
			menu.ariaHidden = false;
			menuItemsFocus.forEach((item) => {
				item.tabIndex = 0;
			});
			activeMenuItemFocus = -1;
		}
		isActiveMenu = !isActiveMenu;
	};

	const setStateBurger = () => {
		menuButton.addEventListener("click", clickBurgerHandle);
	};
	const clearStateBurger = () => {
		isActiveMenu = false;
		menu.classList.remove("menu-active");
		menuButton.classList.remove("is-active");
		menuButton.ariaLabel = "Open menu";
		menuButton.removeEventListener("click", clickBurgerHandle);
	};

	const setHandleFocused = (event) => {
		if (!isActiveMenu) return;

		if (event.key === "Tab" && !event.shiftKey) {
			event.preventDefault();
			++activeMenuItemFocus;
			if (activeMenuItemFocus === menuFocus.length) activeMenuItemFocus = 0;
			menuFocus[activeMenuItemFocus].focus();
			return;
		}
		if (event.key === "Tab" && event.shiftKey) {
			event.preventDefault();
			--activeMenuItemFocus;
			if (activeMenuItemFocus <= -1) activeMenuItemFocus = menuFocus.length - 1;
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
