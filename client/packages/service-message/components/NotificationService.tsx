import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { useServiceMessage } from '../hooks/use-service-message';

import { MessageWrapper } from './MessageWrapper';
import { css } from '@emotion/css';

const messageListWrapper = css`
	position: fixed;
	bottom: 3rem;
	right: 3rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	min-width: 500px;
	z-index: 1;
`;

export const NotificationService: FC<PropsWithChildren> = ({ children }) => {
	const { appKey } = useParams();
	const { currentMessages } = useServiceMessage(appKey);
	return (
		<>
			{children}
			<div className={messageListWrapper}>
				{currentMessages.length > 0
					? currentMessages
							.filter((message) => message.notifyUser)
							.map((message) => (
								<MessageWrapper
									key={message.id}
									message={message}
									timeout={message.type === 'Maintenance' ? 8000 : 5000}
								/>
							))
					: null}
			</div>
		</>
	);
};
