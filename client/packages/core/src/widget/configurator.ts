import { WidgetConfigBuilder, WidgetConfigBuilderCallback } from './config-builder';
import { WidgetManifest } from './types';
import type { HttpModule, IHttpClient } from '@equinor/fusion-framework-module-http';
import type { ServiceDiscoveryModule } from '@equinor/fusion-framework-module-service-discovery';
import type { QueryCtorOptions } from '@equinor/fusion-query';
import { ModuleInitializerArgs } from '@equinor/fusion-framework-module';
import { moduleKey } from './module';

export interface WidgetModuleConfig {
	client: {
		getWidgetManifest: QueryCtorOptions<WidgetManifest, { name: string }>;
	};
}
export interface IWidgetConfigurator {
	addConfigBuilder: (init: WidgetConfigBuilderCallback) => void;
}
export class WidgetConfigurator implements IWidgetConfigurator {
	#configBuilders: Array<WidgetConfigBuilderCallback> = [];

	defaultExpireTime = 1 * 60 * 1000;

	addConfigBuilder(init: WidgetConfigBuilderCallback): void {
		this.#configBuilders.push(init);
	}

	protected async _createHttpClient(
		init: ModuleInitializerArgs<IWidgetConfigurator, [HttpModule, ServiceDiscoveryModule]>
	): Promise<IHttpClient> {
		const http = await init.requireInstance('http');
		/** check if the http provider has configure a client */
		if (http.hasClient(moduleKey)) {
			return http.createClient(moduleKey);
		} else {
			/** load service discovery module */
			const serviceDiscovery = await init.requireInstance('serviceDiscovery');
			return await serviceDiscovery.createClient('app');
		}
	}

	async createConfig(init: ModuleInitializerArgs<IWidgetConfigurator>): Promise<WidgetModuleConfig> {
		const config = await this.#configBuilders.reduce(async (cur, cb) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const builder = new WidgetConfigBuilder<any, any>(init, await cur);
			await Promise.resolve(cb(builder));
			return Object.assign(cur, builder.config);
		}, Promise.resolve({} as Partial<WidgetModuleConfig>));

		config.client ??= await (async (): Promise<WidgetModuleConfig['client']> => {
			const httpClient = await this._createHttpClient(init);
			return {
				getWidgetManifest: {
					client: {
						fn: ({ name }) => httpClient.json$<WidgetManifest>(`/widgets/${name}`),
					},
					key: ({ name }) => name,
					expire: this.defaultExpireTime,
				},
			};
		})();
		return config as WidgetModuleConfig;
	}
}
