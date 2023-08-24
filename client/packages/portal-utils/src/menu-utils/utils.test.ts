import { expect, test, describe } from 'vitest';
import { AppGroup, App } from '@equinor/portal-core';
import { getColumnCount } from './utils';
const appGroups: AppGroup[] = [
	{
		name: 'Group 1',
		apps: [
			{ appKey: 'Test1' } as App,
			{ appKey: 'Test2' } as App,
			{ appKey: 'Test3' } as App,
			{ appKey: 'Test4' } as App,
			{ appKey: 'Test5' } as App,
			{ appKey: 'Test6' } as App,
			{ appKey: 'Test7' } as App,
			{ appKey: 'Test8' } as App,
		],
	} as AppGroup,
	{
		name: 'Group 2',
		apps: [
			{ appKey: 'Test9' } as App,
			{ appKey: 'Test10' } as App,
			{ appKey: 'Test11' } as App,
			{ appKey: 'Test12' } as App,
			{ appKey: 'Test13' } as App,
			{ appKey: 'Test14' } as App,
			{ appKey: 'Test15' } as App,
			{ appKey: 'Test16' } as App,
		],
	} as AppGroup,
	{
		name: 'Group 3',
		apps: [{ appKey: 'Test17' } as App, { appKey: 'Test18' } as App, { appKey: 'Test19' } as App],
	} as AppGroup,
];
const singleAppGroup: AppGroup[] = [
	{
		name: 'Group 1',
		apps: [{ appKey: 'testSingleApp' } as App],
	} as AppGroup,
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
