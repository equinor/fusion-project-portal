import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useServiceMessage } from '../hooks/use-service-message';
import { ServiceMessage } from '../types/types';

const StyledMessageChip = styled.span<{ color: string }>`
	position: absolute;
	right: 2px;
	bottom: 5px;
	padding: 0.2rem;
	width: 16px;
	height: 16px;
	text-align: center;
	justify-content: center;
	background-color: ${({ color }) => color};
	border-radius: 50%;
	color: ${tokens.colors.text.static_icons__primary_white.rgba};
`;

const getColor = (messages: ServiceMessage[]): string => {
	return messages.some((message) => message.type === 'Issue')
		? tokens.colors.interactive.danger__resting.rgba
		: messages.some((message) => message.type === 'Maintenance')
		? tokens.colors.interactive.warning__resting.rgba
		: tokens.colors.ui.background__info.rgba;
};

const StyledIndicators = styled.div`
	display: 'flex';
	align-items: 'center';
	margin: '.5em -1em';
	justify-content: 'center';
`;

const StyledIndicator = styled.span`
	display: 'flex';
	align-items: 'center';
	padding: '0 1em';
`;

const StyledDot = styled.span(() => ({
	display: 'inline-block',
	height: '1em',
	width: '1em',
	borderRadius: '50%',
	margin: '0 0.5rem',
	'&[data-type="warning"]': {
		backgroundColor: tokens.colors.interactive.danger__resting.rgba,
	},
	'&[data-type="maintenance"]': {
		backgroundColor: tokens.colors.interactive.warning__resting.rgba,
	},
	'&[data-type="info"]': {
		backgroundColor: tokens.colors.infographic.primary__moss_green_100.rgba,
	},
}));

export function ServiceMessageTooltip() {
	return (
		<div>
			<p>
				Shows relevant messages for <b>Project Portal</b> system status
			</p>
			<StyledIndicators>
				<StyledIndicator>
					<StyledDot data-type="warning" />
					<span>Warning</span>
				</StyledIndicator>
				<StyledIndicator>
					<StyledDot data-type="maintenance" />
					<span>Maintenance</span>
				</StyledIndicator>
				<StyledIndicator>
					<StyledDot data-type="info" />
					<span>Info</span>
				</StyledIndicator>
			</StyledIndicators>
		</div>
	);
}

export function ServiceMessageIcon() {
	const { messages } = useServiceMessage();
	const color = useMemo(() => getColor(messages), [messages]);
	const count = messages.length < 10 ? messages.length : '-';
	return (
		<>
			{typeof count === 'number' && count > 0 && <StyledMessageChip color={color}>{count}</StyledMessageChip>}
			<Icon name="warning_outlined" />
		</>
	);
}
