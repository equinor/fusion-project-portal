import type { AnyModule, ModuleInitializerArgs } from '@equinor/fusion-framework-module';

import type { IPortalServicesConfigurator, PortalServicesConfig, PortalServicesConfigurator } from './configurator';
import { PortalService } from './types';

export type PortalServicesConfigBuilderCallback = <TDeps extends Array<AnyModule> = []>(
	builder: PortalServicesConfigBuilder<TDeps, ModuleInitializerArgs<IPortalServicesConfigurator, TDeps>>
) => void | Promise<void>;

export class PortalServicesConfigBuilder<
	TModules extends Array<AnyModule> = [],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TInit extends ModuleInitializerArgs<any, any> = ModuleInitializerArgs<PortalServicesConfigurator, TModules>
> {
	#init: TInit;

	constructor(init: TInit, public config: Partial<PortalServicesConfig> = {}) {
		this.#init = init;
	}

	registerPortalWidgets(widgets: PortalService[]) {
		widgets.forEach((widget) => this.registerPortalWidget(widget));
	}

	registerPortalWidget(widget: PortalService) {
		if (Boolean(this.config.widgets?.find((_widget) => _widget.id === widget.id))) {
			throw Error('Widget is already registered.');
		}
		const currentWidgets = this.config.widgets || [];
		this.config.widgets = [...currentWidgets, widget];
	}
}
