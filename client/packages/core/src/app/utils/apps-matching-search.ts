import { AppCategory } from '../../modules';

export function appsMatchingSearch(groups: AppCategory[], searchText?: string) {
	if (!searchText) return groups;

	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
					app.displayName.toLowerCase().includes(searchText.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
