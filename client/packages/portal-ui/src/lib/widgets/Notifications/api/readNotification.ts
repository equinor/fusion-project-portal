import { IHttpClient } from '@equinor/fusion-framework-module-http';

interface ReadNotificationAsyncParams {
	notificationId: string;
	client: Promise<IHttpClient>;
}

export async function readNotificationAsync({ notificationId, client }: ReadNotificationAsyncParams): Promise<void> {
	const fusionNotifications = await client;

	await fusionNotifications.fetch(`notifications/${notificationId}?api-version=1.0`, {
		method: 'PATCH',
		body: JSON.stringify({
			seenByUser: true,
		}),
	});
}
