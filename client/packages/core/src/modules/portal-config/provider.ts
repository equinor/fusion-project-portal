import {
	AppManifest,
	Extensions,
	GetAppsParameters,
	GetPortalParameters,
	Portal,
	PortalConfiguration,
	PortalRouter,
	PortalState,
} from './types';
import { Observable, OperatorFunction, Subscription, catchError, filter, firstValueFrom, map } from 'rxjs';
import { Query } from '@equinor/fusion-query';
import { PortalLoadError } from './errors/portal';
import { HttpResponseError } from '@equinor/fusion-framework-module-http';
import { FlowSubject } from '@equinor/fusion-observable';
import { Actions, actions } from './state/actions';
import { createState } from './state/create-state';
import { AppsLoadError } from './errors/apps';

export interface IPortalConfigProvider {
	getPortalById$(portalId: string): Observable<Portal>;
	getPortalStateAsync(): Promise<PortalState>;
	getPortalAsync(): Promise<Portal>;
	getRoutesAsync(): Promise<PortalRouter>;
	getAppsAsync(arg?: { contextId?: string }): Promise<string[]>;
	getApps$(arg?: { contextId?: string }): Observable<string[]>;
	initialize(): Promise<void>;
	state: PortalState;
	state$: Observable<PortalState>;
	routes$: Observable<PortalRouter>;
	apps$: Observable<string[]>;
	complete(): void;
}

export function filterEmpty<T>(): OperatorFunction<T | null | undefined, T> {
	return filter((value): value is T => value !== undefined && value !== null);
}

export class PortalConfigProvider implements IPortalConfigProvider {
	// Private fields
	#subscription = new Subscription();

	#config: PortalConfiguration;

	#state: FlowSubject<PortalState, Actions>;

	constructor(protected _config: PortalConfiguration) {
		this.#config = _config;
		this.#state = createState({ ..._config.portalConfig }, this);
		this.initialize();
	}

	get routes$(): Observable<PortalRouter> {
		return this.#state.pipe(
			map(({ routes }) => routes),
			filterEmpty()
		);
	}

	get apps$(): Observable<string[]> {
		return this.#state.pipe(
			map(({ apps }) => apps),
			filterEmpty()
		);
	}

	get extensions$(): Observable<Extensions> {
		return this.#state.pipe(
			map(({ extensions }) => extensions),
			filterEmpty()
		);
	}

	get portal$(): Observable<Portal> {
		return this.#state.pipe(
			map(({ portal }) => portal),
			filterEmpty()
		);
	}

	get state(): PortalState {
		return this.#state.value;
	}

	get state$(): Observable<PortalState> {
		return this.#state.pipe(
			map((state) => state),
			filterEmpty()
		);
	}

	public getApps$ = (args?: { contextId?: string }): Observable<string[]> => {
		if (args?.contextId) {
			return this.getAppsByContextId$(this.#state.value.portal.id, args.contextId);
		}
		return this.apps$;
	};

	public getPortalStateAsync = async (): Promise<PortalState> => {
		return await firstValueFrom(this.state$);
	};

	public getPortalAsync = async (): Promise<Portal> => {
		return await firstValueFrom(this.portal$);
	};

	public getRoutesAsync = async (): Promise<PortalRouter> => {
		return await firstValueFrom(this.routes$);
	};

	public getExtensionsAsync = async (): Promise<PortalRouter> => {
		return await firstValueFrom(this.routes$);
	};

	public getAppsAsync = async (args?: { contextId?: string }): Promise<string[]> => {
		if (args?.contextId) {
			return await firstValueFrom(this.getAppsByContextId$(this.#state.value.portal.id, args.contextId));
		}
		return await firstValueFrom(this.apps$);
	};

	public getPortalById$ = (portalId: string): Observable<Portal> => {
		if (this.#state.value.portal) {
			return new Observable((sub) => sub.next(this.#state.value.portal));
		}
		return this._getPortal$({ portalId });
	};

	public getAppsByContextId$ = (portalId: string, contextId: string): Observable<string[]> => {
		return this._AppsByContext$({ portalId, contextId });
	};

	public getPortalRoutesById$ = (_portalId?: string): Observable<PortalRouter> => {
		return new Observable((sub) => sub.next(this.#config.portalConfig.routes));
	};

	public async initialize(): Promise<void> {
		this.#state.next(actions.fetchPortal(this.#config.base));
	}

	protected _getPortal$(params: GetPortalParameters): Observable<Portal> {
		// Create a new query using the configured client
		const client = new Query(this.#config.client.getPortal);
		this.#subscription.add(() => client.complete());

		// Execute the query and handle errors
		return Query.extractQueryValue(
			client.query(params).pipe(
				catchError((err) => {
					// Extract the cause since the error will be a `QueryError`
					const { cause } = err;

					// Handle specific errors and throw a `PortalLoadError` if applicable
					if (cause instanceof PortalLoadError) {
						throw cause;
					}
					if (cause instanceof HttpResponseError) {
						throw PortalLoadError.fromHttpResponse(cause.response, { cause });
					}
					// Throw a generic `PortalLoadError` for unknown errors
					throw new PortalLoadError('unknown', 'failed to load config', {
						cause,
					});
				})
			)
		);
	}

	protected _AppsByContext$(params: GetAppsParameters): Observable<string[]> {
		// Create a new query using the configured client
		const client = new Query(this.#config.client.getPortalApps);
		this.#subscription.add(() => client.complete());

		// Execute the query and handle errors
		return Query.extractQueryValue(
			client.query(params).pipe(
				catchError((err) => {
					// Extract the cause since the error will be a `QueryError`
					const { cause } = err;

					// Handle specific errors and throw a `AppsLoadError` if applicable
					if (cause instanceof AppsLoadError) {
						throw cause;
					}
					if (cause instanceof HttpResponseError) {
						throw AppsLoadError.fromHttpResponse(cause.response, { cause });
					}
					// Throw a generic `AppsLoadError` for unknown errors
					throw new AppsLoadError('unknown', 'failed to load config', {
						cause,
					});
				})
			)
		);
	}
	[Symbol.dispose]() {
		this.complete();
	}

	public complete() {
		this.#subscription.unsubscribe();
		this.#state.complete();
	}
}
