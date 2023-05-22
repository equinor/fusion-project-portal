import { useFramework } from '@equinor/fusion-framework-react';
import { HubConnectionState } from '@microsoft/signalr';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { notificationQueries } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import { useSignalR } from '@equinor/fusion-framework-react/signalr';
import { map } from 'rxjs';

interface NotificationCenter {
	isFetchingRead: boolean;
	isFetchingUnRead: boolean;
	isEstablishingHubConnection: boolean;
	unreadNotificationsCount: number;
	unreadNotificationCards: Notification[];
	readNotificationCards: Notification[];
	hubConnectionState: ConnectionState;
}

export type ConnectionState = 'Connected' | 'Reconnecting' | 'Disconnected';

export function useNotificationCenter(onNotification?: (notification: Notification) => void): NotificationCenter {
	const queryClient = useQueryClient();

	const [state, setState] = useState<ConnectionState>('Disconnected');
	const client = useFramework().modules.serviceDiscovery.createClient('notification');

	const { getReadNotificationsQuery, getUnreadNotificationsQuery } = notificationQueries;

	const { data: readNotifications, isFetching: isFetchingRead } = useQuery<unknown, unknown, Notification[]>(
		getReadNotificationsQuery(client)
	);
	const { data: unreadNotifications, isFetching: isFetchingUnRead } = useQuery<unknown, unknown, Notification[]>(
		getUnreadNotificationsQuery(client)
	);

	const topic = useSignalR<Notification>('notifications', 'notifications');

	useLayoutEffect(() => {
		const onReconnecting = () => setState('Reconnecting');
		const onClose = () => setState('Disconnected');
		const onReconnected = () => setState('Connected');

		const sub = topic.subscribe(onNotificationReceived);
		topic.connection?.onclose(onClose);
		topic.connection?.onreconnected(onReconnected);
		topic.connection?.onreconnecting(onReconnecting);
		return () => {
			sub.unsubscribe();
		};
	}, [topic]);

	const onNotificationReceived = useCallback(
		(notification: Notification) => {
			onNotification && onNotification(notification);
			queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
		},
		[getUnreadNotificationsQuery, onNotification, queryClient]
	);

	return {
		hubConnectionState: state,
		isFetchingRead,
		isFetchingUnRead,
		isEstablishingHubConnection: false,
		readNotificationCards: readNotifications || [],
		unreadNotificationCards: unreadNotifications || [],
		unreadNotificationsCount: unreadNotifications?.length || 0,
	};
}
