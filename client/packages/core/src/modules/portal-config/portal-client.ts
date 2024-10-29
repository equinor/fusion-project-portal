import { HttpResponseError, IHttpClient } from '@equinor/fusion-framework-module-http';
import { GetAppKeysByContextParameters, GetAppKeysParameters, GetPortalParameters, PortalRequest } from './types';

import { Query } from '@equinor/fusion-query';
import { catchError, Observable } from 'rxjs';
import { queryValue } from '@equinor/fusion-query/operators';
import { PortalLoadError } from './errors/portal';

export interface IPortalClient extends Disposable {
	getPortalConfig(args: GetPortalParameters): Observable<PortalRequest>;
	getAppKeysByContextId(args: GetAppKeysByContextParameters): Observable<string[]>;
	getAppKeys(args: GetAppKeysParameters): Observable<string[]>;
}

export class PortalClient implements IPortalClient {
	#configQuery: Query<PortalRequest, GetPortalParameters>;

	#appKeysQuery: Query<string[], GetAppKeysParameters>;

	#contextAppKeysQuery: Query<string[], GetAppKeysByContextParameters>;

	constructor(httpClient: IHttpClient) {
		const expire = 1 * 60 * 1000;
		this.#configQuery = new Query<PortalRequest, GetPortalParameters>({
			client: {
				fn: (args) => httpClient.json(`/api/portals/${args.portalId}`),
			},
			key: (args) => JSON.stringify(args),
			expire,
		});

		this.#appKeysQuery = new Query<string[], GetAppKeysParameters>({
			client: {
				fn: async (args) => {
					return await httpClient.json<string[]>(`/api/portals/${args.portalId}/appkeys`);
				},
			},
			key: (args) => `apps-${args.portalId}`,
			expire,
		});

		this.#contextAppKeysQuery = new Query<string[], GetAppKeysByContextParameters>({
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
		return this.#configQuery.query(args).pipe(
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

	getAppKeys(args: GetAppKeysParameters): Observable<string[]> {
		return this.#appKeysQuery.query(args).pipe(
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

	getAppKeysByContextId(args: GetAppKeysByContextParameters): Observable<string[]> {
		return this.#contextAppKeysQuery.query(args).pipe(
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
		this.#configQuery.complete();
		this.#appKeysQuery.complete();
		this.#contextAppKeysQuery.complete();
	}
}
