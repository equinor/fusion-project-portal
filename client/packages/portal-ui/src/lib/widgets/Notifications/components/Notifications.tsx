import { Button, Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { notificationQueries, notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../types/Notification';
import { useFramework } from '@equinor/fusion-framework-react';
import { SideSheetHeader } from '@equinor/portal-ui';
import { StyledPanels, StyledTabListWrapper, StyledTabs, StyledTabsList } from './tabs.styles';
import { NotificationDateDivisions } from './NotificationDateDivision';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { readNotificationAsync } from '../api/readNotification';

const getCountForAppName = (x: string, notifications: Notification[]): number =>
	notifications.reduce((acc, { appName }) => (appName === x ? acc + 1 : acc), 0);

interface NotificationsProps {
	onClickNotification?: () => void;
}

export function Notifications({ onClickNotification }: NotificationsProps): JSX.Element {
	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};

	const { getUnreadNotificationsQuery } = notificationQueries;
	const client = useFramework().modules.serviceDiscovery.createClient('notification');
	const queryClient = useQueryClient();
	const { read } = useNotificationMutationKeys();
	const baseKey = notificationsBaseKey;

	const onNotification = () => queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
	const { unreadNotificationCards, readNotificationCards } = useNotificationCenter(onNotification);

	const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
		onSuccess: () => queryClient.invalidateQueries(baseKey),
	});

	const clickMarkAllAsRead = () => {
		unreadNotificationCards.map((notification) => markAsRead({ notificationId: notification?.id, client }));
	};

	return (
		<SideSheetHeader title="Notifications" subTitle="Portal notifications center" color={'#258800'}>
			<StyledTabs activeTab={activeTab} onChange={handleChange}>
				<StyledTabListWrapper>
					<StyledTabsList>
						<Tabs.Tab>Unread ({unreadNotificationCards.length})</Tabs.Tab>
						<Tabs.Tab>Dismissed ({readNotificationCards.length})</Tabs.Tab>
					</StyledTabsList>
				</StyledTabListWrapper>
				<StyledPanels>
					<Tabs.Panel>
						<Button onClick={clickMarkAllAsRead}>Mark as read</Button>
						<NotificationDateDivisions
							notifications={unreadNotificationCards}
							onClickNotification={onClickNotification}
						/>
					</Tabs.Panel>
					<Tabs.Panel>
						<NotificationDateDivisions
							notifications={readNotificationCards}
							onClickNotification={onClickNotification}
						/>
					</Tabs.Panel>
				</StyledPanels>
			</StyledTabs>
		</SideSheetHeader>
	);
}
