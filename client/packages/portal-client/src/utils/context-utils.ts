export function verifyContextInURL(path: string): string | null {
	if (path[0] === '/') {
		path = path.slice(1);
	}
	const pathSections = path.split('/');

	const contextIndex = pathSections.findIndex((section) =>
		section.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
	);

	if (contextIndex > 0 && contextIndex < 3) {
		return pathSections[contextIndex];
	}

	return null;
}

export function replaceContextInPathname(contextId: string, path: string) {
	const contextToReplace = verifyContextInURL(path);
	return contextToReplace ? path.replace(contextToReplace, contextId) : path;
}
