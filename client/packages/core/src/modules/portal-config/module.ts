import { PortalConfigConfigurator } from './configurator';
import { IPortalConfigProvider, PortalConfigProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalConfig = Module<'portalConfig', IPortalConfigProvider, PortalConfigConfigurator>;

export const module: PortalConfig = {
	name: 'portalConfig',
	configure: () => new PortalConfigConfigurator(),
	initialize: async (args): Promise<IPortalConfigProvider> => {
		const config = await (args.config as PortalConfigConfigurator).createConfigAsync(args);
		return new PortalConfigProvider(config);
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalServices: PortalConfig;
	}
}
