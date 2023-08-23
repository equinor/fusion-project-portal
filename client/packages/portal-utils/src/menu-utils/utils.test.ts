import { expect, test, describe } from 'vitest';
import { AppGroup, App } from '@equinor/portal-core';
import { getColumnCount, getMenuWidth } from './utils';
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

describe('getColumnCount', () => {
	test('Should return 2', () => {
		const columnCount = getColumnCount(10, appGroups);
		expect(columnCount).toBe(2);
	});
});

describe('getMenuWidth 1100', () => {
	test('Should return 1100', () => {
		const currWidth = getMenuWidth(12, 25, appGroups);
		expect(currWidth).toBe(1100);
	});
});
describe('getMenuWidth 750', () => {
	test('Should return 750', () => {
		const currWidth = getMenuWidth(20, 25, appGroups);
		expect(currWidth).toBe(750);
	});
});
describe('getMenuWidth 1450', () => {
	test('Should return 1450', () => {
		const currWidth = getMenuWidth(10, 15, appGroups);
		expect(currWidth).toBe(1450);
	});
});
