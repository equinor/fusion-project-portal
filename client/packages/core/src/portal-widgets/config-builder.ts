import type { AnyModule, ModuleInitializerArgs } from '@equinor/fusion-framework-module';

import type { IPortalWidgetConfigurator, PortalWidgetConfig, PortalWidgetConfigurator } from './configurator';
import { PortalWidget } from './types';

export type ContextConfigBuilderCallback = <TDeps extends Array<AnyModule> = []>(
	builder: PortalWidgetConfigBuilder<TDeps, ModuleInitializerArgs<IPortalWidgetConfigurator, TDeps>>
) => void | Promise<void>;

export class PortalWidgetConfigBuilder<
	TModules extends Array<AnyModule> = [],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TInit extends ModuleInitializerArgs<any, any> = ModuleInitializerArgs<PortalWidgetConfigurator, TModules>
> {
	#init: TInit;

	constructor(init: TInit, public config: Partial<PortalWidgetConfig> = {}) {
		this.#init = init;
	}

	registerPortalWidgets(widgets: PortalWidget[]) {
		widgets.forEach((widget) => this.registerPortalWidget(widget));
	}

	registerPortalWidget(widget: PortalWidget) {
		if (Boolean(this.config.widgets?.find((_widget) => _widget.id === widget.id))) {
			throw Error('Widget is already registered.');
		}
		const currentWidgets = this.config.widgets || [];
		this.config.widgets = [...currentWidgets, widget];
	}
}
