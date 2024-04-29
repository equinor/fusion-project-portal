import { expect, test, describe } from 'vitest';
import { AppManifest, AppCategory } from '@portal/core';
import { getColumnCount } from './utils';
const appGroups: AppCategory[] = [
	{
		name: 'Group 1',
		apps: [
			{ key: 'Test1' } as AppManifest,
			{ key: 'Test2' } as AppManifest,
			{ key: 'Test3' } as AppManifest,
			{ key: 'Test4' } as AppManifest,
			{ key: 'Test5' } as AppManifest,
			{ key: 'Test6' } as AppManifest,
			{ key: 'Test7' } as AppManifest,
			{ key: 'Test8' } as AppManifest,
		],
	} as AppCategory,
	{
		name: 'Group 2',
		apps: [
			{ key: 'Test9' } as AppManifest,
			{ key: 'Test10' } as AppManifest,
			{ key: 'Test11' } as AppManifest,
			{ key: 'Test12' } as AppManifest,
			{ key: 'Test13' } as AppManifest,
			{ key: 'Test14' } as AppManifest,
			{ key: 'Test15' } as AppManifest,
			{ key: 'Test16' } as AppManifest,
		],
	} as AppCategory,
	{
		name: 'Group 3',
		apps: [{ key: 'Test17' } as AppManifest, { key: 'Test18' } as AppManifest, { key: 'Test19' } as AppManifest],
	} as AppCategory,
];
const singleAppGroup: AppCategory[] = [
	{
		name: 'Group 1',
		apps: [{ key: 'testSingleApp' } as AppManifest],
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
