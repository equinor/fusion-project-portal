import { FrameworkEvent, FrameworkEventInit } from '@equinor/fusion-framework-module-event';
import type { Fusion } from './types';

declare module '@equinor/fusion-framework-module-event' {
	interface FrameworkEventMap {
		onPortalFrameworkLoaded: FrameworkEvent<FrameworkEventInit<Fusion>>;
	}
}

declare global {
	interface Window {
		FusionPortal: Fusion;
	}
}

export { PortalFrameworkConfigurator } from './PortalFrameworkConfigurator';

export * from './types';

export { default, initPortal } from './init';
export { PortalFramework } from './PortalFramework';
export { usePortalFrameworkModule } from './usePortalFrameworkModule';
export { usePortalFramework } from './usePortalFramework';
