import type { AppModuleInitiator } from '@equinor/fusion-framework-app';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

interface Client {
	baseUri: string;
	defaultScopes: string[];
}

export const configure: AppModuleInitiator = (configurator, { env }) => {
	const { basename, config } = env;

	enableNavigation(configurator, basename);

	const environment = config?.environment.endpoints as { client: Client };
	configurator.configureHttpClient('portal-client', environment.client);
};

export default configure;
