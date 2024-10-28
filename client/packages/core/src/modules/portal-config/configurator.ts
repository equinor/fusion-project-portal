/* eslint-disable class-methods-use-this */
import { BaseConfigBuilder, ConfigBuilderCallbackArgs } from '@equinor/fusion-framework-module';
import { PortalConfiguration, PortalRouter, PortalState } from './types';
import { IPortalClient, PortalClient } from './portal-client';

export class PortalConfigConfigurator extends BaseConfigBuilder<PortalConfiguration> {
	public setConfig(config: { portalId: string; portalEnv: string }) {
		this._set('base', async () => config);
	}

	public setClient(client: IPortalClient) {
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
			config.client = new PortalClient(httpClient);
		}

		return config as PortalConfiguration;
	}
}
