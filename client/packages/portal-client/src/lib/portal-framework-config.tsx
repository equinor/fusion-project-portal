import { FusionConfigurator } from '@equinor/fusion-framework';
import { AppModule, enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation, NavigationModule } from '@equinor/fusion-framework-module-navigation';

import { enableSignalR } from '@equinor/fusion-framework-module-signalr';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import { addPortalClient, configurePortalContext } from '@equinor/portal-core';
import { skip } from 'rxjs';
import { replaceContextInPathname } from '../utils/context-utils';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { signalRConfigurator } from './signal-ir-configurator';
import { enablePortalMenu, enableTelemetry, TelemetryModule } from '@portal/core';
import { LoggerLevel, PortalConfig } from '@portal/types';
import { enableContext } from '@equinor/fusion-framework-module-context';
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import { createLocalStoragePlugin } from '@equinor/fusion-framework-module-feature-flag/plugins';
import { FeatureLogger } from './feature-logger';
import { enablePortalConfig } from '@portal/core';
import { PortalConfig as PortalConfigModule } from '@portal/core';
import { enableServiceDiscovery } from '@equinor/fusion-framework-module-service-discovery';

const showInfo = false;

function getClientIdFormScope(scope: string): string | undefined {
	return scope.match(
		/^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})/
	)?.[0];
}

