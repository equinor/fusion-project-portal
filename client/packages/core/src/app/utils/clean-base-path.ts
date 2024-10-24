export function cleanBasePath(path?: string): string | undefined {
	return `/${path?.replace('/*', '')}`;
}
