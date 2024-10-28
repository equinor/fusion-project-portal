import { HttpResponseError, IHttpClient } from '@equinor/fusion-framework-module-http';

import { Query } from '@equinor/fusion-query';
import { catchError, Observable } from 'rxjs';
import { queryValue } from '@equinor/fusion-query/operators';
import { PortalLoadError } from './errors/portal';

export interface IPortalAppsClient extends Disposable {
	getAppsConfigByContextId(args: { contextId: string }): Observable<string[]>;
	getAppsConfig(): Observable<string[]>;
}

export class PortalAppsClient implements IPortalAppsClient {
	#apps: Query<string[]>;

	#contextApps: Query<string[]>;

	constructor(httpClient: IHttpClient, private portalId: string) {
		const expire = 1 * 60 * 1000;

		this.#apps = new Query<string[]>({
			client: {
				fn: async () => {
					return await httpClient.json<string[]>(`/api/portals/${this.portalId}/appkeys`);
				},
			},
			key: () => `apps-${this.portalId}`,
			expire,
		});

		this.#contextApps = new Query<string[], { contextId: string }>({
			client: {
				fn: async (args) => {
					return await httpClient.json<string[]>(
						`/api/portals/${this.portalId}/contexts/${args.contextId}/appkeys`
					);
				},
			},
			key: (args) => `apps-${this.portalId}-${args.contextId}`,
			expire,
		});
	}

	getAppsConfig(): Observable<string[]> {
		return this.#apps.query(null).pipe(
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

	getAppsConfigByContextId(args: { contextId: string }): Observable<string[]> {
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
		console.warn('PortalAppsClient disposed');

		this.#apps.complete();
		this.#contextApps.complete();
	}
}
