import { AppCategory, AppManifest } from '../types';
import { appsToAppCategory } from './appsToAppCategory';

describe('appsToAppCategory', () => {
	it('should correctly group apps by category', () => {
		const apps: AppManifest[] = [
			{
				appKey: 'app1',
				displayName: 'App 1',
				category: {
					id: 'category1',
				},
				// Other properties...
			} as AppManifest,
			{
				appKey: 'app2',
				displayName: 'App 2',
				category: {
					id: 'category1',
				},
				// Other properties...
			} as AppManifest,
			{
				appKey: 'app3',
				displayName: 'App 3',
				category: {
					id: 'category2',
				},
				// Other properties...
			} as AppManifest,
		];

		const result: AppCategory[] = appsToAppCategory(apps);

		expect(result).toHaveLength(2); // Two categories expected

		const category1 = result.find((category) => category.id === 'category1');
		const category2 = result.find((category) => category.id === 'category2');

		expect(category1).toBeDefined();
		expect(category1?.apps).toHaveLength(2); // Two apps in category1
		expect(category1?.apps.map((app) => app.appKey)).toEqual(['app1', 'app2']);

		expect(category2).toBeDefined();
		expect(category2?.apps).toHaveLength(1); // One app in category2
		expect(category2?.apps.map((app) => app.appKey)).toEqual(['app3']);
	});

	it('should handle empty input', () => {
		const result: AppCategory[] = appsToAppCategory();

		expect(result).toEqual([]);
	});

	it('should handle undefined category in app manifest', () => {
		const apps: AppManifest[] = [
			{
				appKey: 'app1',
				displayName: 'App 1',
				// Other properties...
			} as AppManifest,
			{
				appKey: 'app2',
				displayName: 'App 2',
				category: {
					id: 'category1',
				},
				// Other properties...
			} as AppManifest,
		];

		const result: AppCategory[] = appsToAppCategory(apps);

		expect(result).toHaveLength(2); // Two categories expected

		const category1 = result.find((category) => category.id === 'category1');
		const category2 = result.find((category) => category.id === 'undefined');

		expect(category1).toBeDefined();
		expect(category1?.apps).toHaveLength(1); // One app in category1
		expect(category1?.apps.map((app) => app.appKey)).toEqual(['app2']);

		expect(category2).toBeDefined();
		expect(category2?.apps).toHaveLength(1); // One app with undefined category
		expect(category2?.apps.map((app) => app.appKey)).toEqual(['app1']);
	});
});
