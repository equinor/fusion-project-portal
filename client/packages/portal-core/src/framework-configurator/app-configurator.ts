import { AppManifest } from '@equinor/fusion-framework-module-app';
import { AppConfigBuilderCallback } from '@equinor/fusion-framework-module-app/dist/types/AppConfigBuilder';
import { Client } from '../types';

const manifestMapper =
	(basePath: string) =>
	(value: any): AppManifest => {
		const { key, name, version } = value;
		return { ...value, key, name, version, entry: `${basePath}/api/bundles/${key}` };
	};

export const appConfigurator =
	(client: Client): AppConfigBuilderCallback =>
	async (builder) => {
		const serviceDiscovery = await builder.requireInstance('serviceDiscovery');
		const portal = await serviceDiscovery.createClient('portal');
		builder.setAppClient({
			getAppManifest: (query) => {
				return portal.json$(`/api/apps/${query.appKey}`, {
					selector: async (res) => manifestMapper(client.baseUri)(await res.json()),
				});
			},
			getAppManifests: () =>
				portal.json$(`/api/apps`, {
					selector: async (res) => (await res.json()).map(manifestMapper(client.baseUri)),
				}),

			getAppConfig: (query) => portal.json$(`/api/apps/${query.appKey}/config`),
		});
	};
