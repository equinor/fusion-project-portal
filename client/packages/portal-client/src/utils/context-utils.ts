export function replaceContextInPathname(contextId: string) {
	return window.location.pathname.replace(
		/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
		contextId
	);
}
