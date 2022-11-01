import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';

import { FusionConfigurator } from '@equinor/fusion-framework-react';
import { BehaviorSubject } from 'rxjs';

import { configureModuleLoader } from '../module-loader/module';
import { LoggerLevel, PortalConfig } from '../types/portal-config';

export const framework$ = new BehaviorSubject<null | any>(null);

export function createPortalFramework(portalConfig: PortalConfig) {
  return (config: FusionConfigurator) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

    if (portalConfig.agGrid) {
      config.addConfig(configureAgGrid(portalConfig.agGrid));
    }

    config.onConfigured(() => {
      console.log('framework config done');
    });

    config.configureHttpClient(
      'portal-client',
      portalConfig.portalClient.client
    );

    config.addConfig(
      configureModuleLoader('appLoader', (moduleId: string) => {
        return 'https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/test-app.js';
      })
    );

    config.onInitialized(async (fusion) => {
      framework$.next(fusion);
      fusion.auth.defaultClient.setLogger(new ConsoleLogger(0));

      console.debug('📒 subscribing to all events');
      fusion.event.subscribe((e) => console.debug(`🔔🌍 [${e.type}]`, e));

      console.debug('📒 subscribing to [onReactAppLoaded]');
      fusion.event.addEventListener('onReactAppLoaded', (e) =>
        console.debug('🔔 [onReactAppLoaded]', e)
      );
    });
  };
}

export default createPortalFramework;
