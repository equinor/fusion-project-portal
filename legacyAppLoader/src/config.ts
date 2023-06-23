import type { AppModuleInitiator } from "@equinor/fusion-framework-react-app";
import { enableAppModule } from "@equinor/fusion-framework-module-app";

import { AppManifest } from "@equinor/fusion-framework-module-app";
import { AppConfigBuilderCallback } from "@equinor/fusion-framework-module-app/dist/types/AppConfigBuilder";
import { Fusion, FusionConfigurator } from "@equinor/fusion-framework-react";

interface Client {
  baseUri: string;
  defaultScopes: string[];
}

const manifestMapper =
  (basePath: string) =>
  (value: any): AppManifest => {
    const { key, name, version } = value;
    return {
      ...value,
      key,
      name,
      version,
      entry: `${basePath}/api/bundles/${key}`,
    };
  };

export function addPortalClient(config: FusionConfigurator, client: Client) {
  config.configureHttpClient("portal-client", client);
}

const appConfigurator =
  (client: Client): AppConfigBuilderCallback =>
  async (builder) => {
    const http = await builder.requireInstance("http");

    const portalClient = http.createClient("portal-client");
    const portal = http.createClient("portal");
    builder.setAppClient({
      getAppManifest: (query) => {
        return portalClient.json$(`/api/apps/${query.appKey}`, {
          selector: async (res) =>
            manifestMapper(client.baseUri)(await res.json()),
        });
      },
      getAppManifests: () => {
        return portalClient.json$(`/api/portal/fusion/apps`, {
          selector: async (res) =>
            (await res.json()).map(manifestMapper(client.baseUri)),
        });
      },
      getAppConfig: (query) => portal.json$(`/apps/${query.appKey}/config`),
    });
  };

export const configure: AppModuleInitiator<
  [],
  Fusion<unknown>,
  { config: { environment: { client: Client; portal: Client } } }
> = (configurator, env) => {
  configurator.configureHttpClient(
    "portal-client",
    env.env.config?.environment.client
  );
  configurator.configureHttpClient(
    "portal",
    env.env.config?.environment.portal
  );
  window["clientBaseUri"] = env.env.config?.environment.client.baseUri;
  enableAppModule(
    configurator,
    appConfigurator(env.env.config?.environment.client)
  );
  /** print render environment arguments */
  console.log("configuring application", env);

  /** callback when configurations is created */
  configurator.onConfigured((config) => {
    console.log("application config created", config);
  });

  /** callback when the application modules has initialized */
  configurator.onInitialized((instance) => {
    console.log("application config initialized", instance);
  });
};

export default configure;
