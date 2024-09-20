/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppManifest } from '@equinor/fusion-framework-module-app';
import { AppConfigBuilderCallback } from '@equinor/fusion-framework-module-app/dist/types/AppConfigBuilder';
import { Client } from '@portal/types';

const manifestMapper =
	(basePath: string) =>
	 
	(value: any): AppManifest => {
		const { appKey, appInformation, isLegacy } = value;
		return { ...appInformation, entry: `${basePath}/api/bundles/${appKey}`, isLegacy };
	};

const manifestMappers =
	(basePath: string) =>
	(value: any): AppManifest => {
		const { key, name, version } = value;
		return { ...value, key, name, version, entry: `${basePath}/api/bundles/${key}` };
	};

export const appConfigurator =
	(client: Client): AppConfigBuilderCallback =>
	async (builder) => {
		const serviceDiscovery = await builder.requireInstance('serviceDiscovery');
		const http = await builder.requireInstance('http');
		const portal = await serviceDiscovery.createClient('portal');
		const portalClient = await http.createClient('portal-client');
		builder.setAppClient({
			getAppManifest: (query) => {
				return portalClient.json$(`/api/onboarded-apps/${query.appKey}`, {
					selector: async (res) => manifestMapper(client.baseUri)(await res.json()),
				});
			},
			getAppManifests: () =>
				portalClient.json$(`/api/fusion/apps`, {
					selector: async (res) => (await res.json()).map(manifestMappers(client.baseUri)),
				}),

			getAppConfig: (query) => portal.json$(`/api/apps/${query.appKey}/config`),
		});
	};
