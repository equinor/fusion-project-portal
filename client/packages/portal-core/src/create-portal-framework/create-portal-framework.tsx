import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { createFrameworkProvider } from '@equinor/fusion-framework-react';

import {
  LoggerLevel,
  PortalConfig,
  WorkSurfaces,
} from '../types/portal-config';

// { name: 'phase'; initialize: () => { phases: Phase[] } }
export function createPortalFramework(
  portalConfig: PortalConfig
): React.LazyExoticComponent<
  React.FunctionComponent<{ children?: React.ReactNode }>
> {
  return createFrameworkProvider<
    [{ name: 'phase'; initialize: () => { phases: WorkSurfaces[] } }]
  >((config) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

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
