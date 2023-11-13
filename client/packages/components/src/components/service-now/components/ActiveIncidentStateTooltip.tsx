import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

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
	'&[data-type="Open"]': {
		backgroundColor: tokens.colors.interactive.danger__resting.hex,
	},
	'&[data-type="Work in Progress"]': {
		backgroundColor: tokens.colors.interactive.secondary__highlight.hex,
	},
	'&[data-type="Pending Vendor"]': {
		backgroundColor: tokens.colors.interactive.warning__resting.hex,
	},
	'&[data-type="Solution Proposed"]': {
		backgroundColor: tokens.colors.interactive.success__resting.hex,
	},
}));

export const ActiveIncidentStateTooltip = () => {
	return (
		<div>
			<p>
				Status indicator legend for <b>incident</b> items
			</p>
			<StyledIndicators>
				<StyledIndicator>
					<StyledDot data-type="Open" />
					<span>Open</span>
				</StyledIndicator>
				<StyledIndicator>
					<StyledDot data-type="Work in Progress" />
					<span>Work in Progress</span>
				</StyledIndicator>
				<StyledIndicator>
					<StyledDot data-type="Pending Vendor" />
					<span>Pending Vendor</span>
				</StyledIndicator>
				<StyledIndicator>
					<StyledDot data-type="Solution Proposed" />
					<span>Solution Proposed</span>
				</StyledIndicator>
			</StyledIndicators>
		</div>
	);
};
