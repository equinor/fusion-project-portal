import { BehaviorSubject, Observable, firstValueFrom, from } from 'rxjs';
import { IPortalAppsClient } from './portal-apps-client';
import { PortalAppsConfiguration } from './configurator';
import { aR } from 'vitest/dist/reporters-yx5ZTtEV';

export interface IPortalAppsProvider {
	getAppKeys(args?: { contextId?: string }): Promise<void>;
	appKeys$: Observable<string[] | undefined>;
	isContextPortal: boolean;
}

export class PortalAppsProvider implements IPortalAppsProvider {
	#portalClient: IPortalAppsClient;

	#appKeys$ = new BehaviorSubject<string[] | undefined>(undefined);

	public isContextPortal: boolean;

	get appKeys$(): Observable<string[] | undefined> {
		return this.#appKeys$;
	}

	constructor(protected args: PortalAppsConfiguration) {
		this.#portalClient = args.client;
		this.isContextPortal = args.portalConfig.isContextPortal;
	}

	public async getAppKeys(args?: { contextId?: string }) {
		if (this.args.portalConfig.isContextPortal && args?.contextId) {
			this.#appKeys$.next(
				await firstValueFrom(this.#portalClient.getAppKeysByContextId({ contextId: args.contextId }))
			);
		} else {
			this.#appKeys$.next(await firstValueFrom(this.#portalClient.getAppKeys()));
		}
	}
}
