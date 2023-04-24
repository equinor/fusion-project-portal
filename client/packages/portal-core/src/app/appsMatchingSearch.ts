import { AppGroup } from '../types';

export function appsMatchingSearch(groups: AppGroup[], searchText?: string) {
	if (!searchText) return groups;
	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(group) =>
					group.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
					group.name.toLowerCase().includes(searchText.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
