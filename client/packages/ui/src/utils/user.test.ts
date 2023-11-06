import { describe, test, expect } from 'vitest';
import { getAccountTypeColor } from './user';
import { AccountColor } from '@portal/types';

describe('getAccountTypeColor', () => {
	test('should return the correct color for Employee', () => {
		expect(getAccountTypeColor('Employee')).toEqual(AccountColor.Employee);
	});

	test('should return the correct color for Consultant', () => {
		expect(getAccountTypeColor('Consultant')).toEqual(AccountColor.Consultant);
	});

	test('should return the correct color for Enterprise', () => {
		expect(getAccountTypeColor('Enterprise')).toEqual(AccountColor.Enterprise);
	});

	test('should return the correct color for External', () => {
		expect(getAccountTypeColor('External')).toEqual(AccountColor.External);
	});

	test('should return the correct color for External Hire', () => {
		expect(getAccountTypeColor('External Hire')).toEqual(AccountColor.ExternalHire);
	});

	test('should return the correct color for null accountType', () => {
		expect(getAccountTypeColor(null)).toEqual(AccountColor.Default);
	});

	test('should return the default color for an unknown account type', () => {
		expect(getAccountTypeColor('UnknownType')).toEqual(AccountColor.Default);
	});

	test('should return the default color for an undefined accountType', () => {
		expect(getAccountTypeColor()).toEqual(AccountColor.Default);
	});
});
