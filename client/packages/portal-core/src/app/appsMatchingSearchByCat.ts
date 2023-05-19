import { AppGroup } from '../types';

export function appsMatchingSearchByCat(groups: AppGroup[], searchText?: string, clickedCategoryItems?: string[]) {
	if (!searchText) {
		if (!clickedCategoryItems) {
			return [];
		} else {
			return groups.filter((group) => clickedCategoryItems.includes(group.name));
		}
	}
	
	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					(app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
						app.name.toLowerCase().includes(searchText.toLowerCase())) &&
					clickedCategoryItems.includes(group.name)
			),
		}))
		.filter((group) => group.apps.length);
}
