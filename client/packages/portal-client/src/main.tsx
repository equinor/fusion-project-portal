import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import Framework from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { PortalProvider } from './components/portal-router/PortalRouter';
import { queryClient } from './utils/queryClient/query-client';
import { createPortalFramework } from './lib';
import { configureDebug } from '@equinor/portal-core';
import './customElementsDefinePolyfill';
import { PortalConfig } from '@portal/types';
import { PortalFramework, PortalFrameworkConfigurator } from '@portal/framework';
import { FusionFramework } from './FusionFramework';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

/* fusion core is spamming the console form module this will remove it in production */
configureDebug();

const config = (config: PortalFrameworkConfigurator) => {
	config.configureMsal(portalConfig.msal.client, portalConfig.msal.options);
	config.configureHttpClient('portal-client', portalConfig.portalClient.client);
	config.configureServiceDiscovery(portalConfig.serviceDiscovery);
};

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<PortalFramework configure={config} fallback={<PortalProgressLoader title="Configuring Portal" />}>
				<FusionFramework portalConfig={portalConfig} />
			</PortalFramework>
		</QueryClientProvider>
	</StrictMode>
);

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
