import { AuthClientOptions } from '@equinor/fusion-framework-module-msal';

export type LoggerLevel = 0 | 1 | 2 | 4 | 3;

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
  phases?: Phase[];
}

/**
 * The type for a phase, to be served from backend
 */
export interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
}

export interface Client {
  baseUri: string;
  defaultScopes: string[];
}
