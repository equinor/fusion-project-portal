import { FC, PropsWithChildren, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NotificationCard } from '../../notifications/components/NotificationCard';
import { Notification } from '../../notifications/types/Notification';

const StyledMessageWrapper = styled.div`
	animation-duration: 1s;
	animation-name: fade;
	background-color: #fff;
	cursor: pointer;

	@keyframes fade {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
`;

export const NotificationWrapper: FC<
	PropsWithChildren<{ notification: Notification; timeout: number; dismissible: boolean }>
> = ({ notification, timeout, dismissible }) => {
	const [display, setDisplay] = useState(true);

	useEffect(() => {
		if (!dismissible) return;
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
