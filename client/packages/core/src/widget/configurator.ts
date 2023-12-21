import { PortalServicesConfigBuilder } from './config-builder';
import { PortalService } from './types';

import { ModuleInitializerArgs } from '@equinor/fusion-framework-module';

export interface PortalServicesConfig {
	widgets: PortalService[];
}

export interface IPortalServicesConfigurator {
	addConfigBuilder: (init: any) => void;
}
export class PortalServicesConfigurator implements IPortalServicesConfigurator {
	#configBuilders: Array<any> = [];

	addConfigBuilder(init: any): void {
		this.#configBuilders.push(init);
	}

	async createConfig(init: ModuleInitializerArgs<IPortalServicesConfigurator>): Promise<PortalServicesConfig> {
		const config = await this.#configBuilders.reduce(async (cur, cb) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const builder = new PortalServicesConfigBuilder<any, any>(init, await cur);
			await Promise.resolve(cb(builder));
			return Object.assign(cur, builder.config);
		}, Promise.resolve({} as Partial<PortalServicesConfig>));

		return config as PortalServicesConfig;
	}
}
