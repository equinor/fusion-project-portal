import { AuthClientOptions } from '@equinor/fusion-framework-module-msal';

export interface PortalConfig {
  serviceDiscovery: {
    client: Client;
  };
  masal: {
    client: AuthClientOptions;
    options: {
      requiresAuth: boolean;
      clients?: Record<string, AuthClientOptions>;
    };
  };
  logger?: {
    level: number;
    defaultClientLogger?: {
      active: boolean;
      level: number;
    };
  };
  applications?: {
    client: Client;
  };
  appConfig?: {
    client: Client;
  };
  agGrid?: {
    licenseKey: string;
  };
}

interface Client {
  baseUri: string;
  defaultScopes: string[];
}
