import { AppGroup } from '../types';
import { AppManifest } from '@equinor/fusion-framework-app';

export function appsMatchingSearchByFav(groups: AppGroup[], searchText?: string, favorites?: AppManifest[]) {
	let favoritesAppKeys: string[];

	if (!searchText) {
		if (!favorites) {
			return [];
		} else {
			favoritesAppKeys = favorites.map((obj) => obj.key);
			return groups
				.map((group) => ({
					...group,
					apps: group.apps.filter((app) => favoritesAppKeys.includes(app.appKey)),
				}))
				.filter((group) => group.apps.length > 0);
		}
	}
	favoritesAppKeys = favorites.map((obj) => obj.key);
	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					(app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
						app.name.toLowerCase().includes(searchText.toLowerCase())) &&
					favoritesAppKeys.includes(app.appKey.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
