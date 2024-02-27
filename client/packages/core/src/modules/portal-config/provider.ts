import { GetPortalParameters, Portal, PortalConfiguration, PortalRoutes, PortalState } from './types';
import { Observable, OperatorFunction, Subscription, catchError, filter, firstValueFrom, map } from 'rxjs';
import { Query } from '@equinor/fusion-query';
import { PortalLoadError } from './errors';
import { HttpResponseError } from '@equinor/fusion-framework-module-http';
import { FlowSubject } from '@equinor/fusion-observable';
import { Actions, actions } from './state/actions';
import { createState } from './state/create-state';

export interface IPortalConfigProvider {
	getPortalById$(portalId: string): Observable<Portal>;
	getPortalStateAsync(): Promise<PortalState>;
	getPortalAsync(): Promise<Portal>;
	getRoutesAsync(): Promise<PortalRoutes>;
	initialize(): Promise<void>;
	state: PortalState;
	state$: Observable<PortalState>;
}

export function filterEmpty<T>(): OperatorFunction<T | null | undefined, T> {
	return filter((value): value is T => value !== undefined && value !== null);
}

export class PortalConfigProvider {
	// Private fields
	#subscription = new Subscription();

	#config: PortalConfiguration;

	#state: FlowSubject<PortalState, Actions>;

	constructor(protected _config: PortalConfiguration) {
		this.#config = _config;
		this.#state = createState({ ..._config.portalConfig }, this);
		this.initialize();
	}

	get routes$(): Observable<PortalRoutes> {
		return this.#state.pipe(
			map(({ routes }) => routes),
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

	public getPortalStateAsync = async (): Promise<PortalState> => {
		return await firstValueFrom(this.state$);
	};

	public getPortalAsync = async (): Promise<Portal> => {
		return await firstValueFrom(this.portal$);
	};

	public getRoutesAsync = async (): Promise<PortalRoutes> => {
		return await firstValueFrom(this.routes$);
	};

	public getPortalById$ = (portalId: string): Observable<Portal> => {
		if (this.#state.value.portal) {
			return new Observable((sub) => sub.next(this.#state.value.portal));
		}
		return this._getPortal({ portalId });
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public getPortalRoutesById$ = (_portalId?: string): Observable<PortalRoutes> => {
		return new Observable((sub) => sub.next(this.#config.portalConfig.routes));
	};

	public async initialize(): Promise<void> {
		this.#state.next(actions.fetchPortal(this.#config.base));
	}

	protected _getPortal(params: GetPortalParameters): Observable<Portal> {
		// Create a new query using the configured client
		const client = new Query(this.#config.client.getPortal);
		this.#subscription.add(() => client.complete());

		// Execute the query and handle errors
		return Query.extractQueryValue(
			client.query(params).pipe(
				catchError((err) => {
					// Extract the cause since the error will be a `QueryError`
					const { cause } = err;

					// Handle specific errors and throw a `GetWidgetConfigError` if applicable
					if (cause instanceof PortalLoadError) {
						throw cause;
					}
					if (cause instanceof HttpResponseError) {
						throw PortalLoadError.fromHttpResponse(cause.response, { cause });
					}
					// Throw a generic `GetWidgetManifestError` for unknown errors
					throw new PortalLoadError('unknown', 'failed to load config', {
						cause,
					});
				})
			)
		);
	}
}
