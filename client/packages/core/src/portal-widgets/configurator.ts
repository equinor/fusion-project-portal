import { PortalWidgetConfigBuilder } from './config-builder';
import { PortalWidget } from './types';

import { ModuleInitializerArgs } from '@equinor/fusion-framework-module';

export interface PortalWidgetConfig {
	widgets: PortalWidget[];
}

export interface IPortalWidgetConfigurator {
	addConfigBuilder: (init: any) => void;
}
export class PortalWidgetConfigurator implements IPortalWidgetConfigurator {
	#configBuilders: Array<any> = [];

	addConfigBuilder(init: any): void {
		this.#configBuilders.push(init);
	}

	async createConfig(init: ModuleInitializerArgs<IPortalWidgetConfigurator>): Promise<PortalWidgetConfig> {
		const config = await this.#configBuilders.reduce(async (cur, cb) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const builder = new PortalWidgetConfigBuilder<any, any>(init, await cur);
			await Promise.resolve(cb(builder));
			return Object.assign(cur, builder.config);
		}, Promise.resolve({} as Partial<PortalWidgetConfig>));

		return config as PortalWidgetConfig;
	}
}
