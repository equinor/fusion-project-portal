import { useQuery, UseQueryResult } from 'react-query';
import { useFrameworkCurrentContext, usePortalClient, useViewController } from '@equinor/portal-core';
import { AppGroup } from '@portal/types';
import { getAppGroups } from '../queries/getAppGroups';

export const useAppGroupsQuery = (): UseQueryResult<AppGroup[]> => {
	const id = useViewController().currentView?.id;
	const currentContext = useFrameworkCurrentContext();

	const client = usePortalClient();

	return useQuery({
		queryKey: ['appGroups', { id, externalId: currentContext?.id }],
		queryFn: () => getAppGroups(client, id, currentContext?.id),
	});
};
