import { useFramework } from '@equinor/fusion-framework-react';
import { PortalApps } from '../module';

import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useMemo } from 'react';
import { combineLatestWith, map } from 'rxjs';

import { AppModule } from '@equinor/fusion-framework-module-app';
import { appsToAppCategory } from '../utils/appsToAppCategory';

export const usePortalApps = () => {
	const { portalApps, app, context } = useFramework<[PortalApps, AppModule]>().modules;

	if (!portalApps) {
		const error = new Error('PortalApps module is required');
		error.name = 'PortalApps Module is Missing';
		throw error;
	}

	useEffect(() => {
		const sub = context.currentContext$.subscribe((context) => {
			portalApps.getApps({ contextId: context?.id });
		});
		return () => sub.unsubscribe();
	}, [portalApps, context]);

	const {
		value: apps,
		error,
		complete,
	} = useObservableState(
		useMemo(
			() =>
				portalApps.apps$.pipe(
					combineLatestWith(app.getAppManifests({ filterByCurrentUser: true })),
					map(([filter, appManifests]) => appManifests?.filter((app) => filter?.includes(app.appKey)))
				),
			[portalApps, app]
		)
	);

	// Organize apps into categories using memoized the result
	const appCategories = useMemo(() => {
		return appsToAppCategory(apps);
	}, [apps]);

	return {
		apps,
		appCategories,
		error,
		isLoading: !complete && !apps,
	};
};
