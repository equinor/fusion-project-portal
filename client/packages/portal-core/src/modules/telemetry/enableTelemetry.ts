import type { IModulesConfigurator } from '@equinor/fusion-framework-module';
import type { ITelemetryConfigurator } from './configurator';

import { module } from './module';
/**
 * Method for enabling the Telemetry Service module
 * @param configurator - configuration object
 * @param config - telemetry config object
 */
export const enableTelemetry = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	config: Omit<ITelemetryConfigurator, 'addConfig'>
): void => {
	configurator.addConfig({
		module,
		configure: (contextConfigurator) => {
			contextConfigurator.addConfig(config);
		},
	});
};
