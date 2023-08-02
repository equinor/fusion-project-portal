import { FusionConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation, NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { enableSignalR } from '@equinor/fusion-framework-module-signalr';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import {
	addPortalClient,
	configurePortalContext,
	LoggerLevel,
	PortalConfig,
	appConfigurator,
	TelemetryModule,
} from '@equinor/portal-core';
import { skip } from 'rxjs';
import { replaceContextInPathname } from '../utils/context-utils';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { signalRConfigurator } from './utils';
import { enableTelemetry } from '@equinor/portal-core';

const showInfo = false;

export function createPortalFramework(portalConfig: PortalConfig) {
	return (config: FusionConfigurator) => {
		config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

		config.configureServiceDiscovery(portalConfig.serviceDiscovery);

		enableAppModule(config, appConfigurator(portalConfig.portalClient.client));

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

		enableBookmark(config, (builder) => {
			builder.setSourceSystem(portalConfig.bookmarks);
		});

		/** Enable Navigation module  */
		enableNavigation(config);

		if (showInfo) {
			config.onConfigured(() => {
				showInfo && console.log('framework config done');
			});
		}

		config.onInitialized<[NavigationModule, TelemetryModule]>(async (fusion) => {
			configurePortalContext(fusion.context);

			/** Fusion Legacy App Loader should be removed when all application are migrated -- Start */
			fusion.navigation.state$.subscribe((nav) => {
				if (nav.action !== 'PUSH') return;

				if (
					nav.location.pathname.split('/').filter((path) => path === fusion.context.currentContext?.id)
						.length > 1
				) {
					fusion.navigation.navigator.go(-1);
				}
			});
			/**  End*/

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
					const pathname = replaceContextInPathname(context.id);
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
