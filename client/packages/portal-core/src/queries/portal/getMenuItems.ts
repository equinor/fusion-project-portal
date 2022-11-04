import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AppGroup, View } from '../../types/view';

/** Get menu items based on current view id */
export async function getMenuItems(
  client: IHttpClient,
  viewId?: string
): Promise<AppGroup[]> {
  if (!viewId) return [];
  const res = await client.fetch(`/api/work-surfaces/${viewId}`);
  if (!res.ok) throw res;
  return ((await res.json()) as View).appGroups;
}
