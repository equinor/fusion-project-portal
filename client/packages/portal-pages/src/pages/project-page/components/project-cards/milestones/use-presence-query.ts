import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';

import { useQuery } from 'react-query';

type Milestones = {
	siteCodes: string[];
	projectIdentifier: string;
	milestone: string;
	description: string;
	datePlanned: string;
	dateForecast: string;
	dateActual: string;
	contractMilestone: string;
};

export async function getMilestones(
	client: IHttpClient,
	contextId?: string,
	signal?: AbortSignal
): Promise<Milestones[] | undefined> {
	if (!contextId) return;

	const res = await client.fetch(`/api/contexts/${contextId}/milestones`, { signal });

	if (res.status === 403) throw new Error('No access');
	if (!res.ok) throw new Error('Unknown Error');
	return (await res.json()) as Milestones[];
}

export const useMilestoneQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('data-proxy');
	const { currentContext } = useFramework().modules.context;
	const contextId = currentContext?.id;
	return useQuery({
		queryKey: ['milestones', contextId],
		queryFn: async ({ signal }) => getMilestones(await client, contextId, signal),
	});
};
