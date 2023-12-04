import { FC, PropsWithChildren, useState } from 'react';

import { css } from '@emotion/css';
import { useNotificationCenter } from './hooks/useNotificationCenter';

import { NotificationWrapper } from './components/NotificationWrapper';
import { Notification } from './types/Notification';

const messageListWrapper = css`
	position: fixed;
	top: 4rem;
	right: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 500px;
	z-index: 1;
`;

const TimeoutInMilliseconds = 9000;

export const NotificationService: FC<PropsWithChildren> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	useNotificationCenter((notification) => setNotifications((s) => [...s, notification]));

	return (
		<>
			{children}
			<div className={messageListWrapper}>
				{notifications.length > 0
					? notifications.map((notification, index) => (
							<NotificationWrapper
								notification={notification}
								timeout={TimeoutInMilliseconds}
								index={index}
							/>
					  ))
					: null}
			</div>
		</>
	);
};
