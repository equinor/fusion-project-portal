import { PortalAppsConfigConfigurator } from './configurator';
import { IPortalAppsProvider, PortalAppsProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalApps = Module<'portalApps', IPortalAppsProvider, PortalAppsConfigConfigurator>;

export const modulePortalApps: PortalApps = {
	name: 'portalApps',
	configure: () => new PortalAppsConfigConfigurator(),
	initialize: async (args): Promise<IPortalAppsProvider> => {
		const config = await (args.config as PortalAppsConfigConfigurator).createConfigAsync(args);
		return new PortalAppsProvider(config);
	},
};

export default modulePortalApps;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalApps: PortalApps;
	}
}
