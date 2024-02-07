import { useMemo } from 'react';
import { useAppGroupsQuery, useAppModule } from '@portal/core';
import { Observable, combineLatest, map } from 'rxjs';
import { AppGroup, FusionAppGroup } from '@portal/types';
import { useObservable } from '@portal/utils';

export const useApps = () => {
	const { data, isLoading, error } = useAppGroupsQuery();
	const { appModule } = useAppModule();

	const appGroups$ = useMemo(() => {
		return combineLatest([
			appModule?.getAllAppManifests(),
			new Observable<AppGroup[]>((sub) => sub.next(data)),
		]).pipe(
			map(
				([manifests, groups]) =>
					groups.map((group) => ({
						...group,
						apps: group.apps.map((app) => ({ ...manifests.find((a) => a.key === app.appKey) })),
					})) as FusionAppGroup[]
			)
		);
	}, [appModule.getAllAppManifests, data]);

	const appGroups = useObservable(appGroups$) || [];
	const apps = useMemo(() => appGroups?.map((appGroupe) => appGroupe.apps).flat() || [], [appGroups]);

	return { apps, appGroups, isLoading, error };
};
