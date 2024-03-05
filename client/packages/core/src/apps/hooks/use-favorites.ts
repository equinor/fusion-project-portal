import { getDisabledApps, getPinnedAppsKeys, useAppModule, AppCategory, AppManifest } from '@portal/core';
import { useObservable } from '@portal/utils';
import { menuFavoritesController } from '@equinor/portal-core';

import { Observable, combineLatest, map } from 'rxjs';
import { useCallback, useEffect, useMemo } from 'react';
import { useApps } from './use-apps';

export const useOldFavorites = () => {
	const { apps, appGroups, isLoading } = useApps();
	const { appModule } = useAppModule();

	const favorite$ = useMemo(
		() =>
			combineLatest([appModule?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
			),
		[apps]
	) as Observable<AppManifest[]>;

	useEffect(() => {
		const sub = menuFavoritesController.cleanFavorites();
		return () => sub.unsubscribe();
	}, []);

	const favorites = useObservable(favorite$) || [];

	const disabledAppKeys = useMemo(() => {
		const enabledApps = (appGroups?.map((group) => group.apps) ?? []).flat();
		return getDisabledApps(enabledApps, favorites ?? [])
			.filter((app) => app.isDisabled)
			.map((app) => app.key);
	}, [appGroups, favorites]);

	const isPinned = useCallback(
		(appKey: string) => {
			const enabledApps = (appGroups?.map((group) => group.apps) ?? []).flat();
			return getPinnedAppsKeys(enabledApps, favorites ?? []).includes(appKey);
		},
		[appGroups, favorites]
	);

	const isDisabled = useCallback(
		(key: string) => {
			return disabledAppKeys.includes(key);
		},
		[disabledAppKeys]
	);

	const favoritesWithDisabled =
		useMemo(() => favorites.map((p) => ({ ...p, isDisabled: isDisabled(p.key) })), [favorites, isDisabled]) || [];

	const appGroupsWithPinned = useMemo(() => {
		return (appGroups || []).map((group) => ({
			...group,
			apps: group.apps.map((app) => ({ ...app, isPinned: isPinned(app.key) })),
		})) as AppCategory[];
	}, [isPinned, appGroups]);

	return {
		appGroups: appGroupsWithPinned,
		favorites: favoritesWithDisabled,
		disabledAppKeys,
		isDisabled,
		hasFavorites: favorites?.length,
		isLoading,
		addFavorite: menuFavoritesController.onClickFavorite,
	};
};
