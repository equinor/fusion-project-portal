import { AppGroup, App } from '@equinor/portal-core';
import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/fusion-framework-module-app';

export const getColumnCount = (MIN: number, MAX: number, data?: AppGroup[]) => {
	if (!data || data.length < MIN) {
		return 1;
	}
	if (data?.length > MIN && data?.length < MAX) {
		return 2;
	}
	return 3;
};

export const getMenuWidth = (MIN: number, MAX: number, data?: AppGroup[]) => {
	if (!data || data.length < MIN) {
		return 750;
	}
	if (data.length > MIN && data?.length < MAX) {
		return 1100;
	}
	return 1450;
};

export const customAppgroupArraySort = (a: AppGroup, b: AppGroup, activeItem: string) => {
	if (a.name === activeItem || a.order < b.order) {
		return -1;
	} else if (b.name === activeItem || a.order > b.order) {
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

// Returns an object containing pinned apps based on the enabled apps, disabled apps, and favorites
export function getPinnedAppsGroup(enabledApps: App[], disabledApps: App[], favorites: AppManifest[]) {
	return favorites.reduce(
		(acc, curr) => {
			// Find the enabled app that matches the current favorite app key
			const enabledApp =
				enabledApps.find((app) => app.appKey === curr.key) ??
				disabledApps.find((app) => app.appKey === curr.key);

			if (enabledApp) {
				// If an enabled app is found, add it to the apps array in the accumulator
				return {
					...acc,
					apps: [...acc.apps, enabledApp],
				};
			}
			return acc;
		},
		{
			// Initial accumulator value for the pinned apps
			name: 'Pinned Apps',
			order: 0,
			accentColor: tokens.colors.infographic.substitute__pink_salmon.hex,
			apps: [],
		} as AppGroup
	);
}
