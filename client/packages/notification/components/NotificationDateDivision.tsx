import { useMemo } from 'react';
import { Notification } from '../types/Notification';
import { NotificationCard } from './NotificationCard';
import { tokens } from '@equinor/eds-tokens';
import { css } from '@emotion/react';

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

const get24HTime = (date: Date) => {
	const d = new Date(date);
	const min = d.getMinutes();
	return `${d.getHours()}:${min.toString().length === 1 ? '0' + min : min}`;
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
}

export const NotificationDateDivisions = ({ notifications, onClickNotification }: NotificationDateDivisionsProps) => {
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
			{notificationDivisions.map(
				(division) =>
					division.notifications.length > 0 && (
						<div className={StyledNotifications.name}>
							<div className={StyledNotificationsList.name}>
								{division.label}
								{sortList(division.notifications).map((notification, index) => (
									<NotificationCard
										key={notification.id + index}
										notification={notification}
										onNavigate={onClickNotification}
									/>
								))}
							</div>
						</div>
					)
			)}
		</>
	);
};

const StyledNotifications = css`
	display: flex;
	flex-direction: column;
	padding: 0em 1em;
	height: 100%;
`;

const StyledNotificationsList = css`
	display: flex;
	flex-direction: column;
	overflow: scroll;
	padding-bottom: 2rem;
	padding-right: 1em;
	height: 100%;

	::-webkit-scrollbar {
		height: 0.2rem;
		width: 0.3rem;
	}
	&:last-child {
		border-bottom: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
	}
`;
