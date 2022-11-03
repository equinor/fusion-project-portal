import { AuthClientOptions } from '@equinor/fusion-framework-module-msal';
import { WorkSurface } from '../work-surface-module';

export type LoggerLevel = 0 | 1 | 2 | 4 | 3;

export interface PortalConfig {
  serviceDiscovery: {
    client: Client;
  };
  portalClient: {
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
  phases?: WorkSurface[];
}

export interface Client {
  baseUri: string;
  defaultScopes: string[];
}
