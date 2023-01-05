import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { IContextProvider } from '@equinor/fusion-framework-module-context';
import { FusionConfigurator } from '@equinor/fusion-framework-react';

import { Client } from '../types/portal-config';
import {
  setStoredContext,
  storeCurrentContext,
} from './portal-context-configurators';
import { setUserDefinedContextHistoryLength } from './portal-context-history';

export function addPortalClient(config: FusionConfigurator, client: Client) {
  config.configureHttpClient('portal-client', client);
}

export function addAgGrid(
  config: FusionConfigurator,
  ...args: Parameters<typeof configureAgGrid>
) {
  config.addConfig(configureAgGrid(...args));
}

export function configurePortalContext(contextProvider: IContextProvider) {
  storeCurrentContext(contextProvider);
  setStoredContext(contextProvider);
  setUserDefinedContextHistoryLength();
}
