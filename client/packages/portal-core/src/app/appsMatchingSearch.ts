import { AppGroup } from '../types';

export function appsMatchingSearch(groups: AppGroup[], searchText?: string) {
	if (!searchText) return groups;

	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
					app.name.toLowerCase().includes(searchText.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
