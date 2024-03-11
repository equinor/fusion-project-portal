import type { IModulesConfigurator } from '@equinor/fusion-framework-module';

import { module } from './module';
import { PortalConfigConfigurator } from './configurator';

export type PortalConfigBuilderCallback = (builder: PortalConfigConfigurator) => void | Promise<void>;

/**
 * Method for enabling the portal side sheet module
 * @param configurator - configuration object
 */
export const enablePortalConfig = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: PortalConfigBuilderCallback
): void => {
	configurator.addConfig({
		module,
		configure: (configurator) => {
			builder && builder(configurator);
		},
	});
};
