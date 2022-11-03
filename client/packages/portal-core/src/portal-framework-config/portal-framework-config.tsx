import { contextModule } from '@equinor/fusion-framework-module-context';
import { ConsoleLogger } from '@equinor/fusion-framework-module-msal/client';
import { module as serviceModule } from '@equinor/fusion-framework-module-services';

import { BehaviorSubject } from 'rxjs';

import { ProjectPortalConfigurator } from '../portal-framework-configurator/portal-framework-configurator';
import { LoggerLevel, PortalConfig } from '../types/portal-config';

export const framework$ = new BehaviorSubject<null | any>(null);

export function createPortalFramework(portalConfig: PortalConfig) {
  return (config: ProjectPortalConfigurator) => {
    config.logger.level = (portalConfig.logger?.level as LoggerLevel) || 0;

    config.configureServiceDiscovery(portalConfig.serviceDiscovery);

    config.configureMsal(portalConfig.masal.client, portalConfig.masal.options);

    if (portalConfig.agGrid) {
      config.configureAgGrid(portalConfig.agGrid);
    }
    config.addConfig({
      module: serviceModule,
    });

    config.configurePortalClient(portalConfig.portalClient.client);

    config.configureAppLoader((moduleId: string) => {
      return 'https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/test-app.js';
    });

    config.onConfigured(() => {
      console.log('framework config done');
    });

    config.addConfig({ module: contextModule });

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
