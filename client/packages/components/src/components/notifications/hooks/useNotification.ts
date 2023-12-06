import { useFramework } from '@equinor/fusion-framework-react';
import { useQueryClient, useMutation } from 'react-query';
import { deleteNotificationAsync } from '../api/deleteNotification';
import { readNotificationAsync } from '../api/readNotification';
import { notificationsBaseKey, useNotificationQueries } from '../queries/notificationQueries';
import { useNotificationMutationKeys } from './useNotificationMutationKeys';

export const useNotification = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const queryClient = useQueryClient();

	const { read, deleteMutation } = useNotificationMutationKeys();
	const { getUnreadNotificationsQuery } = useNotificationQueries(client);

	const baseKey = notificationsBaseKey;

	const { mutate: markAsRead } = useMutation(
		read,
		(notificationId: string) => readNotificationAsync({ notificationId, client }),
		{
			onSuccess: () => queryClient.invalidateQueries(baseKey),
		}
	);

	const { mutate: deleteNotification } = useMutation(
		deleteMutation,
		(notificationId: string) => deleteNotificationAsync({ notificationId, client }),
		{
			onSuccess: () => queryClient.invalidateQueries(baseKey),
		}
	);

	const onNotification = () => queryClient.invalidateQueries(getUnreadNotificationsQuery().queryKey);

	return {
		markAsRead,
		deleteNotification,
		onNotification,
	};
};
