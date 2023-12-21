import { PortalServicesConfigurator, IPortalServicesConfigurator } from './configurator';
import { IPortalServicesProvider, PortalWidgetProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalWidgets = Module<'portalWidgets', IPortalServicesProvider, IPortalServicesConfigurator>;

export const module: PortalWidgets = {
	name: 'portalServices',
	configure: () => new PortalServicesConfigurator(),
	initialize: async (args): Promise<IPortalServicesProvider> => {
		const config = await (args.config as PortalServicesConfigurator).createConfig(args);
		return new PortalWidgetProvider(config);
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalWidgets: PortalWidgets;
	}
}
