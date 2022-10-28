import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { createFrameworkProvider } from '@equinor/fusion-framework-react';

import { configureModuleLoader } from '../module-loader/module';
import { LoggerLevel, Phase, PortalConfig } from '../types/portal-config';

// { name: 'phase'; initialize: () => { phases: Phase[] } }
export function createPortalFramework(
  portalConfig: PortalConfig
): React.LazyExoticComponent<
  React.FunctionComponent<{ children?: React.ReactNode }>
> {
  return createFrameworkProvider<
    [{ name: 'phase'; initialize: () => { phases: Phase[] } }]
  >((config) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;
    portalConfig.masal.client.redirectUri = window.location.origin;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

    if (portalConfig.agGrid) {
      config.addConfig(configureAgGrid(portalConfig.agGrid));
    }

    config.onConfigured(() => {
      console.log('framework config done');
    });

    config.addConfig({
      module: {
        name: 'phase',
        initialize: () => ({
          phases: portalConfig.phases || [],
        }),
      },
    });

    config.addConfig(
      configureModuleLoader('appLoader', (moduleId: string) => {
        return 'https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/test-app.js';
      })
    );

    config.onInitialized(async (fusion) => {
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
