import { useFramework } from '@equinor/fusion-framework-react';
import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../api/readNotification';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import {
	StyledDetailText,
	StyledLeftSection,
	StyledNotificationTitle,
	StyledRightSection,
	StyledTimeStamp,
	StyledWrapper,
} from './assignmentCard.styles';
import { StatusCircle } from './StatusCircle';
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

	// return (
	// 	<StyledWrapper onClick={handleClick}>
	// 		<StyledLeftSection>
	// 			<StatusCircle seenByUser={notification.seenByUser} />
	// 			<StyledDetailText>
	// 				<StyledNotificationTitle>{notification.title}</StyledNotificationTitle>
	// 			</StyledDetailText>
	// 		</StyledLeftSection>
	// 		<StyledRightSection></StyledRightSection>
	// 		<StyledTimeStamp>
	// 			{DateTime.fromJSDate(new Date(notification.created)).toRelative({
	// 				locale: 'en-GB',
	// 			})}
	// 		</StyledTimeStamp>
	// 	</StyledWrapper>
	// );
};

const styledNotificationCard = css`notificationCard: {
	borderRadius: '4px',
	backgroundColor: 'var(--color-black-alt5)',
}`;
