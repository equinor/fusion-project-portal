import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { UseQueryOptions } from 'react-query';
import { getReadNotificationCardsAsync } from '../api/getReadNotifications';
import { getUnreadNotificationCardsAsync } from '../api/getUnreadNotifications';

export const notificationsBaseKey = ['Notifications'];

type Options = Pick<UseQueryOptions, 'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey' | 'refetchInterval'>;

export const notificationQueries = {
	getUnreadNotificationsQuery: (client: Promise<IHttpClient>): Options => ({
		queryFn: () => getUnreadNotificationCardsAsync(client),
		queryKey: [...notificationsBaseKey, 'Unread'],
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
	}),
	getReadNotificationsQuery: (client: Promise<IHttpClient>): Options => ({
		queryFn: () => getReadNotificationCardsAsync(client),
		queryKey: [...notificationsBaseKey, 'read'],
		cacheTime: 5000 * 60,
	}),
};
