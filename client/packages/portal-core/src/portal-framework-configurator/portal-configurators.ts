import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { FusionConfigurator } from '@equinor/fusion-framework-react';
import { configureModuleLoader } from '../module-loader/module';
import { Client } from '../types/portal-config';

export function addPortalClient(config: FusionConfigurator, client: Client) {
  config.configureHttpClient('portal-client', client);
}

export function addWidgetClient(config: FusionConfigurator, client: Client) {
  config.configureHttpClient('widget-client', client);
}

export function addAgGrid(
  config: FusionConfigurator,
  ...args: Parameters<typeof configureAgGrid>
) {
  config.addConfig(configureAgGrid(...args));
}

export function addAppLoader(
  config: FusionConfigurator,
  urlGenerator: (appId: string) => string
) {
  config.addConfig(configureModuleLoader('appLoader', urlGenerator));
}

export function addWidgetLoader(
  config: FusionConfigurator,
  urlGenerator: (widgetId: string) => string
) {
  config.addConfig(configureModuleLoader('widgetLoader', urlGenerator));
}
