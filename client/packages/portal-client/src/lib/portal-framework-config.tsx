import { FusionConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation, NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { enableSignalR } from '@equinor/fusion-framework-module-signalr';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import { addPortalClient, configurePortalContext, appConfigurator, TelemetryModule } from '@equinor/portal-core';
import { skip } from 'rxjs';
import { replaceContextInPathname } from '../utils/context-utils';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { signalRConfigurator } from './signal-ir-configurator';
import { enableTelemetry } from '@equinor/portal-core';
import { LoggerLevel, PortalConfig } from '@portal/types';
import { enableContext } from '@equinor/fusion-framework-module-context';
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import { createLocalStoragePlugin } from '@equinor/fusion-framework-module-feature-flag/plugins';

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
		enableContext(config);
		config.configureServiceDiscovery(portalConfig.serviceDiscovery);

		enableAppModule(config, appConfigurator(portalConfig.portalClient.client));

		config.configureMsal(portalConfig.msal.client, portalConfig.msal.options);

		if (portalConfig.agGrid?.licenseKey) {
			enableAgGrid(config, portalConfig.agGrid);
		}
		config.configureHttpClient('cc-api', {
			baseUri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
			defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
		});

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
						key: 'new-menu',
						title: 'New Portal Menu',
						description: 'When enabled you will be able to tryout the new portal menu',
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

		if (showInfo) {
			config.onConfigured(() => {
				showInfo && console.log('framework config done');
			});
		}

		config.onInitialized<[NavigationModule, TelemetryModule]>(async (fusion) => {
			// Todo: should be moved to context module
			configurePortalContext(fusion.context);

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

			if (showInfo) {
				fusion.auth.defaultClient.setLogger(new ConsoleLogger(0));
				console.debug('📒 subscribing to all events');

				fusion.event.subscribe((e) => {
					console.debug(`🔔🌍 [${e.type}]`, e);
				});

				console.debug('📒 subscribing to [onReactAppLoaded]');
				fusion.event.addEventListener('onReactAppLoaded', (e) => {
					console.debug('🔔 [onReactAppLoaded]', e);
				});
			}
		});
	};
}

export default createPortalFramework;
