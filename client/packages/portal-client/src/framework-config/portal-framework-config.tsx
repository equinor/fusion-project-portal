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
} from '@equinor/portal-core';
import { skip } from 'rxjs';
import { replaceContextInPathname } from '../utils/context-utils';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { signalRConfigurator } from './utils';

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

		config.onInitialized<[NavigationModule]>(async (fusion) => {
			configurePortalContext(fusion.context);

			fusion.navigation.subscribe((nav) => {
				if (nav.action !== 'PUSH') return;

				if (
					nav.path.pathname.split('/').filter((path) => path === fusion.context.currentContext?.id).length > 1
				) {
					fusion.navigation.navigator.go(-1);
				}
				console.log('---------->', event);
			});

			fusion.context.currentContext$.pipe(skip(1)).subscribe((context) => {
				const { navigator } = fusion.navigation;

				if (!context) {
					navigator.replace('/');
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
