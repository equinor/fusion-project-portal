import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { NotificationSettings } from '../types/NotificationSettings';

export async function getNotificationSettingsAsync(client: Promise<IHttpClient>): Promise<NotificationSettings> {
	const fusionNotifications = await client;

	return await fusionNotifications.fetch(`persons/me/notifications/settings`).then((x) => x.json());
}
