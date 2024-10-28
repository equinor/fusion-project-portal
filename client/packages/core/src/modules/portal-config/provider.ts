import { BaseConfig, PortalConfig, PortalConfiguration, PortalRequest } from './types';
import { BehaviorSubject, Observable, Subscription, distinctUntilChanged, from } from 'rxjs';

import { IPortalClient } from './portal-client';
import { CurrentPortal, Portal } from './portal';

export interface IPortalConfigProvider {
	getPortalConfig(portalId: string): Observable<PortalConfig>;
	getApps(): Observable<string[]>;
	getAppsByContext(contextId: string): Observable<string[]>;
	current: CurrentPortal;
	current$: Observable<CurrentPortal>;
}

export class PortalConfigProvider implements IPortalConfigProvider {
	#subscription = new Subscription();

	#currentPortal$: BehaviorSubject<CurrentPortal>;

	#config: PortalConfiguration;

	#portalClient: IPortalClient;

	get current(): CurrentPortal {
		return this.#currentPortal$.value;
	}
	get current$(): Observable<CurrentPortal> {
		return this.#currentPortal$.pipe(
			distinctUntilChanged((prev, next) => {
				if (prev && next) {
					return prev.base.portalId === next.base.portalId;
				}
				return prev === next;
			})
		);
	}

	constructor(protected _config: PortalConfiguration) {
		this.#config = _config;
		this.#portalClient = _config.client;
		this.#currentPortal$ = new BehaviorSubject<CurrentPortal>(
			new Portal({
				provider: this,
				base: _config.base,
				initialPortalConfig: _config.portalConfig,
			})
		);
	}

	public setCurrentPortal(base?: BaseConfig): void {
		this.#currentPortal$.next(
			new Portal({
				provider: this,
				base: base ? base : this.#config.base,
				initialPortalConfig: this.#config.portalConfig,
			})
		);
	}

	public getPortalConfig(portalId: string): Observable<PortalRequest> {
		return from(this.#portalClient.getPortalConfig({ portalId }));
	}
	public getApps(): Observable<string[]> {
		return from(this.#portalClient.getAppsConfig({ portalId: this.#config.base.portalId }));
	}
	public getAppsByContext(contextId: string): Observable<string[]> {
		return this.#portalClient.getAppsConfigByContextId({ contextId, portalId: this.#config.base.portalId });
	}
}
