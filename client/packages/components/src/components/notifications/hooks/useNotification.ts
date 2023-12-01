import { useFramework } from '@equinor/fusion-framework-react';
import { useQueryClient, useMutation } from 'react-query';
import { deleteNotificationAsync } from '../api/deleteNotification';
import { readNotificationAsync } from '../api/readNotification';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { useNotificationMutationKeys } from './useNotificationMutationKeys';

export const useNotification = () => {
	const queryClient = useQueryClient();
	const { read, deleteMutation } = useNotificationMutationKeys();
	const client = useFramework().modules.serviceDiscovery.createClient('notification');

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

	return {
		markAsRead,
		deleteNotification,
	};
};
