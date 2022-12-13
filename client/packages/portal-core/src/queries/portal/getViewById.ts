import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { View } from '../../types/view';

/** Get menu items based on current view id */
export async function getViewById(
  client: IHttpClient,
  viewId?: string,
  contextExternalId?: string
): Promise<View | undefined> {
  try {
    if (!viewId) return undefined;
    let uri = `/api/work-surfaces/${viewId}`;

    if (contextExternalId) {
      uri = `/api/work-surfaces/${viewId}/contexts/${contextExternalId}`;
    }

    const res = await client.fetch(uri);
    if (!res.ok) throw res;
    const data = (await res.json()) as View;
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
