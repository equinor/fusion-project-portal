import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { NotificationSettings } from '../types/NotificationSettings';

export async function updateNotificationSettingsAsync(
	client: Promise<IHttpClient>,
	body: NotificationSettings
): Promise<NotificationSettings> {
	const fusionNotifications = await client;

	return await fusionNotifications
		.fetch(`persons/me/notifications/settings`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		.then((x) => x.json());
}
