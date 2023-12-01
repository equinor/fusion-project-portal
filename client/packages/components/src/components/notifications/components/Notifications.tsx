import { Tabs, Icon } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNotificationCenter } from '../hooks/useNotificationCenter';
import { useNotificationQueries } from '../queries/notificationQueries';
import { useFramework } from '@equinor/fusion-framework-react';

import { NotificationDateDivisions } from './NotificationDateDivision';

import { css } from '@emotion/css';

import { tokens } from '@equinor/eds-tokens';
import styled from '@emotion/styled';
import { NotificationsSettings } from './NotificationsSettings';
import { settings } from '@equinor/eds-icons';
import { useNotification } from '../hooks/useNotification';

interface NotificationsProps {
	onClickNotification?: () => void;
}

const StyledTabs = styled(Tabs)`
	/* display: grid;
	grid-template-rows: auto 1fr; */
	width: inherit;
`;

const StyledPanels = styled(Tabs.Panels)`
	position: absolute;
	top: 128px;
	right: 0;
	left: 0;
	padding: 0 1rem;
	overflow-y: auto;
	height: 100%;
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
		position: absolute;
		left: 0px;
		right: 0px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		::before {
			content: ' ';
			background-color: ${tokens.colors.ui.background__medium.hex};
			height: 2px;
			width: 100%;
			position: absolute;
			bottom: 0px;
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

	const { onNotification } = useNotification();
	const { unreadNotificationCards, readNotificationCards } = useNotificationCenter(onNotification);

	return (
		<StyledTabs activeTab={activeTab} onChange={handleChange}>
			<div className={styles.tabListWrapper}>
				<StyledTabsList>
					<Tabs.Tab>Unread ({unreadNotificationCards.length})</Tabs.Tab>
					<Tabs.Tab>Dismissed ({readNotificationCards.length})</Tabs.Tab>
					<Tabs.Tab>
						<Icon data={settings} />
					</Tabs.Tab>
				</StyledTabsList>
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
				<Tabs.Panel>
					<NotificationsSettings />
				</Tabs.Panel>
			</StyledPanels>
		</StyledTabs>
	);
}
