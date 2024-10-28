import { BehaviorSubject, Observable, firstValueFrom, from } from 'rxjs';
import { IPortalAppsClient } from './portal-apps-client';
import { PortalAppsConfiguration } from './configurator';
import { aR } from 'vitest/dist/reporters-yx5ZTtEV';

export interface IPortalAppsProvider {
	getApps(args: { contextId?: string }): Promise<void>;
	apps$: Observable<string[] | undefined>;
}

export class PortalAppsProvider implements IPortalAppsProvider {
	#portalClient: IPortalAppsClient;

	#apps$ = new BehaviorSubject<string[] | undefined>(undefined);

	get apps$(): Observable<string[] | undefined> {
		return this.#apps$;
	}

	constructor(protected args: PortalAppsConfiguration) {
		this.#portalClient = args.client;
	}

	public async getApps(args: { contextId?: string }) {
		if (this.args.portalConfig.isContextPortal && args.contextId) {
			this.#apps$.next(
				await firstValueFrom(this.#portalClient.getAppsConfigByContextId({ contextId: args.contextId }))
			);
		} else {
			this.#apps$.next(await firstValueFrom(this.#portalClient.getAppsConfig()));
		}
	}
}
