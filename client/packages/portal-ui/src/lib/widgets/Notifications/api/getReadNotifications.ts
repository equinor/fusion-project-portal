import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Notification } from '../types/Notification';
import { NotificationList } from '../types/NotificationList';

export async function getReadNotificationCardsAsync(client: Promise<IHttpClient>): Promise<Notification[]> {
	const fusionNotifications = await client;

	const filter = 'seenByUser eq true';

	const order = `$orderby=created%20desc`;

	const take = '$top=1000';

	const list: NotificationList = await fusionNotifications
		.fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}&${take}`)
		.then((x) => x.json());

	return list.value.map((notif): Notification => {
		return {
			...notif,
			appName: notif.appKey ? notif.appKey : notif?.sourceSystem?.subSystem ?? 'Unknown',
			actionType: notif.appKey ? 'URL' : 'Identifier',
		};
	});
}
