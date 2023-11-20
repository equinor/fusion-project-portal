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
import { tokens } from '@equinor/eds-tokens';

Icon.add({ delete_to_trash });

interface NotificationCardProps {
	notification: Notification;
	onNavigate?: () => void;
}
const styles = {
	notificationCard: css`
		border-radius: 4px;
		width: 100%;
		position: relative;
		border: 1px solid ${tokens.colors.ui.background__light.hex};
		box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 0px 3px rgba(0, 0, 0, 0.14);
	`,
	notificationCardContent: css`
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		overflow: hidden;
	`,
	notificationActions: css`
		padding: 1rem;
	`,
	notificationDelete: css`
		position: absolute;
		right: 0;
		padding: 0.1rem;
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
				<div className={styles.notificationDelete}>
					<Button onClick={clickDelete} variant="ghost_icon">
						<Icon name={delete_to_trash.name} />
					</Button>
				</div>
			</div>
			{!notification.seenByUser && (
				<div className={styles.notificationActions}>
					<Button variant="ghost" onClick={clickMarkAsRead}>
						Mark as read
					</Button>
				</div>
			)}
		</div>
	);
};
