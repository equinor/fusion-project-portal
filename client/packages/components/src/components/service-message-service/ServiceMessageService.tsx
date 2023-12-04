import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@emotion/css';
import { useServiceMessage, MessageWrapper } from '@equinor/service-message';

const messageListWrapper = css`
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 500px;
	z-index: 1;
`;

export const ServiceMessageService: FC<PropsWithChildren> = ({ children }) => {
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
