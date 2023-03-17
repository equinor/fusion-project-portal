import { FusionConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
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

		config.onInitialized(async (fusion) => {
			configurePortalContext(fusion.context);
			fusion.auth.defaultClient.setLogger(new ConsoleLogger(0));

			if (showInfo) {
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
