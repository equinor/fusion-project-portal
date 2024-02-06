import { getDisabledApps, getPinnedAppsKeys, useObservable } from '@portal/utils';
import { menuFavoritesController } from '@equinor/portal-core';
import { useAppGroupsQuery, useAppModule } from '@portal/core';
import { combineLatest, map } from 'rxjs';
import { useCallback, useEffect, useMemo } from 'react';

export const useFavorites = () => {
	const { appModule } = useAppModule();

	const { data, isLoading } = useAppGroupsQuery();

	const favorite$ = useMemo(
		() =>
			combineLatest([appModule?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
			),
		[appModule.getAllAppManifests]
	);

	useEffect(() => {
		const sub = menuFavoritesController.cleanFavorites();
		return () => sub.unsubscribe();
	}, []);

	const favorites = useObservable(favorite$) || [];

	const disabledAppKeys = useMemo(() => {
		const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
		return getDisabledApps(enabledApps, favorites ?? [])
			.filter((app) => app.isDisabled)
			.map((app) => app.appKey);
	}, [data, favorites]);

	const isPinned = useCallback(
		(appKey: string) => {
			const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
			return getPinnedAppsKeys(enabledApps, favorites ?? []).includes(appKey);
		},
		[data, favorites]
	);

	const isDisabled = useCallback(
		(key: string) => {
			return disabledAppKeys.includes(key);
		},
		[disabledAppKeys]
	);

	const appGroups = useMemo(() => {
		return (data || []).map((group) => ({
			...group,
			apps: group.apps.map((app) => ({ ...app, isPinned: isPinned(app.appKey) })),
		}));
	}, [isPinned, data]);

	return {
		appGroups,
		favorites,
		disabledAppKeys,
		isDisabled,
		hasFavorites: favorites?.length,
		isLoading,
		addFavorite: menuFavoritesController.onClickFavorite,
	};
};
