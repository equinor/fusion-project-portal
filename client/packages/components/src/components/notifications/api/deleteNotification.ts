import { IHttpClient } from '@equinor/fusion-framework-module-http';

interface DeleteNotificationAsyncParams {
	notificationId: string;
	client: Promise<IHttpClient>;
}

export async function deleteNotificationAsync({
	notificationId,
	client,
}: DeleteNotificationAsyncParams): Promise<void> {
	const fusionNotifications = await client;

	await fusionNotifications.fetch(`notifications/${notificationId}?api-version=1.0`, {
		method: 'DELETE',
	});
}
