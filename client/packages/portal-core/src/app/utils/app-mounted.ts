export function shouldSuspense() {
	return !appMounted(window.location.pathname);
}

export function appMounted(path: string) {
	return path.includes('apps');
}
