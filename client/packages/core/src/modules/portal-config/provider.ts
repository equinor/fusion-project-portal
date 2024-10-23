import {
	Extensions,
	GetAppsParameters,
	GetPortalParameters,
	Portal,
	PortalConfiguration,
	PortalRequest,
	PortalRouter,
	PortalState,
} from './types';
import { Observable, OperatorFunction, Subscription, catchError, filter, firstValueFrom, from, map, take } from 'rxjs';
import { Query } from '@equinor/fusion-query';
import { PortalLoadError } from './errors/portal';
import { HttpResponseError } from '@equinor/fusion-framework-module-http';
import { FlowSubject } from '@equinor/fusion-observable';
import { Actions, actions } from './state/actions';
import { createState } from './state/create-state';
import { AppsLoadError } from './errors/apps';

export interface IPortalConfigProvider {
	getPortalConfigById$(portalId: string): Observable<Portal>;
	getApps$(arg?: { contextId?: string }): Observable<string[]>;
	state: PortalState;
	state$: Observable<PortalState>;
	portal$: Observable<Portal>;
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
			filterEmpty(),
			take(1)
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
			filterEmpty(),
			take(1)
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
			return this._AppsByContext$({ portalId: this.#state.value.portal.id, contextId: args.contextId });
		}
		return this.apps$;
	};

	protected async initialize(): Promise<void> {
		this.#state.next(actions.fetchPortal(this.#config.base));
	}

	public getPortalConfigById$ = (portalId: string): Observable<PortalRequest> => {
		if (this.#state.value.req) {
			return new Observable((sub) => sub.next(this.#state.value.req));
		}
		return this._getPortal$({ portalId });
	};

	protected _getPortal$(params: GetPortalParameters): Observable<PortalRequest> {
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
