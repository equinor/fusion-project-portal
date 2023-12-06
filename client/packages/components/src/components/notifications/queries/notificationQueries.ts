import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { UseMutationOptions, UseQueryOptions, useQueryClient } from 'react-query';
import { getReadNotificationCardsAsync } from '../api/getReadNotifications';
import { getUnreadNotificationCardsAsync } from '../api/getUnreadNotifications';
import { getNotificationSettingsAsync } from '../api/getNotificationSettings';
import { updateNotificationSettingsAsync } from '../api/updateNotificationSettings';
import { NotificationSettings } from '../types/NotificationSettings';

export const notificationsBaseKey = ['Notifications'];

type Options = Pick<
	UseQueryOptions,
	'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey' | 'refetchInterval' | 'initialData'
>;

export const initialData = {
	email: true,
	delayInMinutes: 60,
	appConfig: [
		{
			appKey: 'resources',
			enabled: true,
		},
		{
			appKey: 'query',
			enabled: true,
		},
		{
			appKey: 'meetings',
			enabled: true,
		},
		{
			appKey: 'reviews',
			enabled: true,
		},
	],
};

export const useNotificationQueries = (client: Promise<IHttpClient>) => ({
	getUnreadNotificationsQuery: (): Options => ({
		queryFn: () => getUnreadNotificationCardsAsync(client),
		queryKey: [...notificationsBaseKey, 'Unread'],
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
	}),
	getReadNotificationsQuery: (): Options => ({
		queryFn: () => getReadNotificationCardsAsync(client),
		queryKey: [...notificationsBaseKey, 'read'],
		cacheTime: 5000 * 60,
	}),
	getNotificationSettings: (): UseQueryOptions<NotificationSettings, unknown, NotificationSettings> => ({
		queryFn: () => getNotificationSettingsAsync(client),
		queryKey: [...notificationsBaseKey, 'settings'],
		cacheTime: 5000 * 60,
		initialData,
	}),
});

export const useNotificationMutations = (client: Promise<IHttpClient>) => {
	const queryClient = useQueryClient();
	const mutationKey = [...notificationsBaseKey, 'settings'];
	return {
		updateNotificationSettings: (): UseMutationOptions<NotificationSettings, unknown, NotificationSettings> => ({
			mutationFn: async (data) => updateNotificationSettingsAsync(client, data),
			mutationKey,
			onMutate: (data) => {
				queryClient.setQueriesData(mutationKey, data);
			},
			onSuccess() {
				queryClient.invalidateQueries(mutationKey);
			},
		}),
	};
};
