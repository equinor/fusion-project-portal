import { useQuery } from 'react-query';
import { usePortalClient } from '../../hooks/use-portal-client';

import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { OnboardedContext } from '@portal/types';

/** Get The Available Contexts for the solution */
export async function getAvailableContext(client: IHttpClient): Promise<OnboardedContext[]> {
	const res = await client.fetch(`/api/onboarded-contexts`);
	if (!res.ok) throw res;
	return (await res.json()) as OnboardedContext[];
}

export const useOnboardedContextsQuery = () => {
	const client = usePortalClient();
	return useQuery({
		queryKey: ['awaitable-contexts'],
		queryFn: () => getAvailableContext(client),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
};
