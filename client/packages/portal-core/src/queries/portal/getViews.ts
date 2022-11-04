import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { View } from '../../types/view';

/** Get views from portal api */
export async function getViews(client: IHttpClient): Promise<View[]> {
  const res = await client.fetch(`/api/work-surfaces`);
  if (!res.ok) throw res;
  return (await res.json()) as View[];
}
