import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { View } from '../../types/view';

/** Get menu items based on current view id */
export async function getViewById(
  client: IHttpClient,
  viewId?: string
): Promise<View | undefined> {
  if (!viewId) return undefined;
  const res = await client.fetch(`/api/work-surfaces/${viewId}`);
  if (!res.ok) throw res;
  return (await res.json()) as View;
}
