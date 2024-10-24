/* eslint-disable class-methods-use-this */
import { BaseConfigBuilder, ConfigBuilderCallbackArgs } from '@equinor/fusion-framework-module';
import { AppManifestResponse, IClient, PortalConfiguration, PortalRouter, PortalState } from './types';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const createDefaultClient = (httpClient: IHttpClient): IClient => {
	return {
		getPortal: {
			client: {
				fn: (args) => httpClient.json(`/api/portals/${args.portalId}`),
			},
			key: (args) => JSON.stringify(args),
		},
		getPortalApps: {
			client: {
				fn: async (args) => {
					if (!args.contextId) return [];
					const apps = await httpClient.json<AppManifestResponse[]>(
						`/api/portals/${args.portalId}/contexts/${args.contextId}/apps`
					);
					// Mapping AppMAnifestREsponse to AppManifest, this is done so our solution
					// is working with at application manifest similar to fusion classic.
					return apps.map((app) =>
						typeof app === 'string' ? app : app.appManifest.key || app.appManifest.appKey
					);
				},
			},
			key: (args) => JSON.stringify(args),
		},
	};
};

export class PortalConfigConfigurator extends BaseConfigBuilder<PortalConfiguration> {
	public setConfig(config: { portalId: string; portalEnv: string }) {
		this._set('base', async () => config);
	}

	public setClient(client: IClient) {
		this._set('client', async () => client);
	}

	public setRoutes(client: PortalRouter) {
		this._set('portalConfig.routes', async () => client);
	}

	public setPortalConfig(config: PortalState) {
		this._set('portalConfig', async () => config);
	}

	/**
	 * Create an HTTP client based on the provided parameters.
	 * @param clientId - Identifier for the client.
	 * @param init - Configuration builder callback arguments.
	 * @returns An instance of the HTTP client.
	 */
	private async _createHttpClient(clientId: string, init: ConfigBuilderCallbackArgs) {
		const http = await init.requireInstance('http');

		if (http.hasClient(clientId)) {
			return http.createClient(clientId);
		} else {
			/** load service discovery module */
			const serviceDiscovery = await init.requireInstance('serviceDiscovery');
			return await serviceDiscovery.createClient(clientId);
		}
	}

	protected override async _processConfig(config: Partial<PortalConfiguration>, _init: ConfigBuilderCallbackArgs) {
		const httpClient = await this._createHttpClient('portal-client', _init);

		if (!config.base) {
			config.base = {
				portalEnv: 'CI',
				portalId: 'CLI',
			};
		}

		if (!config.client) {
			config.client = createDefaultClient(httpClient);
		}

		return config as PortalConfiguration;
	}
}
