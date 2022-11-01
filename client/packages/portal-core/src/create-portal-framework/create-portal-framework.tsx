import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';

import { FusionConfigurator } from '@equinor/fusion-framework-react';
import { BehaviorSubject } from 'rxjs';

import { configureModuleLoader } from '../module-loader/module';
import { module } from '../work-surface-module/module';
import { LoggerLevel, PortalConfig } from '../types/portal-config';

export const framework$ = new BehaviorSubject<null | any>(null);

export function createPortalFramework(portalConfig: PortalConfig) {
  return (config: FusionConfigurator) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(
      {
        tenantId: '3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
        clientId: '9f166838-5d6b-4c44-8964-06db10eebd5d',
        redirectUri: '/authentication/login-callback',
      },
      { requiresAuth: true }
    );

    config.addConfig({ module });



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
