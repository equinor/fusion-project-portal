import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './utils/queryClient/query-client';
import { configureDebug } from '@equinor/portal-core';
import './customElementsDefinePolyfill';
import { PortalConfig } from '@portal/types';

import { enablePortalConfig, PortalConfig as PortalConfigModule } from '@portal/core';

import { FusionFramework } from './FusionFramework';
import { ContextModuleConfigurator } from '@equinor/fusion-framework-module-context';
import { ModulesConfigurator } from '@equinor/fusion-framework-module';
import { configureHttpClient } from '@equinor/fusion-framework-module-http';
import { configureMsal } from '@equinor/fusion-framework-module-msal';
import { enableServiceDiscovery, configureServiceDiscovery } from '@equinor/fusion-framework-module-service-discovery';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

/* fusion core is spamming the console form module this will remove it in production */
configureDebug();

// configurator.addConfig(configureHttpClient('portal-client', portalConfig.portalClient.client));

const configurator = new ModulesConfigurator();

configurator.logger.level = 0;

configurator.addConfig(configureMsal(portalConfig.msal.client, portalConfig.msal.options));

configurator.addConfig(
	configureHttpClient('service_discovery', {
		baseUri: `https://discovery.fusion.equinor.com/service-registry/environments/${portalConfig.fusionLegacyEnvIdentifier}/services`,
		defaultScopes: portalConfig.serviceDiscovery.client.defaultScopes,
	})
);

configurator.addConfig(configureHttpClient('portal-client', portalConfig.portalClient.client));

enablePortalConfig(configurator, (builder) => {
	builder.setConfig({
		portalId: localStorage.getItem('portalId') || portalConfig.portalId,
		portalEnv: portalConfig.fusionLegacyEnvIdentifier,
	});
});

enableServiceDiscovery(configurator);

(async () => {
	const modules = await configurator.initialize();

	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<FusionFramework portalConfig={portalConfig} modules={modules} />
			</QueryClientProvider>
		</StrictMode>
	);
})();

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
