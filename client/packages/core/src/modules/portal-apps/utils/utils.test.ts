import { expect, test, describe } from 'vitest';
import { AppManifest, AppCategory } from '@portal/core';
import { getColumnCount } from './utils';
const appGroups: AppCategory[] = [
	{
		displayName: 'Group 1',
		apps: [
			{ appKey: 'Test1' } as AppManifest,
			{ appKey: 'Test2' } as AppManifest,
			{ appKey: 'Test3' } as AppManifest,
			{ appKey: 'Test4' } as AppManifest,
			{ appKey: 'Test5' } as AppManifest,
			{ appKey: 'Test6' } as AppManifest,
			{ appKey: 'Test7' } as AppManifest,
			{ appKey: 'Test8' } as AppManifest,
		],
	} as AppCategory,
	{
		displayName: 'Group 2',
		apps: [
			{ appKey: 'Test9' } as AppManifest,
			{ appKey: 'Test10' } as AppManifest,
			{ appKey: 'Test11' } as AppManifest,
			{ appKey: 'Test12' } as AppManifest,
			{ appKey: 'Test13' } as AppManifest,
			{ appKey: 'Test14' } as AppManifest,
			{ appKey: 'Test15' } as AppManifest,
			{ appKey: 'Test16' } as AppManifest,
		],
	} as AppCategory,
	{
		displayName: 'Group 3',
		apps: [
			{ appKey: 'Test17' } as AppManifest,
			{ appKey: 'Test18' } as AppManifest,
			{ appKey: 'Test19' } as AppManifest,
		],
	} as AppCategory,
];
const singleAppGroup: AppCategory[] = [
	{
		displayName: 'Group 1',
		apps: [{ appKey: 'testSingleApp' } as AppManifest],
	} as AppCategory,
];

describe('getColumnCount', () => {
	test('Should return 2', () => {
		const columnCount = getColumnCount(10, appGroups);
		expect(columnCount).toBe(2);
	});
	test('Should return 1', () => {
		const columnCount = getColumnCount(10, singleAppGroup);
		expect(columnCount).toBe(1);
	});
});
