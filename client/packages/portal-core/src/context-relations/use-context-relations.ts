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

export const useContextRelationsQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('context');
	const { currentContext } = useFramework().modules.context;
	const contextId = currentContext?.id;
	return useQuery({
		queryKey: ['context-relations', contextId],
		queryFn: async ({ signal }) => getContextRelations(await client, contextId, signal),
	});
};

type RelationsTypes = 'EquinorTask' | 'Contract' | 'ProjectMaster' | 'PimsDomain' | 'Project' | 'OrgChart';

export function useRelationsByType(type: RelationsTypes) {
	const { data } = useContextRelationsQuery();
	return data?.filter((relation) => relation.type.id === type) || [];
}
