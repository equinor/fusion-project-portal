import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../api/readNotification';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import AdaptiveCardViewer from './adaptivCard/AdaptivCardViewer';
import { css } from '@emotion/react';

interface NotificationCardProps {
	notification: Notification;
	onNavigate?: () => void;
}

export const NotificationCard = ({ notification }: NotificationCardProps): JSX.Element => {
	const queryClient = useQueryClient();
	const { read } = useNotificationMutationKeys();
	const client = useFramework().modules.serviceDiscovery.createClient('notification');

	const baseKey = notificationsBaseKey;

	const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
		onSuccess: () => queryClient.invalidateQueries(baseKey),
	});

	const handleClick = () => {
		markAsRead({ notificationId: notification?.id, client });
	};

	return (
		<div className={styledNotificationCard.name}>
			<AdaptiveCardViewer payload={notification.card} />
		</div>
	);
};

const styledNotificationCard = css`notificationCard: {
	borderRadius: '4px',
	backgroundColor: 'var(--color-black-alt5)',
}`;
