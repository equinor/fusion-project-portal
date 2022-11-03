import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Phase } from '../../types/portal-config';

/** Get views from portal api */
export async function getViews(client: IHttpClient): Promise<Phase[]> {
  const res = await client.fetch(`/api/work-surfaces`);
  if (!res.ok) throw res;
  return (await res.json()) as Phase[];
}
