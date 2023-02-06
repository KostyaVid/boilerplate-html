import enquire from "enquire.js";
import mobileInit from "./mobileInit";

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
