import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AppGroup } from '../../types/view';

/** Get menu items based on current view id */
export async function getAppGroups(
  client: IHttpClient,
  viewId?: string,
  contextExternalId?: string
): Promise<AppGroup[] | []> {
  try {
    if (!viewId) return [];
    let uri = `/api/work-surfaces/${viewId}/apps`;
    if (contextExternalId)
      uri = `/api/work-surfaces/${viewId}/contexts/${contextExternalId}/apps`;

    const res = await client.fetch(uri);
    if (!res.ok) throw res;
    const data = (await res.json()) as AppGroup[];
    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
