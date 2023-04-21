import { FusionConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation, NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { enableSignalR } from '@equinor/fusion-framework-module-signalr';
import {
	addAgGrid,
	addPortalClient,
	configurePortalContext,
	LoggerLevel,
	PortalConfig,
	appConfigurator,
} from '@equinor/portal-core';

const showInfo = false;

export function createPortalFramework(portalConfig: PortalConfig) {
	return (config: FusionConfigurator) => {
		config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

		config.configureServiceDiscovery(portalConfig.serviceDiscovery);

		enableAppModule(config, appConfigurator);

		config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

		if (portalConfig.agGrid) {
			addAgGrid(config, portalConfig.agGrid);
		}

		addPortalClient(config, portalConfig.portalClient.client);

		/** Enabling signal-r module for portal used for service messages */
		enableSignalR(config, 'portal', {
			service: 'portal',
			path: '/signalr/hubs/portal/?negotiateVersion=1',
		});

		/** Enable Navigation module  */
		enableNavigation(config);

		if (showInfo) {
			config.onConfigured(() => {
				showInfo && console.log('framework config done');
			});
		}

		config.onInitialized<[NavigationModule]>(async (fusion) => {
			configurePortalContext(fusion.context);

			fusion.context.currentContext$.subscribe((context) => {
				const { navigator } = fusion.navigation;

				if (!context) {
					navigator.replace('/');
				}

				if (context && context.id && !window.location.pathname.includes(context.id)) {
					const pathname = window.location.pathname.replace(
						/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
						context.id
					);
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
