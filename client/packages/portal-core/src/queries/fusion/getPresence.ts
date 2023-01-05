import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Presence } from '@equinor/portal-ui';

export async function getPresence(
  client: IHttpClient,
  userId: string
): Promise<Presence> {
  const res = await client.fetch(`/persons/${userId}/presence`);
  if (!res.ok) throw res;
  return (await res.json()) as Presence;
}
