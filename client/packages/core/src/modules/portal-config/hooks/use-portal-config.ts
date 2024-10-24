import { useFramework } from '@equinor/fusion-framework-react';
import { PortalConfig } from '../module';

import { useObservableState } from '@equinor/fusion-observable/react';
import { useMemo } from 'react';
import { combineLatestWith, map } from 'rxjs';

import { AppModule } from '@equinor/fusion-framework-module-app';

export const usePortalConfig = () => {
	const { portalConfig } = useFramework<[PortalConfig]>().modules;

	const { value, error, complete } = useObservableState(useMemo(() => portalConfig.portal$, [portalConfig]));

	return {
		portal: value,
		error,
		isLoading: !complete,
	};
};

export const usePortalAppsConfig = () => {
	const { portalConfig, context, app } = useFramework<[PortalConfig, AppModule]>().modules;

	const { value, complete, error } = useObservableState(
		useMemo(
			() =>
				app.getAppManifests({ filterByCurrentUser: true }).pipe(
					combineLatestWith(portalConfig.getApps$({ contextId: context.currentContext?.id })),
					map(([apps, portalAppKeys]) => apps.filter((app) => portalAppKeys.includes(app.appKey)))
				),
			[context.currentContext?.id, portalConfig]
		)
	);

	return {
		apps: value,
		error,
		isLoading: !complete,
	};
};

export const usePortalRouter = () => {
	const { portalConfig } = useFramework<[PortalConfig]>().modules;

	const { value, error, complete } = useObservableState(useMemo(() => portalConfig.routes$, [portalConfig]));
	return {
		router: value,
		error,
		isLoading: !complete,
	};
};
