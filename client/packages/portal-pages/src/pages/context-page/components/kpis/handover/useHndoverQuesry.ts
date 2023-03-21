import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { ProjectMaster } from '../../project-cards/ProjectDetails';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { HandoverPackage } from './types';

export async function getHandoverData(client: IHttpClient, contextId?: string): Promise<HandoverPackage[] | undefined> {
	if (!contextId) return;
	const res = await client.fetch(`/api/contexts/${contextId}/handover`);
	if (!res.ok) throw new Error('No data to display');
	return (await res.json()) as HandoverPackage[];
}

export const useHandoverQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('data-proxy');
	const currentContext = useFrameworkCurrentContext<ProjectMaster>();
	const contextId = currentContext?.id;
	return useQuery({
		queryKey: ['´Handover-kpis', contextId],
		queryFn: async () => getHandoverData(await client, contextId),
	});
};
