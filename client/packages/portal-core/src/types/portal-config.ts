import { AuthClientOptions } from '@equinor/fusion-framework-module-msal';
import { View } from './view';
import { SourceSystem } from '@equinor/fusion-framework-module-services/bookmarks';

export type LoggerLevel = 0 | 1 | 2 | 4 | 3;

export interface PortalConfig {
	title: string;
	description: string;
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
	agGrid?: {
		licenseKey: string;
	};
	bookmarks: SourceSystem;
}

export interface Client {
	baseUri: string;
	defaultScopes: string[];
}
