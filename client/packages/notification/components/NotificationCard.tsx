import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../api/readNotification';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import AdaptiveCardViewer from './adaptivCard/AdaptivCardViewer';
import { css } from '@emotion/css';
import { Button, Icon } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { deleteNotificationAsync } from '../api/deleteNotification';

Icon.add({ delete_to_trash });

interface NotificationCardProps {
	notification: Notification;
	onNavigate?: () => void;
}
const styles = {
	notificationCard: css`
		border-radius: 4px;
		background-color: var(--color-black-alt5);
		border: 1px solid #000;
	`,
	notificationCardContent: css`
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		overflow: hidden;
	`,
	notificationActions: css`
		padding: 1rem;
	`,
};

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
		<div className={styles.notificationCard}>
			<div className={styles.notificationCardContent}>
				<AdaptiveCardViewer payload={notification.card} />
				<div>
					<Button onClick={clickDelete} variant="ghost_icon">
						<Icon name={delete_to_trash.name} />
					</Button>
				</div>
			</div>
			{!notification.seenByUser && (
				<div className={styles.notificationActions}>
					<Button onClick={clickMarkAsRead}>Mark as read</Button>
				</div>
			)}
		</div>
	);
};
