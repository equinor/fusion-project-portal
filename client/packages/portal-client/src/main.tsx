import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { queryClient } from './utils/queryClient/query-client';
import { configureDebug, configurePortalContext } from '@equinor/portal-core';
import './customElementsDefinePolyfill';
import { PortalConfig } from '@portal/types';
import { PortalFramework, PortalFrameworkConfigurator } from '@portal/framework';
import { enablePortalConfig, PortalConfig as PortalConfigModule } from '@portal/core';

import { FusionFramework } from './FusionFramework';
import { ContextModuleConfigurator } from '@equinor/fusion-framework-module-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

/* fusion core is spamming the console form module this will remove it in production */
configureDebug();

const config = async (config: PortalFrameworkConfigurator) => {
	config.logger.level = 0;
	enablePortalConfig(config, (builder) => {
		builder.setConfig({
			portalId: portalConfig.portalId,
			portalEnv: portalConfig.fusionLegacyEnvIdentifier,
		});
	});

	config.configureMsal(portalConfig.msal.client, portalConfig.msal.options);
	config.configureHttpClient('portal-client', portalConfig.portalClient.client);
	config.configureServiceDiscovery(portalConfig.serviceDiscovery);
};

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<PortalFramework
				configure={config}
				portalId={portalConfig.portalId}
				fallback={<PortalProgressLoader title="Configuring Portal2" />}
			>
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
