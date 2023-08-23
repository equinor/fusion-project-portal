import { describe, test, expect } from 'vitest';
import { appMounted } from './app-mounted';

describe('appMounted', () => {
	test('Should return true if apps is in path', () => {
		const valueA = appMounted('/apps/handover');
		expect(valueA).toBe(true);
	});
	test('Should return false if apps is in path', () => {
		const valueB = appMounted('/project/1234');
		expect(valueB).toBe(false);
	});
});
