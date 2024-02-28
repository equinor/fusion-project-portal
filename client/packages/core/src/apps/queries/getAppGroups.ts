import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AppGroup } from '@portal/types';

/** Get menu items based on current view id */
export async function getAppGroups(client: IHttpClient, viewId?: string, contextId?: string): Promise<AppGroup[]> {
	try {
		if (!viewId || !contextId) return [];
		const res = await client.fetch(getAppGroupsURI(viewId, contextId));
		if (!res.ok) throw res;
		const data = await res.json();
		return data || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

function getAppGroupsURI(viewId: string, contextId?: string): string {
	return `/api/work-surfaces/${viewId}/context/${contextId}/apps`;
}
