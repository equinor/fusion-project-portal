import { tokens } from '@equinor/eds-tokens';

export const getIncidentColorByState = (state: string): string => {
	switch (state) {
		case 'Open':
			return `${tokens.colors.interactive.danger__resting.hex}`;
		case 'Work in Progress':
			return `${tokens.colors.interactive.secondary__highlight.hex}`;
		case 'Pending Vendor':
			return `${tokens.colors.interactive.warning__resting.hex}`;
		case 'Solution Proposed':
			return `${tokens.colors.interactive.success__resting.hex}`;
		default:
			return `${tokens.colors.interactive.disabled__fill.hex}`;
	}
};
