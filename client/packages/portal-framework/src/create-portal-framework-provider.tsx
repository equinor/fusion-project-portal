import React, { lazy } from 'react';

import { PortalFrameworkConfigurator } from './PortalFrameworkConfigurator';
import { PortalFrameworkProvider } from './context';
import type { AnyModule } from '@equinor/fusion-framework-module';
import { ModuleProvider } from '@equinor/fusion-framework-react-module';
import initPortal from './init';

/**
 * Create a framework provider for react.
 *
 * This function is for providers of framework, like a portal.
 *
 * @param configurator - callback for configuring modules
 * @example
 * ```tsx
 * const config: FusionConfigurator = (config) => {}
 * const Portal = () => {
 *   const Framework = createFrameworkProvider(config);
 *   return (
 *      <Suspense fallback={<span>loading...</span>}>
 *          <Framework>{children}</Framework>
 *      </Suspense>
 *   );
 * };
 * ```
 */
export const createPortalFrameworkProvider = <TModules extends Array<AnyModule> = []>(
	cb: (configurator: PortalFrameworkConfigurator<TModules>) => void | Promise<void>
): React.LazyExoticComponent<React.FunctionComponent<React.PropsWithChildren<unknown>>> =>
	lazy(async () => {
		const configurator = new PortalFrameworkConfigurator<TModules>();
		await cb(configurator);
		const framework = await initPortal(configurator);

		return {
			default: ({ children }: { children?: React.ReactNode }) => (
				<PortalFrameworkProvider value={framework}>
					<ModuleProvider value={framework.modules}>{children}</ModuleProvider>
				</PortalFrameworkProvider>
			),
		};
	});
