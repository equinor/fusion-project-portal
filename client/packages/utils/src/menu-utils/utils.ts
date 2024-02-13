import { FusionAppManifest, FusionAppGroup } from '@portal/types';
import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/fusion-framework-module-app';

export const getColumnCount = (MAX: number, appGroup?: FusionAppGroup[]) => {
	const count =
		appGroup?.reduce((acc, group) => {
			return acc + group.apps.length;
		}, 0) || 0;
	return Math.ceil(count / MAX);
};

export const customAppGroupArraySort = (a: FusionAppGroup, b: FusionAppGroup, activeItem: string) => {
	if (a.name === activeItem || a.name < b.name) {
		return -1;
	} else if (b.name === activeItem || a.name > b.name) {
		return 1;
	} else {
		return 0;
	}
};

// Returns an array of disabled apps based on the enabled apps and favorites
export function getDisabledApps(enabledApps: FusionAppManifest[], favorites: FusionAppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = enabledApps.map((app) => app.key);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites
		.filter((favorite) => !allAppKeys.includes(favorite.key))
		.map(
			(disabledApp): FusionAppManifest => ({
				...disabledApp,
				description: disabledApp.description ?? '',
				isDisabled: true,
				isPinned: true,
				order: disabledApp.order ?? 0,
			})
		);
}
// Returns an array of disabled apps based on the enabled apps and favorites
export function getPinnedAppsKeys(apps: FusionAppManifest[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = apps.map((app) => app.key);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites.filter((favorite) => allAppKeys.includes(favorite.key)).map((f) => f.key);
}

export function getPinnedAppsGroup(
	enabledApps: FusionAppManifest[],
	disabledApps: FusionAppManifest[],
	favorites: FusionAppManifest[]
) {
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
			name: 'Pinned Apps',
			order: 0,
			accentColor: tokens.colors.infographic.substitute__pink_salmon.hex,
			apps: [],
		} as FusionAppGroup
	);

	pinnedApps.apps.sort((a, b) => a.name.localeCompare(b.name));

	return pinnedApps;
}
