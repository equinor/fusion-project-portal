import { Button, Tabs, TabsProps } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { notificationQueries, notificationsBaseKey } from '../queries/notificationQueries';
import { useFramework } from '@equinor/fusion-framework-react';

import { NotificationDateDivisions } from './NotificationDateDivision';
import { useNotificationMutationKeys } from '../hooks/useNotificationMutationKeys';
import { readNotificationAsync } from '../api/readNotification';
import { css } from '@emotion/css';

import { tokens } from '@equinor/eds-tokens';
import styled from '@emotion/styled';

interface NotificationsProps {
	onClickNotification?: () => void;
}

const StyledTabs = styled(Tabs)`
	display: grid;
	grid-template-rows: auto 1fr;
	position: relative;
`;

const StyledPanels = styled(Tabs.Panels)`
	overflow: auto;
`;

const StyledTabsList = styled(Tabs.List)`
	overflow: auto;

	width: auto;
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
	scroll-behavior: smooth;
`;

const styles = {
	tabListWrapper: css`
		display: flex;
		width: 100%;
		background-color: ${tokens.colors.ui.background__light.hex};
		justify-content: space-between;
		::before {
			content: ' ';
			position: absolute;
			left: -1rem;
			top: 0px;
			width: 1rem;
			height: 48px;
			background-color: #f7f7f7;
		}
	`,
	tabActions: css`
		padding-top: 0.3rem;
		padding-right: 1rem;
	`,
};

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
		<StyledTabs activeTab={activeTab} onChange={handleChange}>
			<div className={styles.tabListWrapper}>
				<StyledTabsList>
					<Tabs.Tab>Unread ({unreadNotificationCards.length})</Tabs.Tab>
					<Tabs.Tab>Dismissed ({readNotificationCards.length})</Tabs.Tab>
				</StyledTabsList>
				<div className={styles.tabActions}>
					<Button variant="ghost" onClick={clickMarkAllAsRead}>
						Mark all as read
					</Button>
				</div>
			</div>
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
	);
}
