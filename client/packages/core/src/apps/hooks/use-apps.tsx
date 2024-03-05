import { useEffect, useMemo } from 'react';

import { Observable, combineLatest, map } from 'rxjs';
import { AppCategory } from '@portal/core';
import { useObservable } from '@portal/utils';
import { useAppGroupsQuery } from './use-app-groups-query';
import { usePortalApps } from '../../modules';
import { useAppModule } from '../../app/hooks';

export const useApps = () => {
	const { data, isLoading, error } = useAppGroupsQuery();
	const { apps: newApps, appCategory } = usePortalApps();
	const { appModule } = useAppModule();

	useEffect(() => {
		console.log(newApps, appCategory);
	}, [newApps, appCategory]);

	const appGroups$ = useMemo(() => {
		return combineLatest([
			appModule?.getAllAppManifests(),
			new Observable<AppCategory[]>((sub) => sub.next(data || [])),
		]).pipe(
			map(
				([manifests, groups]) =>
					groups.map((group) => ({
						...group,
						apps: group.apps.map((app) => ({ ...manifests.find((a) => a.key === app.key) })),
					})) as AppCategory[]
			)
		);
	}, [appModule.getAllAppManifests, data]);

	const appGroups = useObservable(appGroups$) || [];
	const apps = useMemo(() => appGroups?.map((appGroupe) => appGroupe.apps).flat() || [], [appGroups]);

	return { apps, appGroups, isLoading, error };
};
