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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

/* fusion core is spamming the console form module this will remove it in production */
configureDebug();

const config = (config: PortalFrameworkConfigurator) => {
	enablePortalConfig(config, (builder) => {
		builder.setConfig({
			portalId: portalConfig.portalId,
			portalEnv: portalConfig.fusionLegacyEnvIdentifier,
		});

		// builder.setRoutes({
		// 	root: {
		// 		pageKey: 'project-portal',
		// 	},

		// 	routes: [
		// 		{
		// 			path: 'project/*',
		// 			pageKey: 'project',
		// 			messages: {
		// 				errorMessage: 'Fail to load project page',
		// 			},
		// 			children: [
		// 				{
		// 					messages: {
		// 						errorMessage: 'Fail to load project page',
		// 					},
		// 					path: ':contextId',
		// 					pageKey: 'project',
		// 				},
		// 			],
		// 		},
		// 		{
		// 			path: 'facility/*',
		// 			pageKey: 'facility',
		// 			messages: {
		// 				errorMessage: 'Fail to load facility page',
		// 			},
		// 			children: [
		// 				{
		// 					messages: {
		// 						errorMessage: 'Fail to load facility page',
		// 					},
		// 					path: ':contextId',
		// 					pageKey: 'facility',
		// 				},
		// 			],
		// 		},
		// 	],
		// });
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
