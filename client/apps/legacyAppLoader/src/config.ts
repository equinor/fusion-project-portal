import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { Fusion } from '@equinor/fusion-framework-react';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';

const DEBUG_LOG = false;

interface Client {
	baseUri: string;
	defaultScopes: string[];
}

export const configure: AppModuleInitiator<
	[NavigationModule],
	Fusion<unknown>,
	{ config: { environment: { endpoints: { client: Client; portal: Client; apps: Client } } } }
> = (configurator, { env, fusion }) => {
	configurator.configureHttpClient('portal-client', env.config?.environment.endpoints.client);
	configurator.configureHttpClient('portal', env.config?.environment.endpoints.portal);

	window['clientBaseUri'] = env.config?.environment.endpoints.client.baseUri;
	// configurator.logger.level = 4;
	configurator.configureHttpClient('app', {
		baseUri: new URL('/apps-proxy/', location.origin).href,
		defaultScopes: env.config?.environment.endpoints.apps.defaultScopes,
	});

	enableAppModule(configurator);

	/** print render environment arguments */
	DEBUG_LOG && console.log('configuring application', env);

	/** callback when configurations is created */
	configurator.onConfigured((config) => {
		DEBUG_LOG && console.log('application config created', config);
	});

	/** callback when the application modules has initialized */
	configurator.onInitialized((instance) => {
		instance.navigation.navigator.subscribe((nav) => {
			if (nav.action !== 'PUSH') return;

			if (
				nav.location.pathname.split('/').filter((path) => path === fusion.modules.context.currentContext?.id)
					.length > 1
			) {
				instance.navigation.navigator.go(-1);
			}
		});

		DEBUG_LOG && console.log('application config initialized', instance);
	});
};

export default configure;
