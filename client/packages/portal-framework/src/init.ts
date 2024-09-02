import type { AnyModule } from '@equinor/fusion-framework-module';

import { PortalFrameworkConfigurator } from './PortalFrameworkConfigurator';
import type { Fusion, FusionPortalModules } from './types';

/**
 *
 * @template TModules addition modules
 * @template TRef optional reference
 *
 * @param configurator config builder instance
 * @param ref optional references
 * @returns instance of framework modules
 */
export const initPortal = async <TModules extends Array<AnyModule>, TRef extends object>(
	configurator: PortalFrameworkConfigurator<TModules>,
	ref?: TRef
): Promise<Fusion<TModules>> => {
	const modules = await configurator.initialize<FusionPortalModules>(ref);
	const fusion = {
		modules,
	};
	window.FusionPortal = fusion as unknown as Fusion;
	modules.event.dispatchEvent('onFrameworkLoaded', { detail: fusion });

	return fusion as unknown as Fusion<TModules>;
};

export default initPortal;
