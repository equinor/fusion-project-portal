import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';

import { useQuery } from '@tanstack/react-query';

import { PersonDetails } from '../types';
import { getCurrentUserInfo } from '../queries/user-info-query';

export const useCurrentUserInfo = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');
	const user = useCurrentUser();

	const { data, error, isLoading } = useQuery<PersonDetails, Error>({
		queryKey: ['current-user-info', user?.localAccountId],
		queryFn: async () => getCurrentUserInfo(await client, user?.localAccountId),
		enabled: Boolean(user?.localAccountId),
	});

	return { currentUserInfo: data, error, isLoading };
};
