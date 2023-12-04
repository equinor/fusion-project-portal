import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@emotion/css';
import { useServiceMessage, MessageWrapper } from '@equinor/service-message';
import { useNotificationCenter } from '../notifications/hooks/useNotificationCenter';
import { useNotification } from '../notifications/hooks/useNotification';

import { NotificationWrapper } from './components/NotificationWrapper';

const messageListWrapper = css`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 500px;
	z-index: 1;
`;

export const NotificationService: FC<PropsWithChildren> = ({ children }) => {
	const { appKey } = useParams();

	const { unreadNotificationCards } = useNotificationCenter();
	const { currentMessages } = useServiceMessage(appKey);
	return (
		<>
			{children}
			<div className={messageListWrapper}>
				{currentMessages.length > 0
					? currentMessages.map((message) => (
							<MessageWrapper
								key={message.id}
								message={message}
								timeout={message.type === 'Maintenance' ? 8000 : 5000}
							/>
					  ))
					: null}
				{unreadNotificationCards.length > 0
					? unreadNotificationCards.map((notification) => (
							<NotificationWrapper notification={notification} timeout={18000} dismissible={false} />
					  ))
					: null}
			</div>
		</>
	);
};
