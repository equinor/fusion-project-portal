import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';

import { ServiceMessage } from '../types/types';

export async function getActiveServiceMessages(client: IHttpClient): Promise<ServiceMessage[]> {
	const res = await client.fetch(`/api/service-messages/active`);
	if (!res.ok) throw res;
	return (await res.json()) as ServiceMessage[];
}

export const useServiceMessageQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('portal');

	return useQuery({
		queryKey: ['service-message'],
		queryFn: async () => getActiveServiceMessages(await client),
	});
};
