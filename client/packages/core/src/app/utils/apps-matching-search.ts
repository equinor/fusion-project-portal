import { FusionAppGroup } from '@portal/types';

export function appsMatchingSearch(groups: FusionAppGroup[], searchText?: string) {
	if (!searchText) return groups;

	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					app.key.toLowerCase().includes(searchText.toLowerCase()) ||
					app.name.toLowerCase().includes(searchText.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
