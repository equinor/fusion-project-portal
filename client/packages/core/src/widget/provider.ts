import { PortalServicesConfig } from './configurator';
import { BehaviorSubject } from 'rxjs';
import { PortalService } from './types';

export interface IPortalServicesProvider {
	widgets$: BehaviorSubject<PortalService[]>;
	activeWidget$: BehaviorSubject<PortalService | undefined>;
	preciousWidget: PortalService | undefined;
	setActivePortalWidgetById(widgetId?: string | null): void;
	closeActivePortalWidget: VoidFunction;
	registerPortalWidgets(actions: PortalService[]): void;
	registerPortalWidget(widget: PortalService): void;
}

export class PortalWidgetProvider implements IPortalServicesProvider {
	client;

	activeWidget$: BehaviorSubject<PortalService | undefined>;

	preciousWidget: PortalService | undefined;

	constructor(protected _config: PortalServicesConfig) {
		this.widgets$ = new BehaviorSubject<PortalService[]>(_config.widgets || []);
		this.activeWidget$ = new BehaviorSubject<PortalService | undefined>(undefined);
	}

	setActivePortalWidgetById = (widgetId?: string | null): void => {
		const widget = this.widgets$.value.find((widget: { id: string }) => widget.id === widgetId);

		if (widget) {
			this.preciousWidget = this.activeWidget$.value;
			this.activeWidget$.next(widget);
		} else {
			console.warn(`trying to open widget not known to system with widgetId: ${widgetId}`);
		}

		const url = new URL(location.href);
		if (widgetId && url.searchParams.get('portalServiceId') !== widgetId) {
			url.searchParams.set('portalServiceId', widgetId);
			history.replaceState(null, '', url);
		}
	};

	closeActivePortalWidget = () => {
		const url = new URL(location.href);
		url.searchParams.delete('portalServiceId');
		history.replaceState(null, '', url);
		this.activeWidget$.next(undefined);
	};

	registerPortalWidgets = (actions: PortalService[]) => {
		this.widgets$.next(actions);
	};

	registerPortalWidget = (widget: PortalService) => {
		if (Boolean(this.widgets$.value.find((_widget) => _widget.id === widget.id))) {
			throw Error('Widget is already registered.');
		}
		const widgets = [...this.widgets$.value, widget];
		this.registerPortalWidgets(widgets);
	};
}
