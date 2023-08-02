import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { useServiceMessage } from '../query/use-service-message';

import { MessageWrapper } from './MessageWrapper';
import { css } from '@emotion/css';

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
			</div>
		</>
	);
};
