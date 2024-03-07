import { useQuery, UseQueryResult } from 'react-query';
import { useFrameworkCurrentContext, usePortalClient } from '@equinor/portal-core';
import { getAppGroups } from '../queries/getAppGroups';
import { AppCategory, usePortalConfig } from '../../modules';

export const useAppGroupsQuery = (): UseQueryResult<AppCategory[]> => {
	const { data } = usePortalConfig().queryPortal;
	const currentContext = useFrameworkCurrentContext();

	const client = usePortalClient();

	return useQuery({
		queryKey: ['appGroups', JSON.stringify({ id: data?.id, externalId: currentContext?.id })],
		queryFn: () => getAppGroups(client, data?.id, currentContext?.id),
	});
};
