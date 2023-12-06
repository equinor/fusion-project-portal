import { useMutation, useQuery } from 'react-query';
import { initialData, useNotificationMutations, useNotificationQueries } from '../queries/notificationQueries';
import { useFramework } from '@equinor/fusion-framework-react';
import { NotificationSettings } from '../types/NotificationSettings';
import { useCallback, useMemo } from 'react';

export const useNotificationSettings = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const { data, isFetching } = useQuery<NotificationSettings>(
		useNotificationQueries(client).getNotificationSettings()
	);

	const settings = useMemo(() => {
		return data || initialData;
	}, [data]);

	const { mutate } = useMutation(useNotificationMutations(client).updateNotificationSettings());

	const updateSettings = useCallback(
		(
			newSettings:
				| Partial<NotificationSettings>
				| ((settings: NotificationSettings) => Partial<NotificationSettings>)
		) => {
			if (typeof newSettings === 'function') {
				mutate({ ...settings, ...newSettings(settings) });
				return;
			}
			mutate({ ...settings, ...newSettings });
		},
		[settings, mutate]
	);

	return { settings, isFetching, updateSettings };
};
