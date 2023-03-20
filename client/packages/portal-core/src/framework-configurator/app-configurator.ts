import { AppManifest } from "@equinor/fusion-framework-module-app";
import { AppConfigBuilderCallback } from "@equinor/fusion-framework-module-app/dist/types/AppConfigBuilder";

const manifestMapper = (value: any): AppManifest => {
    const { key, name, version } = value;
    return { key, name, version, entry: `https://app-pep-backend-noe-dev.azurewebsites.net/api/bundles/${key}` };
}

export const appConfigurator: AppConfigBuilderCallback = async (builder) => {
    const serviceDiscovery = await builder.requireInstance("serviceDiscovery");
    const portal = await serviceDiscovery.createClient("portal");
    builder.setAppClient({
        getAppManifest: (query) => {
            return portal.json$(
                `/api/apps/${query.appKey}`,
                { selector: async (res) => manifestMapper(await res.json()) }
            )
        },
        getAppManifests: () => portal.json$(
            `/api/apps`,
            { selector: async (res) => (await res.json()).map(manifestMapper) }
        ),

        getAppConfig: (query) => portal.json$(
            `/api/apps/${query.appKey}/config`,
        ),
    });
}
