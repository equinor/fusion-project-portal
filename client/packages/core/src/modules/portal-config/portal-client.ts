import { HttpResponseError, IHttpClient } from '@equinor/fusion-framework-module-http';
import { GetAppsByContextParameters, GetAppsParameters, GetPortalParameters, PortalRequest } from './types';

import { Query } from '@equinor/fusion-query';
import { catchError, Observable } from 'rxjs';
import { queryValue } from '@equinor/fusion-query/operators';
import { PortalLoadError } from './errors/portal';

export interface IPortalClient extends Disposable {
	getPortalConfig(args: GetPortalParameters): Observable<PortalRequest>;
	getAppsConfigByContextId(args: GetAppsByContextParameters): Observable<string[]>;
	getAppsConfig(args: GetAppsParameters): Observable<string[]>;
}

export class PortalClient implements IPortalClient {
	#config: Query<PortalRequest, GetPortalParameters>;

	#apps: Query<string[], GetAppsParameters>;

	#contextApps: Query<string[], GetAppsByContextParameters>;

	constructor(httpClient: IHttpClient) {
		const expire = 1 * 60 * 1000;
		this.#config = new Query<PortalRequest, GetPortalParameters>({
			client: {
				fn: (args) => httpClient.json(`/api/portals/${args.portalId}`),
			},
			key: (args) => JSON.stringify(args),
			expire,
		});

		this.#apps = new Query<string[], GetAppsParameters>({
			client: {
				fn: async (args) => {
					return await httpClient.json<string[]>(`/api/portals/${args.portalId}/appkeys`);
				},
			},
			key: (args) => `apps-${args.portalId}`,
			expire,
		});

		this.#contextApps = new Query<string[], GetAppsByContextParameters>({
			client: {
				fn: async (args) => {
					return await httpClient.json<string[]>(
						`/api/portals/${args.portalId}/contexts/${args.contextId}/appkeys`
					);
				},
			},
			key: (args) => `apps-${args.portalId}-${args.contextId}`,
			expire,
		});
	}

	getPortalConfig(args: GetPortalParameters): Observable<PortalRequest> {
		return this.#config.query(args).pipe(
			queryValue,
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
		);
	}

	getAppsConfig(args: GetAppsParameters): Observable<string[]> {
		return this.#apps.query(args).pipe(
			queryValue,
			catchError((err) => {
				// Extract the cause since the error will be a `QueryError`
				const { cause } = err;

				// Handle specific errors and throw a `AppsLoadError` if applicable
				if (cause instanceof PortalLoadError) {
					throw cause;
				}
				if (cause instanceof HttpResponseError) {
					throw PortalLoadError.fromHttpResponse(cause.response, { cause });
				}
				// Throw a generic `AppsLoadError` for unknown errors
				throw new PortalLoadError('unknown', 'failed to load config', {
					cause,
				});
			})
		);
	}

	getAppsConfigByContextId(args: GetAppsByContextParameters): Observable<string[]> {
		return this.#contextApps.query(args).pipe(
			queryValue,
			catchError((err) => {
				// Extract the cause since the error will be a `QueryError`
				const { cause } = err;

				// Handle specific errors and throw a `AppsLoadError` if applicable
				if (cause instanceof PortalLoadError) {
					throw cause;
				}
				if (cause instanceof HttpResponseError) {
					throw PortalLoadError.fromHttpResponse(cause.response, { cause });
				}
				// Throw a generic `AppsLoadError` for unknown errors
				throw new PortalLoadError('unknown', 'failed to load config', {
					cause,
				});
			})
		);
	}

	[Symbol.dispose]() {
		console.warn('PortalClient disposed');
		this.#config.complete();
		this.#apps.complete();
		this.#contextApps.complete();
	}
}
