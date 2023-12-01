import { Button } from '@equinor/eds-core-react';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { useNotification } from '../hooks/useNotification';

export const MarkAllAsReadButton = () => {
	const { onNotification, markAsRead } = useNotification();
	const { unreadNotificationCards } = useNotificationCenter(onNotification);

	const clickMarkAllAsRead = () => {
		unreadNotificationCards.map((notification) => markAsRead(notification?.id));
	};
	return (
		<Button variant="ghost" disabled={unreadNotificationCards.length === 0} onClick={() => clickMarkAllAsRead()}>
			Mark all as read
		</Button>
	);
};
