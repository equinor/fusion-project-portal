import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';

import { useQuery } from 'react-query';

interface Milestones {
	siteCodes: string[];
	projectIdentifier: string;
	milestone: string;
	description: string;
	datePlanned: string;
	dateForecast: string;
	dateActual: string;
	contractMilestone: string;
}

export async function getMilestones(
	client: IHttpClient,
	contextId?: string,
	signal?: AbortSignal
): Promise<Milestones[] | undefined> {
	if (!contextId) return;
	const res = await client.fetch(`/api/contexts/${contextId}/milestones`, { signal });
	if (!res.ok) throw res;
	return (await res.json()) as Milestones[];
}

export const useMilestoneQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('data-proxy');
	const currentContext = useFramework().modules.context.currentContext;
	const contextId = currentContext?.id;
	return useQuery({
		queryKey: ['milestones', contextId],
		queryFn: async ({ signal }) => getMilestones(await client, contextId, signal),
	});
};
