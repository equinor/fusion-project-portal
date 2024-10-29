import { useFramework } from '@equinor/fusion-framework-react';
import { PortalConfig } from '../module';

import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useMemo } from 'react';
import { combineLatestWith, map } from 'rxjs';

import { AppModule } from '@equinor/fusion-framework-module-app';

export const usePortal = () => {
	const { portalConfig } = useFramework<[PortalConfig]>().modules;

	const { value, error } = useObservableState(useMemo(() => portalConfig.current$, [portalConfig]));

	return {
		portal: value || portalConfig.current,
		error,
	};
};

export const usePortalConfig = () => {
	const { portal } = usePortal();
	const { value, error, complete } = useObservableState(useMemo(() => portal.portalConfig$, [portal]));

	return {
		portal: value,
		error,
		isLoading: !complete,
	};
};

export const usePortalAppsConfig = () => {
	const { app, context } = useFramework<[PortalConfig, AppModule]>().modules;
	const { portal } = usePortal();

	useEffect(() => {
		const sub = context.currentContext$.subscribe((context) => {
			if ((portal.portalConfig.contexts || []).length > 0) {
				context && portal.getAppKeysByContext(context.id);
			} else {
				portal.getAppKeys();
			}
		});
		return () => sub.unsubscribe();
	}, [portal.portalConfig, context]);

	const { value: apps, error } = useObservableState(
		useMemo(
			() =>
				portal.appsKeys$.pipe(
					combineLatestWith(app.getAppManifests({ filterByCurrentUser: true })),
					map(([appKeysFilter, appManifests]) =>
						appManifests?.filter((app) => appKeysFilter.includes(app.appKey))
					)
				),
			[portal, app]
		)
	);

	return {
		apps,
		error,
		isLoading: !apps,
	};
};

export const usePortalRouter = () => {
	const { portal } = usePortal();
	const { value, error, complete } = useObservableState(useMemo(() => portal.routes$, [portal]));

	return {
		router: value,
		error,
		isLoading: !complete,
	};
};
