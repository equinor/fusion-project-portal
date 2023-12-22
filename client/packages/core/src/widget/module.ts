import { WidgetConfigurator, IWidgetConfigurator } from './configurator';
import { IPortalServicesProvider, PortalWidgetProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export const moduleKey = 'portalWidgets';

export type PortalWidgets = Module<'portalWidgets', IPortalServicesProvider, IWidgetConfigurator>;

export const module: PortalWidgets = {
	name: moduleKey,
	configure: () => new WidgetConfigurator(),
	initialize: async (args): Promise<IPortalServicesProvider> => {
		const config = await (args.config as WidgetConfigurator).createConfig(args);
		return new PortalWidgetProvider(config);
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		[moduleKey]: PortalWidgets;
	}
}
