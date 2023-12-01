import { useMutation, useQuery } from 'react-query';
import { initialData, useNotificationMutations, useNotificationQueries } from '../queries/notificationQueries';
import { useFramework } from '@equinor/fusion-framework-react';
import { NotificationSettings } from '../types/NotificationSettings';

export const useNotificationSettings = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const { data, isFetching, error } = useQuery<NotificationSettings>(
		useNotificationQueries(client).getNotificationSettings()
	);
	const { mutate, mutateAsync } = useMutation(useNotificationMutations(client).updateNotificationSettings());

	return { settings: data || initialData, isFetching, error, mutateAsync, mutate };
};
