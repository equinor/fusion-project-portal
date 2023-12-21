import { useFramework } from '@equinor/fusion-framework-react';
import { PortalWidgets } from '../module';

export const usePortalWidgets = () => {
	return useFramework<[PortalWidgets]>().modules.portalWidgets;
};
