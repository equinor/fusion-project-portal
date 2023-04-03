import { Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { notificationQueries } from '../queries/notificationQueries';
import { NotificationCard } from './NotificationCard';
import { Notification } from '../types/Notification';
import { useFramework } from '@equinor/fusion-framework-react';
import { SideSheetHeader } from '@equinor/portal-ui';

const getCountForAppName = (x: string, notifications: Notification[]): number =>
	notifications.reduce((acc, { appName }) => (appName === x ? acc + 1 : acc), 0);

interface NotificationsProps {
	onClickNotification?: () => void;
}

export function Notifications({ onClickNotification }: NotificationsProps): JSX.Element {
	const { getUnreadNotificationsQuery } = notificationQueries;
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

	const queryClient = useQueryClient();
	const onNotification = () => queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
	const { unreadNotificationCards, readNotificationCards } = useNotificationCenter(onNotification);

	const origins = [...unreadNotificationCards, ...readNotificationCards]
		.map(({ appName = 'Unknown' }) => appName)
		.filter((v, i, a) => a.indexOf(v) === i);

	const [activeNotifications, setActiveNotifications] = useState<string[]>(origins);

	const handleClick = (sourceSystem: string) =>
		setActiveNotifications((prev) =>
			prev.includes(sourceSystem) ? prev.filter((x) => x !== sourceSystem) : [...prev, sourceSystem]
		);

	const isActive = (key: string) => activeNotifications.includes(key);

	const sortAndFilterList = (list: Notification[]) =>
		list
			.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
			.filter(({ appName }) => activeNotifications.includes(appName));

	return (
		<SideSheetHeader title="Notifications" subTitle="Portal notifications center" color={'#258800'}>
			<StyledNotifications>
				<StyledActiveOrigins>
					{origins.map((applicationName, index) => (
						<Chip
							style={{
								backgroundColor: `${
									isActive(applicationName)
										? tokens.colors.interactive.primary__selected_hover.hex
										: tokens.colors.ui.background__medium.hex
								}`,
							}}
							onClick={() => handleClick(applicationName)}
							key={applicationName + index}
						>
							<div>{`${getCountForAppName(applicationName, [
								...unreadNotificationCards,
								...readNotificationCards,
							])} ${capitalize(applicationName)}`}</div>
						</Chip>
					))}
				</StyledActiveOrigins>

				<StyledNotificationsList>
					{sortAndFilterList([...unreadNotificationCards, ...readNotificationCards]).map((x, index) => (
						<NotificationCard key={x.id + index} notification={x} onNavigate={onClickNotification} />
					))}
				</StyledNotificationsList>
			</StyledNotifications>
		</SideSheetHeader>
	);
}

const StyledNotifications = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0em 1em;
	height: 100%;
`;

const StyledActiveOrigins = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5em;
	padding: 0em 1em;
	padding-bottom: 5px;
`;
const StyledNotificationsList = styled.div`
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
