import { ContextItem } from '@equinor/fusion-framework-module-context';

const CONTEXT_TYPE_TO_ROUTE_MAP: Record<string, string> = {
	Facility: 'Facility',
	ProjectMaster: 'Project',
};

export function getContextTypeName(contextTypeId?: string | null) {
	return contextTypeId ? CONTEXT_TYPE_TO_ROUTE_MAP[contextTypeId] || '' : '';
}

export function getContextPageURL(context?: ContextItem | null) {
	if (!context) return `/`;
	return `${getContextTypeName(context.type.id).toLowerCase()}/${context.id}`;
}

export function getContextFormUrl() {
	const match = window.location.pathname.match(
		/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
	);
	return match ? match[0] : undefined;
}
