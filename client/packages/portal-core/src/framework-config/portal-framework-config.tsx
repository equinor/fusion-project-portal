import { FusionConfigurator } from '@equinor/fusion-framework';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';

import {
  addAgGrid,
  addAppLoader,
  addPortalClient,
  configurePortalContext,
} from '../framework-configurator/portal-configurators';

import { LoggerLevel, PortalConfig } from '../types/portal-config';
const showInfo = false;

export function createPortalFramework(portalConfig: PortalConfig) {
  return (config: FusionConfigurator) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

    if (portalConfig.agGrid) {
      addAgGrid(config, portalConfig.agGrid);
    }

    addPortalClient(config, portalConfig.portalClient.client);

    addAppLoader(config, (moduleId: string) => {
      return `https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/${
        moduleId === 'test-app' ? 'test-app' : 'handover'
      }`;
    });

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
