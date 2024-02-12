import { describe, test, expect } from 'vitest';
import { appsMatchingSearch } from './apps-matching-search';
import { FusionAppGroup, FusionAppManifest } from '@portal/types';

const appGroups: FusionAppGroup[] = [
	{
		name: 'Construction',
		accentColor: '1',
		order: 1,
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
		] as FusionAppManifest[],
	},
	{
		name: 'Collaboration',
		accentColor: '1',
		order: 1,
		apps: [
			{
				key: 'meetings',
				name: 'Meetings',
			},
		] as FusionAppManifest[],
	},
];
describe('appsMatchingSearch', () => {
	test('Should return all appGroups', () => {
		const value = appsMatchingSearch(appGroups);
		expect(value).toBe(appGroups);
	});
	test('Should return Construction appGroups with swcr app', () => {
		const expected: FusionAppGroup[] = [
			{
				name: 'Construction',
				accentColor: '1',
				order: 1,
				apps: [
					{
						key: 'swcr',
						name: 'SWCR',
					},
				] as FusionAppManifest[],
			},
		];

		const value = appsMatchingSearch(appGroups, 'sw');
		expect(value).toEqual(expected);
	});
	test('Should return all appGroups', () => {
		const expected: FusionAppGroup[] = [
			{
				name: 'Construction',
				accentColor: '1',
				order: 1,
				apps: [
					{
						key: 'handover',
						name: 'Handover',
					},
					{
						key: 'scope',
						name: 'Scope Change',
					},
				] as FusionAppManifest[],
			},
			{
				name: 'Collaboration',
				accentColor: '1',
				order: 1,
				apps: [
					{
						key: 'meetings',
						name: 'Meetings',
					},
				] as FusionAppManifest[],
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
