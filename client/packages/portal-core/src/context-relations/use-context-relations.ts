import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Relations } from './types';

export async function getContextRelations(
	client: IHttpClient,
	contextId?: string,
	signal?: AbortSignal
): Promise<Relations[] | undefined> {
	if (!contextId) return;
	const res = await client.fetch(`/contexts/${contextId}/relations`, { signal });
	if (!res.ok) throw res;
	return (await res.json()) as Relations[];
}
export async function getContextTstRelations(
	client: Promise<IHttpClient>,
	signal?: AbortSignal
): Promise<Relations[] | undefined> {
	const res = await (await client).fetch(`/contexts/71db33bb-cb1b-42cf-b5bf-969c77e40931/relations`, { signal });
	if (!res.ok) throw res;
	return (await res.json()) as Relations[];
}

export const useContextRelationsQuery = (contextId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('context');

	return useQuery({
		queryKey: ['context-relations', contextId],
		queryFn: async ({ signal }) => getContextRelations(await client, contextId, signal),
		enabled: Boolean(contextId),
	});
};

type RelationsTypes = 'EquinorTask' | 'Contract' | 'ProjectMaster' | 'PimsDomain' | 'Project' | 'OrgChart';

export function useRelationsByType(type: RelationsTypes, contextId?: string) {
	const { data } = useContextRelationsQuery(contextId);
	return data?.filter((relation) => relation.type.id === type) || [];
}
