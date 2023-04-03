import { useFramework } from '@equinor/fusion-framework-react';
import { HubConnectionState } from '@microsoft/signalr';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { notificationQueries } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import { useSignalRHub } from './useSignalRHub';

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

	// TODO: useFramework signalRframework
	// const { hubConnection } = useSignalRHub(
	// 	`${fusion.getBaseUrl()}/signalr/hubs/notifications/?negotiateVersion=1`,
	// 	fusion.getAccessToken
	// );

	const onNotificationRecieved = useCallback(
		(notification: Notification) => {
			onNotification && onNotification(notification);
			queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
		},
		[getUnreadNotificationsQuery, onNotification, queryClient]
	);

	const onReconnecting = () => setState('Reconnecting');
	const onClose = () => setState('Disconnected');
	const onReconnected = () => setState('Connected');

	// useEffect(() => {
	// 	if (hubConnection) {
	// 		hubConnection.state === HubConnectionState.Connected && setState('Connected');
	// 		hubConnection.onclose(onClose);
	// 		hubConnection.onreconnected(onReconnected);
	// 		hubConnection.onreconnecting(onReconnecting);
	// 		hubConnection.on('notifications', onNotificationRecieved);
	// 		return () => hubConnection.off('notifications', onNotificationRecieved);
	// 	}
	// }, [hubConnection, onNotificationRecieved]);

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
