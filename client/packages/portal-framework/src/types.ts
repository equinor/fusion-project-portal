import type { CombinedModules, ModulesInstance } from '@equinor/fusion-framework-module';
import type { AnyModule } from '@equinor/fusion-framework-module';

import { EventModule } from '@equinor/fusion-framework-module-event';
import { HttpModule } from '@equinor/fusion-framework-module-http';
import { MsalModule } from '@equinor/fusion-framework-module-msal';
import { ServiceDiscoveryModule } from '@equinor/fusion-framework-module-service-discovery';
import { ServicesModule } from '@equinor/fusion-framework-module-services';

/**
 * interface of the modules provided by Fusion Framework
 */
export type FusionPortalModules<TModules extends Array<AnyModule> | unknown = unknown> = CombinedModules<
	TModules,
	[EventModule, HttpModule, MsalModule, ServicesModule, ServiceDiscoveryModule]
>;

/**
 * Blueprint of instance of framework modules
 */
export type FusionModulesInstance<TModules extends Array<AnyModule> | unknown = unknown> = ModulesInstance<
	FusionPortalModules<TModules>
>;

export interface Fusion<TModules extends Array<AnyModule> | unknown = unknown> {
	/**
	 * Configured services for Fusion
	 */
	modules: FusionModulesInstance<TModules>;
}
