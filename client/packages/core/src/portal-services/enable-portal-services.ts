import type { IModulesConfigurator } from '@equinor/fusion-framework-module';
import type { IPortalServicesConfigurator } from './configurator';
import type { AnyModule, ModuleInitializerArgs } from '@equinor/fusion-framework-module';
import { module } from './module';

import { PortalServicesConfigBuilder } from './config-builder';

export const enablePortalServices = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: <TDeps extends Array<AnyModule> = []>(
		builder: PortalServicesConfigBuilder<TDeps, ModuleInitializerArgs<IPortalServicesConfigurator, TDeps>>
	) => void | Promise<void>
): void => {
	configurator.addConfig({
		module,
		configure: (contextConfigurator) => {
			builder && contextConfigurator.addConfigBuilder(builder);
		},
	});
};
