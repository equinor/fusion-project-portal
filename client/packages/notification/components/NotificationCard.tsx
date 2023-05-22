import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../api/readNotification';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import AdaptiveCardViewer from './adaptivCard/AdaptivCardViewer';
import { css } from '@emotion/react';
import { Button, Icon } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { deleteNotificationAsync } from '../api/deleteNotification';

Icon.add({ delete_to_trash });

interface NotificationCardProps {
	notification: Notification;
	onNavigate?: () => void;
}

export const NotificationCard = ({ notification }: NotificationCardProps): JSX.Element => {
	const queryClient = useQueryClient();
	const { read, deleteMutation } = useNotificationMutationKeys();
	const client = useFramework().modules.serviceDiscovery.createClient('notification');

	const baseKey = notificationsBaseKey;

	const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
		onSuccess: () => queryClient.invalidateQueries(baseKey),
	});

	const { mutate: deleteNotification } = useMutation(deleteMutation, deleteNotificationAsync, {
		onSuccess: () => queryClient.invalidateQueries(baseKey),
	});

	const clickMarkAsRead = () => {
		markAsRead({ notificationId: notification?.id, client });
	};

	const clickDelete = () => {
		deleteNotification({ notificationId: notification?.id, client });
	};

	return (
		<div className={styledNotificationCard.name}>
			<AdaptiveCardViewer payload={notification.card} />
			{!notification.seenByUser ? <Button onClick={clickMarkAsRead}>Mark as read</Button> : null}
			<Button onClick={clickDelete} variant="ghost_icon">
				{' '}
				<Icon name={delete_to_trash.name} />
			</Button>
		</div>
	);
};

const styledNotificationCard = css`notificationCard: {
	borderRadius: '4px',
	backgroundColor: 'var(--color-black-alt5)',
}`;
