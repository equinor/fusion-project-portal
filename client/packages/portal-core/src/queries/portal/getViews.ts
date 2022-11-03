import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { UseQueryOptions } from 'react-query';
import { Phase } from '../../types/portal-config';

export async function getViews(client: IHttpClient): Promise<Phase[]> {
  const res = await client.fetch(`/api/work-surfaces`);
  if (!res.ok) throw res;
  return (await res.json()) as Phase[];
}

export const getViewsQuery = (
  client: IHttpClient,
  args?: Partial<UseQueryOptions<unknown, Response, Phase[]>>
) => {
  return {
    queryKey: ['phases'],
    queryFn: () => getViews(client),
    cacheTime: Infinity,
    staleTime: Infinity,
    ...args,
  };
};
