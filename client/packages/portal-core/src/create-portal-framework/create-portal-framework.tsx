import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { createFrameworkProvider } from '@equinor/fusion-framework-react';
import { BehaviorSubject } from 'rxjs';

import { configureModuleLoader } from '../module-loader/module';
import { module } from '../work-surface-module/module';
import { LoggerLevel, Phase, PortalConfig } from '../types/portal-config';

export const framework$ = new BehaviorSubject<null | any>(null);

export function createPortalFramework(
  portalConfig: PortalConfig
): React.LazyExoticComponent<
  React.FunctionComponent<{ children?: React.ReactNode }>
> {
  return createFrameworkProvider((config) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;
    portalConfig.masal.client.redirectUri = window.location.origin;

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

    config.configureHttpClient('portal', {
      baseUri: 'https://app-pep-backend-noe-dev.azurewebsites.net',
    });

    if (portalConfig.agGrid) {
      config.addConfig(configureAgGrid(portalConfig.agGrid));
    }

    config.onConfigured(() => {
      console.log('framework config done');
    });

    config.addConfig(
      configureModuleLoader('appLoader', (moduleId: string) => {
        return 'https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/test-app.js';
      })
    );

    config.onInitialized(async (fusion) => {
      framework$.next(fusion);
      if (portalConfig.logger?.defaultClientLogger?.active) {
        fusion.auth.defaultClient.setLogger(
          new ConsoleLogger(portalConfig.logger.defaultClientLogger.level)
        );

        console.debug('📒 subscribing to all events');
        fusion.event.subscribe((e) => console.debug(`🔔🌍 [${e.type}]`, e));

        console.debug('📒 subscribing to [onReactAppLoaded]');
        fusion.event.addEventListener('onReactAppLoaded', (e) =>
          console.debug('🔔 [onReactAppLoaded]', e)
        );
      }
    });
  });
}

export default createPortalFramework;
