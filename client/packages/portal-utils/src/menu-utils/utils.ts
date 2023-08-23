import { AppGroup, App } from '@equinor/portal-core';
import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/fusion-framework-module-app';

export const getColumnCount = (MAX: number, appGroup?: AppGroup[]) => {
	const count =
		appGroup?.reduce((acc, group) => {
			return acc + group.apps.length;
		}, 0) || 0;
	return Math.ceil(count / MAX);
};

export const getMenuWidth = (MIN: number, MAX: number, appGroup?: AppGroup[]) => {
	const count =
		appGroup?.reduce((acc, group) => {
			return acc + group.apps.length;
		}, 0) || 0;

	if (!appGroup || count < MIN) {
		return 750;
	}
	if (count > MIN && count < MAX) {
		return 1100;
	}
	return 1450;
};

export const customAppgroupArraySort = (a: AppGroup, b: AppGroup, activeItem: string) => {
	if (a.name === activeItem || a.name < b.name) {
		return -1;
	} else if (b.name === activeItem || a.name > b.name) {
		return 1;
	} else {
		return 0;
	}
};

// Returns an array of disabled apps based on the enabled apps and favorites
export function getDisabledApps(enabledApps: App[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = enabledApps.map((app) => app.appKey);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites
		.filter((favorite) => !allAppKeys.includes(favorite.key))
		.map(
			(disabledApp): App => ({
				appKey: disabledApp.key,
				description: disabledApp.description ?? '',
				name: disabledApp.name,
				isDisabled: true,
				order: disabledApp.order ?? 0,
			})
		);
}

export function getPinnedAppsGroup(enabledApps: App[], disabledApps: App[], favorites: AppManifest[]) {
	const pinnedApps = favorites.reduce(
		(acc, curr) => {
			const enabledApp =
				enabledApps.find((app) => app.appKey === curr.key) ??
				disabledApps.find((app) => app.appKey === curr.key);

			if (enabledApp) {
				return {
					...acc,
					apps: [...acc.apps, enabledApp],
				};
			}
			return acc;
		},
		{
			name: 'Pinned Apps',
			order: 0,
			accentColor: tokens.colors.infographic.substitute__pink_salmon.hex,
			apps: [],
		} as AppGroup
	);

	pinnedApps.apps.sort((a, b) => a.name.localeCompare(b.name));

	return pinnedApps;
}
