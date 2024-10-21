import { useFramework } from '@equinor/fusion-framework-react';
import { PortalConfig } from '../module';

import { useQuery } from 'react-query';

import { useObservableState } from '@equinor/fusion-observable/react';
import { useAppProvider } from '@equinor/fusion-framework-react/app';
import { useMemo, useRef } from 'react';
import { combineLatest, combineLatestAll, combineLatestWith, filter, firstValueFrom, map, merge } from 'rxjs';
import { IContextProvider } from '@equinor/fusion-framework-module-context';
import { IPortalConfigProvider } from '../provider';
import { AppModule } from '@equinor/fusion-framework-module-app';
import { AppManifest } from '../types';

export const usePortalConfig2 = () => {
	const { portalConfig, context, app } = useFramework<[PortalConfig, AppModule]>().modules;

	const portal = useObservableState(portalConfig.state$).value?.portal;

	const { value, complete, error } = useObservableState(
		useMemo(
			() =>
				app.getAppManifests({ filterByCurrentUser: true }).pipe(
					combineLatestWith(portalConfig.getApps$({ contextId: context.currentContext?.id })),
					map(([apps, portalAppKeys]) => apps.filter((app) => portalAppKeys.includes(app.appKey)))
				),
			[context.currentContext?.id]
		)
	);

	return {
		portal,
		apps: {
			apps: value,
			error,
			isLoading: !complete,
		},

		queryRoutes: useQuery({
			queryFn: async () => await portalConfig.getRoutesAsync(),
			queryKey: ['portal', 'routes'],
		}),
		queryPortal: useQuery({
			queryFn: async () => await portalConfig.getPortalAsync(),
			queryKey: ['portal'],
		}),
		// queryApps: useQuery({
		// 	queryFn: async () => {
		// 		return await firstValueFrom(
		// 			app.getAppManifests({ filterByCurrentUser: true }).pipe(
		// 				combineLatestWith(portalConfig.getApps$({ contextId: context.currentContext?.id })),
		// 				map(([apps, portalAppKeys]) => apps.filter((app) => portalAppKeys.includes(app.appKey)))
		// 			)
		// 		);
		// 	},
		// 	queryKey: ['portal', 'apps', context.currentContext?.id || 'app-portal'],
		// 	enabled: Boolean(
		// 		(contextsActivated && context.currentContext && portal?.id) ||
		// 			(contextsActivated === false && portal?.id)
		// 	),
		// }),
	};
};

export const usePortalConfig = () => {
	const { portalConfig } = useFramework<[PortalConfig]>().modules;

	const { value, error, complete } = useObservableState(portalConfig.state$);
	return {
		portal: value?.portal,
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

export const usePortalRouterConfig = () => {
	const { portalConfig } = useFramework<[PortalConfig]>().modules;

	const { value, error, complete } = useObservableState(useMemo(() => portalConfig.routes$, [portalConfig]));
	return {
		router: value,
		error,
		isLoading: !complete,
	};
};
