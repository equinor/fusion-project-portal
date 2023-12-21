import type { IModulesConfigurator } from '@equinor/fusion-framework-module';
import type { IPortalWidgetConfigurator } from './configurator';
import type { AnyModule, ModuleInitializerArgs } from '@equinor/fusion-framework-module';
import { module } from './module';

import { PortalWidgetConfigBuilder } from './config-builder';

export const enablePortalWidget = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: <TDeps extends Array<AnyModule> = []>(
		builder: PortalWidgetConfigBuilder<TDeps, ModuleInitializerArgs<IPortalWidgetConfigurator, TDeps>>
	) => void | Promise<void>
): void => {
	configurator.addConfig({
		module,
		configure: (contextConfigurator) => {
			builder && contextConfigurator.addConfigBuilder(builder);
		},
	});
};
