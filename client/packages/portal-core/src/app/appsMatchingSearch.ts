import { AppGroup } from '../types';
import { AppManifest } from '@equinor/fusion-framework-app';

export function appsMatchingSearch(groups: AppGroup[], searchText?: string, clickedCategoryItems?: any[], favorites?: AppManifest[]) {
	if (!searchText) return groups;

	let favoritesAppKeys = favorites.map((obj) => obj.key);
	return groups
		.map((group) => ({
			...group,
			apps: group.apps.filter(
				(app) =>
					!clickedCategoryItems || !clickedCategoryItems.includes(group.name)
			).filter(
				(app) =>
					(app.appKey.toLowerCase().includes(searchText.toLowerCase()) ||
					app.name.toLowerCase().includes(searchText.toLowerCase())) && 
					!favoritesAppKeys.includes(app.appKey.toLowerCase())
			),
		}))
		.filter((group) => group.apps.length);
}
