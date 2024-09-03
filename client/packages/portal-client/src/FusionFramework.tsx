import { useMemo } from 'react';
import { PortalConfig } from '@portal/types';

import Framework from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { PortalProvider } from './components/portal-router/PortalRouter';
import { createPortalFramework } from './lib';
import { usePortalFramework } from '../../portal-framework/src';
import { PortalConfig as PortalConfigModule } from '@portal/core';
import { useObservableState } from '@equinor/fusion-observable/react';

const usePortal = () => {
	const { portalConfig: pcm } = usePortalFramework<[PortalConfigModule]>().modules;
	return useObservableState(pcm.state$).value?.portal;
};

export const FusionFramework = ({ portalConfig }: { portalConfig: PortalConfig }) => {
	const portal = usePortal();
	const configure = useMemo(() => createPortalFramework(portalConfig, portal), [portalConfig, portal]);

	if (!configure) return <PortalProgressLoader title="Configuring Portal" />;

	return (
		<Framework configure={configure} fallback={<PortalProgressLoader title="Configuring Portal" />}>
			<PortalProvider />
		</Framework>
	);
};
