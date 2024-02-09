import { expect, test, describe } from 'vitest';
import { FusionAppManifest, FusionAppGroup } from '@portal/types';
import { getColumnCount } from './utils';
const appGroups: FusionAppGroup[] = [
	{
		name: 'Group 1',
		apps: [
			{ key: 'Test1' } as FusionAppManifest,
			{ key: 'Test2' } as FusionAppManifest,
			{ key: 'Test3' } as FusionAppManifest,
			{ key: 'Test4' } as FusionAppManifest,
			{ key: 'Test5' } as FusionAppManifest,
			{ key: 'Test6' } as FusionAppManifest,
			{ key: 'Test7' } as FusionAppManifest,
			{ key: 'Test8' } as FusionAppManifest,
		],
	} as FusionAppGroup,
	{
		name: 'Group 2',
		apps: [
			{ key: 'Test9' } as FusionAppManifest,
			{ key: 'Test10' } as FusionAppManifest,
			{ key: 'Test11' } as FusionAppManifest,
			{ key: 'Test12' } as FusionAppManifest,
			{ key: 'Test13' } as FusionAppManifest,
			{ key: 'Test14' } as FusionAppManifest,
			{ key: 'Test15' } as FusionAppManifest,
			{ key: 'Test16' } as FusionAppManifest,
		],
	} as FusionAppGroup,
	{
		name: 'Group 3',
		apps: [
			{ key: 'Test17' } as FusionAppManifest,
			{ key: 'Test18' } as FusionAppManifest,
			{ key: 'Test19' } as FusionAppManifest,
		],
	} as FusionAppGroup,
];
const singleAppGroup: FusionAppGroup[] = [
	{
		name: 'Group 1',
		apps: [{ key: 'testSingleApp' } as FusionAppManifest],
	} as FusionAppGroup,
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