export function createPortalFramework(portalConfig: PortalConfig) {
	return (config: FusionConfigurator) => {
		config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

		/** Legacy Fusion ClientId used in legacy auth provider  */
		(window as { clientId?: string }).clientId = getClientIdFormScope(
			portalConfig.serviceDiscovery.client.defaultScopes[0]
		);

		config.configureHttpClient('service_discovery', {
			baseUri: `https://discovery.fusion.equinor.com/service-registry/environments/${portalConfig.fusionLegacyEnvIdentifier}/services`,
			defaultScopes: portalConfig.serviceDiscovery.client.defaultScopes,
		});

		enableServiceDiscovery(config);

		enablePortalMenu(config);

		enablePortalConfig(config, (builder) => {
			builder.setConfig({
				portalId: portalConfig.portalId,
				portalEnv: portalConfig.fusionLegacyEnvIdentifier,
			});
		});

		enableContext(config);

		enableAppModule(config);

		config.configureHttpClient('app', {
			baseUri: new URL('/apps-proxy/', location.origin).href,
			defaultScopes: portalConfig.serviceDiscovery.client.defaultScopes,
		});

		config.configureMsal(portalConfig.msal.client, portalConfig.msal.options);

		if (portalConfig.agGrid?.licenseKey) {
			enableAgGrid(config, portalConfig.agGrid);
		}

		addPortalClient(config, portalConfig.portalClient.client);

		/** Enabling application insight module */
		if (portalConfig.applicationInsights) {
			enableTelemetry(config, {
				connectionString: portalConfig.applicationInsights.connectionString,
				customConfig: {
					aiCloudRole: 'project-portal',
					trackPageView: true,
				},
				enableAutoRouteTracking: true,
				autoTrackPageVisitTime: true,
			});
		}

		/** Enabling signal-r module for portal used for service messages */
		enableSignalR(
			config,
			'portal',
			signalRConfigurator({
				name: 'portal',
				service: 'portal',
				path: '/signalr/hubs/portal/?negotiateVersion=1',
			})
		);

		/** Enabling signal-r module for portal used for notifications*/
		enableSignalR(
			config,
			'notifications',
			signalRConfigurator({
				path: '/signalr/hubs/notifications/?negotiateVersion=1',
				name: 'notifications',
				service: 'portal',
			})
		);

		enableFeatureFlagging(config, (builder) => {
			builder.addPlugin(
				createLocalStoragePlugin([
					{
						key: 'project-prediction',
						title: 'Allocated Projects',
						description: 'When enabled you will get your allocated projects on the portal landing page',
						enabled: true,
					},
					{
						key: 'project-milestones',
						title: 'Project Milestones',
						description: 'When enabled you will see the project milestones on the project landing page',
						enabled: true,
					},
					{
						key: 'cc-tab',
						title: 'New Construction and Commissioning Tab',
						description: 'When enabled you will be able to tryout the new CC tab on project page',
					},
					{
						key: 'app-search',
						title: 'New App Search',
						description: 'When enabled you will be able to tryout the application search on project page',
					},
					{
						key: 'top-bar-app-search',
						title: 'New App Search in Top bar',
						description:
							'When enabled you will be able to tryout the application search in the top-bar. When active hit F1 to start searching.',
						enabled: true,
					},
				])
			);
		});

		enableBookmark(config, (builder) => {
			builder.setSourceSystem(portalConfig.bookmarks);
		});

		/** Enable Navigation module  */
		enableNavigation(config);

		// TODO remove and replace with service discovery!
		config.configureHttpClient('query_api', {
			baseUri: ((): string => {
				switch (portalConfig.fusionLegacyEnvIdentifier) {
					case 'FQA':
						return 'https://query-api-qa.azurewebsites.net';
					case 'FPRD':
						return 'https://query-api-prod.azurewebsites.net';
					default:
						return 'https://query-api-ci.azurewebsites.net';
				}
			})(),
			defaultScopes: ((): string[] => {
				switch (portalConfig.fusionLegacyEnvIdentifier) {
					case 'FPRD':
						return ['c695636b-1bd3-4ea5-9a05-ec3dc29b3eb3/.default'];
					default:
						return ['9f12661e-a8cf-4942-8fba-e304e2c16447/.default'];
				}
			})(),
		});

		config.configureHttpClient('review', {
			baseUri: ((): string => {
				switch (portalConfig.fusionLegacyEnvIdentifier) {
					case 'FQA':
						return 'https://backend-fusion-services-reviews-fqa.radix.equinor.com';
					case 'FPRD':
						return 'https://backend-fusion-services-reviews-fprd.radix.equinor.com';
					default:
						return 'https://backend-fusion-services-reviews-ci.radix.equinor.com';
				}
			})(),
			defaultScopes: portalConfig.serviceDiscovery.client.defaultScopes,
		});

		config.configureHttpClient('cc-api', {
			baseUri: ((): string => {
				switch (portalConfig.fusionLegacyEnvIdentifier) {
					case 'FPRD':
						return 'https://backend-fusion-data-gateway-prod.radix.equinor.com';
					default:
						return 'https://backend-fusion-data-gateway-test.radix.equinor.com';
				}
			})(),
			defaultScopes: ((): string[] => {
				switch (portalConfig.fusionLegacyEnvIdentifier) {
					case 'FPRD':
						return ['api://5b5025d2-182d-4f10-baf9-1960a2c03733/access_as_user'];
					default:
						return ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'];
				}
			})(),
		});

		if (showInfo) {
			config.onConfigured(() => {
				showInfo && console.log('framework config done');
			});
		}

		config.onInitialized<[NavigationModule, TelemetryModule, AppModule, PortalConfigModule]>(async (fusion) => {
			new FeatureLogger(fusion);

			fusion.portalConfig.portal$.subscribe((portal) => {
				document.title = portal?.name || `Fusion`;
			});

			// Todo: should be moved to context module

			fusion.portalConfig.state$.subscribe((state) => {
				if (state?.portal?.contexts) {
					configurePortalContext(fusion.context);
				}
			});

			// Todo: should be moved to context module
			fusion.context.currentContext$.pipe(skip(1)).subscribe((context) => {
				const { navigator } = fusion.navigation;
				const client = fusion.telemetry?.client;

				if (!context) {
					navigator.replace('/');
				} else {
					client?.trackEvent(
						{
							name: 'onContextChange',
						},
						{
							contextId: context?.id,
							contextTitle: context?.title,
							source: 'context',
						}
					);
				}

				if (context && context.id && !window.location.pathname.includes(context.id)) {
					const pathname = replaceContextInPathname(context.id, window.location.pathname);
					const to = { pathname, search: window.location.search, hash: window.location.hash };
					navigator.replace(to);
				}
			});
		});
	};
}

export default createPortalFramework;
