import { useFramework } from '@equinor/fusion-framework-react';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';

import { useQuery } from 'react-query';

import { getCurrentUserInfo, getUserInfo, getUserPhotoById } from '../queries';
import { PersonDetails, FusionError } from '@portal/types';

export const useCurrentUserQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');
	const user = useCurrentUser();

	return useQuery<PersonDetails, FusionError>({
		queryKey: ['current-user-info', user?.localAccountId],
		queryFn: async () => getCurrentUserInfo(await client, user?.localAccountId),
		enabled: Boolean(user?.localAccountId),
	});
};

export const useUserQuery = (azureId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');
	return useQuery<PersonDetails, FusionError>({
		queryKey: ['user-info', azureId],
		queryFn: async () => getUserInfo(await client, azureId),
		enabled: Boolean(azureId),
	});
};

export const useUserPhotoQuery = (userId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');

	return useQuery<string, FusionError>({
		queryKey: ['user-photo', userId],
		queryFn: async () => getUserPhotoById(await client, userId ?? ''),
		enabled: Boolean(userId),
		_defaulted: undefined,
	});
};
