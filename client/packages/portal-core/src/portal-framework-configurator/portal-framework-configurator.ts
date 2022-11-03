import { ModuleConsoleLogger } from '@equinor/fusion-framework-module';

import { FusionConfigurator } from '@equinor/fusion-framework';
import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { configureModuleLoader } from '../module-loader/module';
import { Client } from '../types/portal-config';

/**
 * Custom Project portal Configurator for Fusion Framework,
 * for easier and cleaner configuring.
 **/
export class ProjectPortalConfigurator extends FusionConfigurator {
  constructor() {
    super();
    this.logger = new ModuleConsoleLogger('ProjectPortalConfigurator');
  }

  public configurePhase() {
    // To be implemented when ready
  }

  public configurePortalClient(client: Client) {
    this.configureHttpClient('portal-client', client);
  }

  public configureAgGrid(...args: Parameters<typeof configureAgGrid>) {
    this.addConfig(configureAgGrid(...args));
  }

  public configureAppLoader(urlGenerator: (appId: string) => string) {
    this.addConfig(configureModuleLoader('appLoader', urlGenerator));
  }

  public configureWidgetLoader(urlGenerator: (widgetId: string) => string) {
    this.addConfig(configureModuleLoader('widgetLoader', urlGenerator));
  }
}
