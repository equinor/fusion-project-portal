// Import the expiresIn function
import { expiresIn } from './expires-in';
import { it, describe, expect } from 'vitest';

describe('expiresIn function', () => {
	it('should return "Expired" if the target date is in the past', () => {
		// Specify a past date
		const pastDate = '2023-01-01T00:00:00.000Z';

		// Call the expiresIn function with the past date
		const result = expiresIn(pastDate);

		// Expect the result to be 'Expired'
		expect(result).toBe('Expired');
	});

	it('should return a string indicating the remaining time in hours if the target date is in the future', () => {
		// Specify a future date, e.g., 2 hours from now
		const futureDate = new Date(Date.now() + 2 * 3600000).toISOString();

		// Call the expiresIn function with the future date
		const result = expiresIn(futureDate);

		// Expect the result to match the expected format, e.g., "Expires in 2 hours"
		expect(result).toMatch(/^Expires in \d+ hours$/);
	});

	it('should handle invalid date input and return "Expired"', () => {
		// Provide an invalid date format
		const invalidDate = 'invalid-date-format';

		// Call the expiresIn function with the invalid date
		const result = expiresIn(invalidDate);

		// Expect the result to be 'Expired'
		expect(result).toBe('Expired');
	});
});
