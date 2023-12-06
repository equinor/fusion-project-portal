import { useFramework } from '@equinor/fusion-framework-react';
import { useCallback, useLayoutEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNotificationQueries } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import { useSignalR } from '@equinor/fusion-framework-react/signalr';

interface NotificationCenter {
	isFetchingRead: boolean;
	isFetchingUnRead: boolean;
	isEstablishingHubConnection: boolean;
	unreadNotificationsCount: number;
	unreadNotificationCards: Notification[];
	readNotificationCards: Notification[];
}

export function useNotificationCenter(onNotification?: (notification: Notification) => void): NotificationCenter {
	const queryClient = useQueryClient();
	const client = useFramework().modules.serviceDiscovery.createClient('notification');

	const { getReadNotificationsQuery, getUnreadNotificationsQuery } = useNotificationQueries(client);

	const { data: readNotifications, isFetching: isFetchingRead } = useQuery<unknown, unknown, Notification[]>(
		getReadNotificationsQuery()
	);
	const { data: unreadNotifications, isFetching: isFetchingUnRead } = useQuery<unknown, unknown, Notification[]>(
		getUnreadNotificationsQuery()
	);

	const topic = useSignalR<Notification>('notifications', 'notifications');

	useLayoutEffect(() => {
		const sub = topic.subscribe(onNotificationReceived);
		return () => {
			sub.unsubscribe();
		};
	}, [topic]);

	const onNotificationReceived = useCallback(
		(notification: Notification) => {
			onNotification && onNotification(notification);
			queryClient.invalidateQueries(getUnreadNotificationsQuery().queryKey);
		},
		[getUnreadNotificationsQuery, onNotification, queryClient]
	);

	return {
		isFetchingRead,
		isFetchingUnRead,
		isEstablishingHubConnection: false,
		readNotificationCards: readNotifications || [],
		unreadNotificationCards: unreadNotifications || [],
		unreadNotificationsCount: unreadNotifications?.length || 0,
	};
}
