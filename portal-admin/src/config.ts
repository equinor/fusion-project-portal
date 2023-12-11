import type { AppModuleInitiator } from "@equinor/fusion-framework-app";
import {
  NavigationModule,
  enableNavigation,
} from "@equinor/fusion-framework-module-navigation";
import { Fusion } from "@equinor/fusion-framework-react";

interface Client {
  baseUri: string;
  defaultScopes: string[];
}

export const configure: AppModuleInitiator = (configurator, { env }) => {
  const { basename, config } = env;
  enableNavigation(configurator, basename);

  const environment = config?.environment as { client: Client };

  configurator.configureHttpClient("portal-client", environment.client);
};

export default configure;
