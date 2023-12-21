import { PortalServicesConfigurator, IPortalServicesConfigurator } from './configurator';
import { IPortalServicesProvider, PortalServicesProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalServices = Module<'portalServices', IPortalServicesProvider, IPortalServicesConfigurator>;

export const module: PortalServices = {
	name: 'portalServices',
	configure: () => new PortalServicesConfigurator(),
	initialize: async (args): Promise<IPortalServicesProvider> => {
		const config = await (args.config as PortalServicesConfigurator).createConfig(args);
		return new PortalServicesProvider(config);
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalServices: PortalServices;
	}
}
