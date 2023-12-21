import { PortalWidgetConfigurator, IPortalWidgetConfigurator } from './configurator';
import { IPortalWidgetProvider, PortalWidgetProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalWidgets = Module<'portalWidgets', IPortalWidgetProvider, IPortalWidgetConfigurator>;

export const module: PortalWidgets = {
	name: 'portalWidgets',
	configure: () => new PortalWidgetConfigurator(),
	initialize: async (args): Promise<IPortalWidgetProvider> => {
		const config = await (args.config as PortalWidgetConfigurator).createConfig(args);
		return new PortalWidgetProvider(config);
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalWidgets: PortalWidgets;
	}
}
