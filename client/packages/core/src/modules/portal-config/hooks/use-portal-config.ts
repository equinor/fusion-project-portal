import { useFramework } from '@equinor/fusion-framework-react';
import { PortalConfig } from '../module';

import { useQuery } from 'react-query';

import { useObservableState } from '@equinor/fusion-observable/react';

export const usePortalConfig = () => {
	const { portalConfig, context } = useFramework<[PortalConfig]>().modules;
	const portal = useObservableState(portalConfig.state$).value?.portal;

	return {
		portal,
		queryRoutes: useQuery({
			queryFn: async () => await portalConfig.getRoutesAsync(),
			queryKey: ['portal', 'routes'],
		}),
		queryPortal: useQuery({
			queryFn: async () => await portalConfig.getPortalAsync(),
			queryKey: ['portal'],
		}),
		queryApps: useQuery({
			queryFn: async () =>
				await portalConfig.getAppsByContextAsync(portal?.id || '', context.currentContext?.id || ''),
			queryKey: ['portal', 'apps', context.currentContext?.id || 'context'],
			enabled: Boolean(context.currentContext && portal?.id),
		}),
	};
};
