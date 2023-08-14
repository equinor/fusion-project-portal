import { describe, test, expect } from 'vitest';
import { appsMatchingSearch } from './apps-matching-search';
import { AppGroup, App } from '../../types';

const appGroups: AppGroup[] = [
	{
		name: 'Construction',
		accentColor: '1',
		order: 1,
		apps: [
			{
				appKey: 'handover',
				name: 'Handover',
			},
			{
				appKey: 'swcr',
				name: 'SWCR',
			},
			{
				appKey: 'scope',
				name: 'Scope Change',
			},
		] as App[],
	},
	{
		name: 'Collaboration',
		accentColor: '1',
		order: 1,
		apps: [
			{
				appKey: 'meetings',
				name: 'Meetings',
			},
		] as App[],
	},
];
describe('appsMatchingSearch', () => {
	test('Should return all appGroups', () => {
		const value = appsMatchingSearch(appGroups);
		expect(value).toBe(appGroups);
	});
	test('Should return Construction appGroups with swcr app', () => {
		const expected: AppGroup[] = [
			{
				name: 'Construction',
				accentColor: '1',
				order: 1,
				apps: [
					{
						appKey: 'swcr',
						name: 'SWCR',
					},
				] as App[],
			},
		];

		const value = appsMatchingSearch(appGroups, 'sw');
		expect(value).toEqual(expected);
	});
	test('Should return all appGroups', () => {
		const expected: AppGroup[] = [
			{
				name: 'Construction',
				accentColor: '1',
				order: 1,
				apps: [
					{
						appKey: 'handover',
						name: 'Handover',
					},
					{
						appKey: 'scope',
						name: 'Scope Change',
					},
				] as App[],
			},
			{
				name: 'Collaboration',
				accentColor: '1',
				order: 1,
				apps: [
					{
						appKey: 'meetings',
						name: 'Meetings',
					},
				] as App[],
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
