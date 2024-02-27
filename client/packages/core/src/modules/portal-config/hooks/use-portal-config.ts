import { useFramework } from '@equinor/fusion-framework-react';
import { PortalConfig } from '../module';

import { useQuery } from 'react-query';
import { useObservable } from '@portal/utils';

export const usePortalConfig = () => {
	const portalConfig = useFramework<[PortalConfig]>().modules.portalConfig;
	const portal = useObservable(portalConfig.state$)?.portal;
	return {
		portal,
		queryRoutes: useQuery({
			queryFn: async () => await portalConfig.getRoutesAsync(),
			queryKey: ['portal-routes'],
		}),
		queryPortal: useQuery({
			queryFn: async () => await portalConfig.getPortalAsync(),
			queryKey: ['portal'],
		}),
	};
};
