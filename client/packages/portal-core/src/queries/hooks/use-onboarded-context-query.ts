import { useQuery } from 'react-query';
import { usePortalClient } from '../../hooks/use-portal-client';
import { getAvailableContext } from '../portal/getAvailableContexts';

export const useOnboardedContextsQuery = () => {
	const client = usePortalClient();
	return useQuery({
		queryKey: ['awaitable-contexts'],
		queryFn: () => getAvailableContext(client),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
};
