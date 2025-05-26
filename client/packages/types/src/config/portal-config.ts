

export type LoggerLevel = 0 | 1 | 2 | 4 | 3;

export interface PortalConfig {
	title: string;
	description: string;
	portalId: string;
	serviceDiscovery: {
		client: Client;
	};
	portalClient: {
		client: Client;
	};
	msal: {
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
	applicationInsights?: {
		connectionString: string;
	};
	agGrid?: {
		licenseKey: string;
	};
	bookmarks: SourceSystem;
	fusionLegacyEnvIdentifier: string;
}

export interface Client {
	baseUri: string;
	defaultScopes: string[];
}


type AuthClientOptions = {
 	tenantId: string;
    clientId: string;
    redirectUri: string;
}
type SourceSystem = {
	name: string;
  	identifier: string;
  	subSystem: string;
}