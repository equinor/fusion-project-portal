import { AppModule } from '@equinor/fusion-framework-module-app';
import { useFramework } from '@equinor/fusion-framework-react';
import { useAppGroupsQuery } from '@portal/core';
import { Observable, combineLatest, map } from 'rxjs';
import { AppGroup } from '@portal/types';
import { useMemo } from 'react';
import { AppManifest } from '@portal/components';

export const useApps = () => {
	const fusion = useFramework<[AppModule]>();
	const { data, isLoading } = useAppGroupsQuery();

	const favorites$ = useMemo(
		() =>
			combineLatest([
				fusion.modules.app.getAllAppManifests(),
				new Observable<AppGroup[] | undefined>((sub) => sub.next(data)),
			]).pipe(
				map(([appManifests, appGroups]) =>
					appGroups?.map((group) => {
						return {
							...group,
							apps: group.apps.map((app) => {
								const manifest = appManifests.find((a) => a.key == app.appKey);
								return { ...app, isPinned: (manifest as AppManifest).isPinned };
							}),
						};
					})
				)
			),
		[fusion.modules.app.getAllAppManifests, data]
	);
};
