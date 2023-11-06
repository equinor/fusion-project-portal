import { it, describe, expect } from 'vitest';
import { getPresenceInfo } from './parse-presence-status';
import { Icon } from '@equinor/eds-core-react';
import { account_circle, help_outline } from '@equinor/eds-icons';

describe('getPresenceInfo', () => {
	it('should return the correct PresenceInfo object for each availability status', () => {
		// Test for 'Available' status
		expect(getPresenceInfo('Available')).toEqual({
			icon: <Icon color="#4bb748" data={account_circle} title="Available" />,
			status: 'Available',
		});

		// Add similar expect statements for other availability statuses like 'Away', 'BeRightBack', 'Busy', 'DoNotDisturb', 'Offline', and test that they return the correct PresenceInfo objects.
	});

	it('should return the correct default PresenceInfo object for an unknown status', () => {
		// Test for an unknown status (status is undefined)
		expect(getPresenceInfo(undefined)).toEqual({
			icon: <Icon data={help_outline} />,
			status: 'Unknown',
		});

		// You can also add more test cases for other unknown status scenarios if needed.
	});
});
