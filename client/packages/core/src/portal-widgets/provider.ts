import { PortalWidgetConfig } from './configurator';
import { BehaviorSubject } from 'rxjs';
import { PortalWidget } from './types';

export interface IPortalWidgetProvider {
	widgets$: BehaviorSubject<PortalWidget[]>;
	activeWidget$: BehaviorSubject<PortalWidget | undefined>;
	preciousWidget: PortalWidget | undefined;
	setActivePortalWidgetById(widgetId?: string | null): void;
	closeActivePortalWidget: VoidFunction;
	registerPortalWidgets(actions: PortalWidget[]): void;
	registerPortalWidget(widget: PortalWidget): void;
}

export class PortalWidgetProvider implements IPortalWidgetProvider {
	widgets$: BehaviorSubject<PortalWidget[]>;

	activeWidget$: BehaviorSubject<PortalWidget | undefined>;

	preciousWidget: PortalWidget | undefined;

	constructor(protected _config: PortalWidgetConfig) {
		this.widgets$ = new BehaviorSubject<PortalWidget[]>(_config.widgets || []);
		this.activeWidget$ = new BehaviorSubject<PortalWidget | undefined>(undefined);
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

	registerPortalWidgets = (actions: PortalWidget[]) => {
		this.widgets$.next(actions);
	};

	registerPortalWidget = (widget: PortalWidget) => {
		if (Boolean(this.widgets$.value.find((_widget) => _widget.id === widget.id))) {
			throw Error('Widget is already registered.');
		}
		const widgets = [...this.widgets$.value, widget];
		this.registerPortalWidgets(widgets);
	};
}
