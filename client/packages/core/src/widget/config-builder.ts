import type { AnyModule, ModuleInitializerArgs, Modules, ModuleType } from '@equinor/fusion-framework-module';

import type { IWidgetConfigurator, WidgetModuleConfig, PortalServicesConfigurator } from './configurator';
import { QueryFn, QueryCtorOptions } from '@equinor/fusion-query';
import { WidgetManifest } from './types';

export type WidgetConfigBuilderCallback = <TDeps extends Array<AnyModule> = []>(
	builder: WidgetConfigBuilder<TDeps, ModuleInitializerArgs<IWidgetConfigurator, TDeps>>
) => void | Promise<void>;

export class WidgetConfigBuilder<
	TModules extends Array<AnyModule> = [],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TInit extends ModuleInitializerArgs<any, any> = ModuleInitializerArgs<PortalServicesConfigurator, TModules>
> {
	#init: TInit;

	constructor(init: TInit, public config: Partial<WidgetModuleConfig> = {}) {
		this.#init = init;
	}

	requireInstance<TKey extends string = Extract<keyof Modules, string>>(
		module: TKey
	): Promise<ModuleType<Modules[TKey]>>;

	requireInstance<T>(module: string): Promise<T>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	requireInstance(module: string): Promise<any> {
		return this.#init.requireInstance(module);
	}

	setAppClient(
		client: {
			getWidgetManifest:
				| QueryFn<WidgetManifest, { name: string }>
				| QueryCtorOptions<WidgetManifest, { name: string }>;
		},
		expire = 1 * 60 * 1000
	) {
		client;
		expire;

		this.config.client = {
			getWidgetManifest:
				typeof client.getWidgetManifest === 'function'
					? {
							key: ({ name }) => name,
							client: {
								fn: client.getWidgetManifest,
							},
							expire,
					  }
					: client.getWidgetManifest,
		};
	}
}
