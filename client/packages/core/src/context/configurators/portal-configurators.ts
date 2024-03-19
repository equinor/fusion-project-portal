import { IContextProvider } from '@equinor/fusion-framework-module-context';
import { FusionConfigurator } from '@equinor/fusion-framework-react';

import { Client } from '@portal/types';
import { setStoredContext, storeCurrentContext } from './portal-context-configurators';
import { setUserDefinedContextHistoryLength } from './portal-context-history';

export function addPortalClient(config: FusionConfigurator, client: Client) {
	config.configureHttpClient('portal-client', client);
}

export function configurePortalContext(contextProvider: IContextProvider) {
	storeCurrentContext(contextProvider);
	setStoredContext(contextProvider);
	setUserDefinedContextHistoryLength();
}
