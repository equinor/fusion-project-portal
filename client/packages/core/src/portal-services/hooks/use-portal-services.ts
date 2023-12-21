import { useFramework } from '@equinor/fusion-framework-react';
import { PortalServices } from '../module';

export const usePortalServices = () => {
	return useFramework<[PortalServices]>().modules.portalServices;
};
