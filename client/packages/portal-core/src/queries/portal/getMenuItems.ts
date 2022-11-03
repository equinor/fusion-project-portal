import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { QueryKey, UseQueryOptions } from 'react-query';
import { AppGroup, Phase } from '../../types/portal-config';

export async function getMenuItems(
  client: IHttpClient,
  viewId?: string
): Promise<AppGroup[]> {
  const res = await client.fetch(`/api/work-surfaces/${viewId}`);
  if (!res.ok) throw res;
  return ((await res.json()) as Phase).appGroups;
}

export const getMenuItemsQuery = (
  client: IHttpClient,
  viewId?: string,
  args?: Partial<UseQueryOptions<typeof getMenuItems, Response, AppGroup[]>>
) => {
  return {
    queryKey: ['menu-items', viewId ?? ''],
    queryFn: () => getMenuItems(client, viewId),
    cacheTime: Infinity,
    staleTime: Infinity,
    ...args,
  };
};
