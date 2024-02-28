import { useFramework } from '@equinor/fusion-framework-react';

import { useObservableState } from '@equinor/fusion-observable/react';

import { AppModule } from '@equinor/fusion-framework-module-app';
import { useMemo } from 'react';
import { combineLatest, Observable, map } from 'rxjs';
import { AppCategory } from '../types';
import { usePortalConfig } from './use-portal-config';

export const usePortalApps = () => {
	const { data, isLoading, error } = usePortalConfig().queryApps;
	const { app } = useFramework<[AppModule]>().modules;

	const appCategories$ = useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return combineLatest([
			app?.getAllAppManifests(),
			new Observable<string[]>((sub) =>
				sub.next(
					(data as unknown as { apps: any }[])
						?.map((group) => group.apps)
						.flat()
						.map((app) => app.appKey) || []
				)
			),
		]).pipe(
			map(([manifests, apps]) =>
				(manifests || [])
					.filter((manifest) => apps.includes(manifest.key))
					.reduce((acc, appManifest) => {
						const category = acc.find((c) => appManifest.categoryId === c.id);
						if (category) {
							category.apps.push(appManifest);
							return acc;
						}

						if (appManifest.category) {
							acc.push({
								...appManifest.category,
								apps: [appManifest],
							});
						}

						return acc;
					}, [] as AppCategory[])
			)
		);
	}, [data]);

	const appCategory = useObservableState(appCategories$).value || [];

	// const appCategory = useMemo(() => {
	// 	return (data || []).reduce((acc, appManifest) => {
	// 		const category = acc.find((c) => appManifest.categoryId === c.id);
	// 		if (category) {
	// 			category.apps.push(appManifest);
	//      return acc
	// 		}

	// 		if (appManifest.category) {
	// 			acc.push({
	// 				...appManifest.category,
	// 				apps: [appManifest],
	// 			});
	// 		}

	// 		return acc;
	// 	}, [] as AppCategory[]);
	// }, [data]);
	const apps = useMemo(() => (data as any[])?.map((appGroupe) => appGroupe.apps).flat() || [], [data]);
	return {
		apps,
		appCategory,
		isLoading,
		error,
	};
};
