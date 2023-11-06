import { getDisabledApps, useObservable } from '@portal/utils';
import { menuFavoritesController, useAppGroupsQuery, useAppModule } from '@equinor/portal-core';
import { combineLatest, map } from 'rxjs';
import { useMemo } from 'react';

export const useFavorites = () => {
	const { appModule } = useAppModule();

	const { data } = useAppGroupsQuery();

	const favorite$ = useMemo(
		() =>
			combineLatest([appModule?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
			),
		[appModule.getAllAppManifests]
	);

	const favorites = useObservable(favorite$) || [];

	const disabledAppKeys = useMemo(() => {
		const enabledApps = (data?.map((group) => group.apps) ?? []).flat();
		return getDisabledApps(enabledApps, favorites ?? [])
			.filter((app) => app.isDisabled)
			.map((app) => app.appKey);
	}, [data, favorites]);

	return { favorites, disabledAppKeys, hasFavorites: favorites?.length };
};
