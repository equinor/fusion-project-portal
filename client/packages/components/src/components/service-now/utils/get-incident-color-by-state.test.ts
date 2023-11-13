import { describe, it, expect } from 'vitest';
import { getIncidentColorByState } from './get-incident-color-by-state';
import { tokens } from '@equinor/eds-tokens';

describe('getIncidentColorByState', () => {
	it('should return the correct color for state "Open"', () => {
		const result = getIncidentColorByState('Open');
		expect(result).toEqual(tokens.colors.interactive.danger__resting.hex);
	});

	it('should return the correct color for state "Work in Progress"', () => {
		const result = getIncidentColorByState('Work in Progress');
		expect(result).toEqual(tokens.colors.interactive.secondary__highlight.hex);
	});

	it('should return the correct color for state "Pending Vendor"', () => {
		const result = getIncidentColorByState('Pending Vendor');
		expect(result).toEqual(tokens.colors.interactive.warning__resting.hex);
	});

	it('should return the correct color for state "Solution Proposed"', () => {
		const result = getIncidentColorByState('Solution Proposed');
		expect(result).toEqual(tokens.colors.interactive.success__resting.hex);
	});

	it('should return the default color for unknown state', () => {
		const result = getIncidentColorByState('Unknown State');
		expect(result).toEqual(tokens.colors.interactive.disabled__fill.hex);
	});
});
