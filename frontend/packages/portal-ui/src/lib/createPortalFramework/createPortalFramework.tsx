import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { createFrameworkProvider } from '@equinor/fusion-framework-react';

import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { PortalConfig } from '../typs/portalConfig';

export function createPortalFramework(
  portalConfig: PortalConfig
): React.LazyExoticComponent<
  React.FunctionComponent<{ children?: React.ReactNode }>
> {
  return createFrameworkProvider((config) => {
    config.logger.level =
      (portalConfig.logger?.level as 0 | 1 | 2 | 4 | 3) || 0;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

    portalConfig.agGrid &&
      config.addConfig(configureAgGrid(portalConfig.agGrid));

    config.onConfigured(() => {
      console.log('framework config done');
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
