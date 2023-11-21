import { Button } from '@equinor/eds-core-react';

import { useMutation, useQueryClient } from 'react-query';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { notificationQueries, notificationsBaseKey } from '../queries/notificationQueries';
import { useFramework } from '@equinor/fusion-framework-react';

import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { readNotificationAsync } from '../api/readNotification';

export const MarkAllAsReadButton = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const queryClient = useQueryClient();
	const { read } = useNotificationMutationKeys();
	const baseKey = notificationsBaseKey;
	const { getUnreadNotificationsQuery } = notificationQueries;

	const onNotification = () => queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
	const { unreadNotificationCards } = useNotificationCenter(onNotification);

	const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
		onSuccess: () => queryClient.invalidateQueries(baseKey),
	});

	const clickMarkAllAsRead = () => {
		unreadNotificationCards.map((notification) => markAsRead({ notificationId: notification?.id, client }));
	};
	return (
		<Button variant="ghost" onClick={() => clickMarkAllAsRead()}>
			Mark all as read
		</Button>
	);
};
