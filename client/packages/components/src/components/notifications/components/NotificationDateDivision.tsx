import { useMemo } from 'react';
import { Notification } from '../types/Notification';
import { NotificationCard } from './NotificationCard';
import { PortalMessage } from '@portal/ui';
import { Divider, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

type DateDivisionKey = 'today' | 'this-week' | 'last-week' | 'more-than-one-week';

type DateDivision = {
	key: DateDivisionKey;
	label: string;
	accessor: (notification: Notification) => boolean;
	notifications: Notification[];
};

const getMonday = (date: Date) => {
	const d = new Date(date);
	const day = d.getDay();
	const diff = d.getDate() - day + (day == 0 ? -6 : 1);
	return new Date(d.setDate(diff));
};

const isNotificationFromToday = (notification: Notification) =>
	!!(new Date(notification.created).toDateString() === new Date().toDateString());

const isNotificationFromThisWeek = (notification: Notification) =>
	!!(getMonday(new Date(notification.created)).toDateString() === getMonday(new Date()).toDateString());

const isNotificationFromLastWeek = (notification: Notification) =>
	!!(
		getMonday(new Date(notification.created)).toDateString() ===
		getMonday(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toDateString()
	);

const divisions: DateDivision[] = [
	{
		key: 'today',
		label: 'Today',
		accessor: (n) => isNotificationFromToday(n),
		notifications: [],
	},
	{
		key: 'this-week',
		label: 'This week',
		accessor: (n) => isNotificationFromThisWeek(n) && !isNotificationFromToday(n),
		notifications: [],
	},
	{
		key: 'last-week',
		label: 'Last week',
		accessor: (n) => isNotificationFromLastWeek(n),
		notifications: [],
	},
	{
		key: 'more-than-one-week',
		label: 'More than one week ago',
		accessor: (n) =>
			!(isNotificationFromLastWeek(n) || isNotificationFromToday(n) || isNotificationFromThisWeek(n)),
		notifications: [],
	},
];

interface NotificationDateDivisionsProps {
	notifications: Notification[];
	onClickNotification?: () => void;
	title: string;
}

const Styles = {
	NotificationsList: styled.div`
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		height: 100%;
		gap: 1rem;
		::-webkit-scrollbar {
			height: 0.2rem;
			width: 0.3rem;
		}
		&:last-child {
			margin-bottom: 1rem;
		}
	`,
	NoContent: styled.div`
		height: 35vh;
		display: flex;
		justify-content: center;
	`,
};

export const NotificationDateDivisions = ({
	notifications,
	onClickNotification,
	title,
}: NotificationDateDivisionsProps) => {
	const notificationDivisions = useMemo(() => {
		return divisions.map((d) => ({
			...d,
			notifications: notifications.filter((n) => d.accessor(n)),
		}));
	}, [notifications, divisions]);

	const sortList = (list: Notification[]) =>
		list.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

	return (
		<>
			{notifications.length > 0 ? (
				notificationDivisions.map(
					(division) =>
						division.notifications.length > 0 && (
							<>
								<Styles.NotificationsList key={division.key}>
									<Typography variant="h6">{division.label}</Typography>
									{sortList(division.notifications).map((notification, index) => (
										<NotificationCard
											divisionLabel={division.label}
											key={notification.id + index}
											notification={notification}
											onNavigate={onClickNotification}
										/>
									))}
								</Styles.NotificationsList>
								<Divider />
							</>
						)
				)
			) : (
				<Styles.NoContent>
					<PortalMessage type="NoContent" title="No Notification">
						You have no {title.toLowerCase()} notification
					</PortalMessage>
				</Styles.NoContent>
			)}
		</>
	);
};
