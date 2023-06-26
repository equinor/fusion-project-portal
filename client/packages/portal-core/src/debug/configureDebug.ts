const DEBUG_KEY = 'PORTAL_DEBUG';

export const configureDebug = () => {
	/* fusion core is spamming the console form module this will remove it in production */
	if (!localStorage.getItem(DEBUG_KEY)) {
		window.console.log = (): void => {
			// no content
		};
		window.console.info = (): void => {
			// no content
		};
		window.console.warn = (): void => {
			// no content
		};
		window.console.debug = (): void => {
			// no content
		};
	}
};
