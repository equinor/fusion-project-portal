import { tokens } from '@equinor/eds-tokens';
import { AppManifest, AppCategory } from '../types';

export const getColumnCount = (MAX: number, appGroup?: AppCategory[]) => {
	const count =
		appGroup?.reduce((acc, group) => {
			return acc + group.apps.length;
		}, 0) || 0;
	return Math.ceil(count / MAX);
};

export const appGroupArraySort = (a: AppCategory, b: AppCategory) => {
	if ((a.name || '') < (b.name || '')) {
		return -1;
	} else if ((a.name || '') > (b.name || '')) {
		return 1;
	} else {
		return 0;
	}
};

// Returns an array of disabled apps based on the enabled apps and favorites
export function getDisabledApps(enabledApps: AppManifest[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = enabledApps.map((app) => app.key);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites
		.filter((favorite) => !allAppKeys.includes(favorite.key))
		.map(
			(disabledApp): AppManifest => ({
				...disabledApp,
				description: disabledApp.description ?? '',
				isDisabled: true,
				isPinned: true,
				order: disabledApp.order ?? 0,
			})
		);
}
// Returns an array of disabled apps based on the enabled apps and favorites
export function getPinnedAppsKeys(apps: AppManifest[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = apps.map((app) => app.key);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites.filter((favorite) => allAppKeys.includes(favorite.key)).map((f) => f.key);
}

export function getPinnedAppsGroup(enabledApps: AppManifest[], disabledApps: AppManifest[], favorites: AppManifest[]) {
	const pinnedApps = favorites.reduce(
		(acc, curr) => {
			const enabledApp =
				enabledApps.find((app) => app.key === curr.key) ?? disabledApps.find((app) => app.key === curr.key);

			if (enabledApp) {
				return {
					...acc,
					apps: [...acc.apps, enabledApp],
				};
			}
			return acc;
		},
		{
			defaultIcon: null,
			name: 'Pinned Apps',
			color: tokens.colors.infographic.substitute__pink_salmon.hex,
			apps: [],
		} as AppCategory
	);

	pinnedApps.apps.sort((a, b) => a.name.localeCompare(b.name));

	return pinnedApps;
}
