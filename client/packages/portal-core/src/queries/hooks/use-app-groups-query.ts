import { useQuery, UseQueryResult } from 'react-query';

import { useFrameworkCurrentContext, usePortalClient } from '../../hooks';
import { useViewController } from '../../providers';
import { AppGroup } from '../../types';
import { getAppGroups } from '../portal/getAppGroups';

export const useAppGroupsQuery = (): UseQueryResult<AppGroup[]> => {
	const id = useViewController().currentView?.id;
	const currentContext = useFrameworkCurrentContext();

	const client = usePortalClient();

	return useQuery({
		queryKey: ['appGroups', { id, externalId: currentContext?.externalId }],
		queryFn: () => getAppGroups(client, id, currentContext?.externalId),
	});
};
