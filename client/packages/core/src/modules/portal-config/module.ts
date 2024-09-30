import { PortalConfigConfigurator } from './configurator';
import { IPortalConfigProvider, PortalConfigProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalConfig = Module<'portalConfig', IPortalConfigProvider, PortalConfigConfigurator>;

export const module: PortalConfig = {
	name: 'portalConfig',
	configure: () => new PortalConfigConfigurator(),
	initialize: async (args): Promise<IPortalConfigProvider> => {
		const config = await (args.config as PortalConfigConfigurator).createConfigAsync(args, args.ref);
		const portalConfig = args.ref?.portalConfig || new PortalConfigProvider(config);
		window['portalConfig'] = portalConfig;
		return portalConfig;
	},
};

export default module;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalServices: PortalConfig;
	}
}

declare global {
	interface Window {
		portalConfig: PortalConfigProvider;
	}
}
