import { useMemo } from 'react';
import { PortalConfig } from '@portal/types';

import Framework from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { PortalProvider } from './components/portal-router/PortalRouter';
import { createPortalFramework } from './lib';
import { usePortalFrameworkModule } from '../../portal-framework/src';
import { useQuery } from 'react-query';
import { Portal } from '@portal/core';

export const FusionFramework = ({ portalConfig }: { portalConfig: PortalConfig }) => {
	const { data } = usePortalConfig(portalConfig.portalId);

	const configure = useMemo(() => createPortalFramework(portalConfig, data), [portalConfig, data]);

	if (!configure) return <PortalProgressLoader title="Configuring Portal" />;

	return (
		<Framework configure={configure} fallback={<PortalProgressLoader title="Configuring Portal" />}>
			<PortalProvider />
		</Framework>
	);
};

const usePortalConfig = (portalId: string) => {
	const http = usePortalFrameworkModule('http');
	const client = http?.createClient('portal-client');

	return useQuery({
		queryFn: () => {
			return client?.json<Portal>(`api/portals/${portalId}`);
		},
	});
};
