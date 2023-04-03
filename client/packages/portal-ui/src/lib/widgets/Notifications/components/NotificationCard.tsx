import { useFramework } from '@equinor/fusion-framework-react';
import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../api/readNotification';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import { DetailText, LeftSection, NotificationTitle, RightSection, TimeStamp, Wrapper } from './assignmentCard.styles';
import { StatusCircle } from './StatusCircle';

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
		<Wrapper onClick={handleClick}>
			<LeftSection>
				<StatusCircle seenByUser={notification.seenByUser} />
				<DetailText>
					<NotificationTitle>{notification.title}</NotificationTitle>
				</DetailText>
			</LeftSection>
			<RightSection></RightSection>
			<TimeStamp>
				{DateTime.fromJSDate(new Date(notification.created)).toRelative({
					locale: 'en-GB',
				})}
			</TimeStamp>
		</Wrapper>
	);
};
