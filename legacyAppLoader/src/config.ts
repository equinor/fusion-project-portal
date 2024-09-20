import type { AppModuleInitiator } from "@equinor/fusion-framework-react-app";
import { enableAppModule } from "@equinor/fusion-framework-module-app";

import { AppManifest } from "@equinor/fusion-framework-module-app";
import { AppConfigBuilderCallback } from "@equinor/fusion-framework-module-app/dist/types/AppConfigBuilder";
import { Fusion, FusionConfigurator } from "@equinor/fusion-framework-react";
import { NavigationModule } from "@equinor/fusion-framework-module-navigation";

const DEBUG_LOG = false;

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
        return portalClient.json$(`/api/fusion/apps`, {
          selector: async (res) =>
            (await res.json()).map(manifestMapper(client.baseUri)),
        });
      },
      getAppConfig: (query) => portal.json$(`/apps/${query.appKey}/config`),
    });
  };

export const configure: AppModuleInitiator<
  [NavigationModule],
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
  DEBUG_LOG && console.log("configuring application", env);

  /** callback when configurations is created */
  configurator.onConfigured((config) => {
    DEBUG_LOG && console.log("application config created", config);
  });

  /** callback when the application modules has initialized */
  configurator.onInitialized((instance) => {
    instance.navigation.navigator.subscribe((nav) => {
      if (nav.action !== "PUSH") return;

      if (
        nav.location.pathname
          .split("/")
          .filter(
            (path) => path === env.fusion.modules.context.currentContext?.id
          ).length > 1
      ) {
        instance.navigation.navigator.go(-1);
      }
    });

    DEBUG_LOG && console.log("application config initialized", instance);
  });
};

export default configure;
