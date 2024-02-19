import { ContextItem } from '@equinor/fusion-framework-module-context';

const CONTEXT_TYPE_TO_ROUTE_MAP: Record<string, string> = {
	Facility: 'facility',
	ProjectMaster: 'project',
};

export function contextTypeRoute(contextTypeId?: string | null) {
	return contextTypeId ? CONTEXT_TYPE_TO_ROUTE_MAP[contextTypeId] || '' : '';
}

export function getContextPageURL(context?: ContextItem | null) {
	if (!context) return `/`;
	return `${contextTypeRoute(context.type.id)}/${context.id}`;
}

export function getPathUrl(path: string, contextId?: string): string {
	if (!contextId) return `${path}/`;
	return `${path}/${contextId}`;
}

export function getContextPageUrl(contextId?: string): string {
	if (!contextId) return '/context-page/';
	return `/context-page/${contextId}`;
}

export function getContextFormUrl() {
	const match = window.location.pathname.match(
		/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
	);
	return match ? match[0] : undefined;
}
