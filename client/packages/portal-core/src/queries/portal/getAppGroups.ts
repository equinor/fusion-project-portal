import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AppGroup } from '../../types/view';

/** Get menu items based on current view id */
export async function getAppGroups(
	client: IHttpClient,
	viewId?: string,
	contextExternalId?: string
): Promise<AppGroup[]> {
	try {
		if (!viewId || !contextExternalId) return [];
		const res = await client.fetch(getAppGroupsURI(viewId, contextExternalId));
		if (!res.ok) throw res;
		const data = await res.json();
		return data || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

function getAppGroupsURI(viewId: string, contextExternalId?: string): string {
	return `/api/work-surfaces/${viewId}/contexts/${contextExternalId}/apps`;
}
