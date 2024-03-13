import type { Module } from '@equinor/fusion-framework-module';
import { IPortalMenuProvider, PortalMenuProvider } from './provider';

export type PortalMenuModule = Module<'menu', IPortalMenuProvider, unknown, []>;

export const menuModule: PortalMenuModule = {
	name: 'menu',
	initialize: () => new PortalMenuProvider(),
};

export default menuModule;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		menu: PortalMenuModule;
	}
}
