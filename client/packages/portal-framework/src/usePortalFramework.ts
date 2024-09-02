import type { Fusion } from '@equinor/fusion-framework';
import type { AnyModule } from '@equinor/fusion-framework-module';

import { useContext } from 'react';
import { context } from './context';
/**
 * @example
 * ```ts
 * const useSometing = () => {
 *  const fusion = useFramework();
 *  return fusion.something;
 * }
 * ```
 */
export const usePortalFramework = <TModules extends Array<AnyModule> = []>(): Fusion<TModules> => {
	let framework = useContext(context);
	if (!framework) {
		console.warn('could not locate fusion in context!');
	}
	framework ??= window.FusionPortal;
	if (!framework) {
		console.error('Could not load framework, might not be initiated?');
	}
	return framework;
};

export default usePortalFramework;
