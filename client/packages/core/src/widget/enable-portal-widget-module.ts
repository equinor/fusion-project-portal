import type { IModulesConfigurator } from '@equinor/fusion-framework-module';
import type { IWidgetConfigurator } from './configurator';
import type { AnyModule, ModuleInitializerArgs } from '@equinor/fusion-framework-module';
import { module } from './module';

import { WidgetConfigBuilder } from './config-builder';

export const enableWidgetModule = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: <TDeps extends Array<AnyModule> = []>(
		builder: WidgetConfigBuilder<TDeps, ModuleInitializerArgs<IWidgetConfigurator, TDeps>>
	) => void | Promise<void>
): void => {
	configurator.addConfig({
		module,
		configure: (contextConfigurator) => {
			builder && contextConfigurator.addConfigBuilder(builder);
		},
	});
};
