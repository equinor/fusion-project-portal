import { FC, PropsWithChildren, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NotificationCard } from './NotificationCard';
import { Notification } from '../types/Notification';

const timesMilliSeconds = 100;
const StyledMessageWrapper = styled.div<{ delay: number }>`
	animation-duration: 0.5s;
	animation-name: fade;
	animation-fill-mode: both;
	animation-delay: ${({ delay }) => delay * timesMilliSeconds}ms;
	background-color: #fff;
	cursor: pointer;

	@keyframes fade {
		from {
			translate: 600px;
			opacity: 0;
		}

		to {
			translate: 0px;
			opacity: 1;
		}
	}
`;

export const NotificationWrapper: FC<
	PropsWithChildren<{ notification: Notification; timeout: number; index: number }>
> = ({ notification, timeout, index }) => {
	const [display, setDisplay] = useState(true);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDisplay(false);
		}, timeout);
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	if (!display) return null;

	return (
		<StyledMessageWrapper
			delay={index}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				setDisplay(false);
			}}
		>
			<NotificationCard key={notification.title} notification={notification} />
		</StyledMessageWrapper>
	);
};
