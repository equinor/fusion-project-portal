import { AppGroup } from '../types';

export function appsMatchingSearch(groups: AppGroup[], searchText?: string, clickedCategoryItems?: any[]) {
	if (!searchText) return groups;

	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					!clickedCategoryItems || !clickedCategoryItems.includes(group.name)
			).filter(
				(app) =>
					app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
					app.name.toLowerCase().includes(searchText.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
