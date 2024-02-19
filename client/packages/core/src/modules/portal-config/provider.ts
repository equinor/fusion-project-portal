import { GetPortalParameters, Portal, PortalConfiguration, PortalState } from './types';
import { Observable, Subscription, catchError, firstValueFrom } from 'rxjs';
import { Query } from '@equinor/fusion-query';
import { PortalLoadError } from './errors';
import { HttpResponseError } from '@equinor/fusion-framework-module-http';
import { FlowSubject } from '@equinor/fusion-observable';
import { Actions, actions } from './state/actions';
import { createState } from './state/create-state';

export interface IPortalConfigProvider {
	getPortalById$(portalId: string): Observable<Portal>;
	getPortalStateAsync(): Promise<PortalState>;
	initialize(): Promise<void>;
	state: PortalState;
	state$: Observable<PortalState>;
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

	get state(): PortalState {
		return this.#state.value;
	}

	get state$(): Observable<PortalState> {
		return this.#state.asObservable();
	}

	public getPortalStateAsync = async (): Promise<PortalState> => {
		return await firstValueFrom(this.#state.asObservable());
	};

	public getPortalById$ = (portalId: string): Observable<Portal> => {
		if (this.#config.portalConfig.portal) {
			return new Observable((sub) => sub.next(this.#config.portalConfig.portal));
		}
		return this._getPortal({ portalId });
	};

	public async initialize(): Promise<void> {
		this.#state.next(actions.fetchPortal(this.#config.base));
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
