import { describe, test, expect } from 'vitest';
import { appsMatchingSearch } from './apps-matching-search';
import { AppCategory, AppManifest } from '@portal/core';

const appGroups: AppCategory[] = [
	{
		name: 'Construction',
		color: '1',
		defaultIcon: '1',
		apps: [
			{
				key: 'handover',
				name: 'Handover',
			},
			{
				key: 'swcr',
				name: 'SWCR',
			},
			{
				key: 'scope',
				name: 'Scope Change',
			},
		] as AppManifest[],
	},
	{
		name: 'Collaboration',
		color: '2',
		defaultIcon: '2',
		apps: [
			{
				key: 'meetings',
				name: 'Meetings',
			},
		] as AppManifest[],
	},
];
describe('appsMatchingSearch', () => {
	test('Should return all appGroups', () => {
		const value = appsMatchingSearch(appGroups);
		expect(value).toBe(appGroups);
	});
	test('Should return Construction appGroups with swcr app', () => {
		const expected: AppCategory[] = [
			{
				name: 'Construction',
				defaultIcon: '1',
				color: '1',
				apps: [
					{
						key: 'swcr',
						name: 'SWCR',
					},
				] as AppManifest[],
			},
		];

		const value = appsMatchingSearch(appGroups, 'sw');
		expect(value).toEqual(expected);
	});
	test('Should return all appGroups', () => {
		const expected: AppCategory[] = [
			{
				name: 'Construction',
				color: '1',
				defaultIcon: '1',
				apps: [
					{
						key: 'handover',
						name: 'Handover',
					},
					{
						key: 'scope',
						name: 'Scope Change',
					},
				] as AppManifest[],
			},
			{
				name: 'Collaboration',
				color: '2',
				defaultIcon: '2',
				apps: [
					{
						key: 'meetings',
						name: 'Meetings',
					},
				] as AppManifest[],
			},
		];

		const value = appsMatchingSearch(appGroups, 'e');
		expect(value).toEqual(expected);
	});

	test('Should return empty array', () => {
		const value = appsMatchingSearch(appGroups, 'Will not find anything');
		expect(value).toEqual([]);
	});
	test('Should handle empty array', () => {
		const value = appsMatchingSearch([], 'e');
		expect(value).toEqual([]);
	});
});
