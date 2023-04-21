import { Chip, Tabs } from '@equinor/eds-core-react';
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
import { StyledPanels, StyledTabListWrapper, StyledTabs, StyledTabsList } from './tabs.styles';
import { NotificationDateDivisions } from './NotificationDateDivision';

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
	const onNotification = () => queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
	const { unreadNotificationCards, readNotificationCards } = useNotificationCenter(onNotification);

	return (
		<SideSheetHeader title="Notifications" subTitle="Portal notifications center" color={'#258800'}>
			<StyledTabs activeTab={activeTab} onChange={handleChange}>
				<StyledTabListWrapper>
					<StyledTabsList>
						<Tabs.Tab>Unread</Tabs.Tab>
						<Tabs.Tab>Dismissed</Tabs.Tab>
					</StyledTabsList>
				</StyledTabListWrapper>
				<StyledPanels>
					<Tabs.Panel>
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
