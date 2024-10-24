import { AppManifest as FusionAppManifest } from '@equinor/fusion-framework-module-app';
import { QueryCtorOptions } from '@equinor/fusion-query';

/**
 *  The portal state.
 *
 */
export type Portal = {
	id: string;
	icon?: string;
	name: string;
	shortName?: string;
	subtext?: string;
	contexts?: ContextType[];
};

/**
 *  The portal state.
 *
 */
export type PortalRequest = {
	id: string;
	icon?: string;
	name: string;
	shortName?: string;
	subtext?: string;
	contexts?: ContextType[];
	apps?: string[];
	configuration: {
		environment: string | null;
		extension: string | null;
		router: string | null;
	};
};

export type PortalRouter = {
	root: Omit<PortalRoute, 'path'>;
	routes: PortalRouteWithChildren[];
};

export type PortalRoute = {
	path: string;
	pageKey: string;
	messages?: {
		loadingMessage?: string;
		errorMessage?: string;
	};
};

export type PortalRouteWithChildren = PortalRoute & {
	children: PortalRoute[];
};

export type AppCategory = {
	id?: string;
	displayName: string | null;
	color: string | null;
	defaultIcon: string | null;
	apps: AppManifest[];
};

export type AppManifestResponse = {
	key: string;
	contextTypes: ContextType[];
	appManifest: AppManifest;
};

export type AppManifest = FusionAppManifest & {
	isDisabled?: boolean;
	url?: string;
};

export interface AppGroup {
	name: string;
	accentColor: string;
	order: number;
	apps: AppManifest[];
}

export type ContextType = { type: string };

export type Extensions = {
	extensions?: PortalExtension[];
	actions?: PortalActions[];
	menu?: PortalMenu;
	quickMenu?: PortalMenu;
};

export type PortalExtension = {
	name: string;
	description: string;
	key: string;
	placement: 'top-bar' | 'none';
};

export type PortalActions = {
	name: string;
	description: string;
	key: string;
	placement: 'top-bar' | 'none';
};

export type PortalMenu = {
	name: string;
	description: string;
	key: string;
};

export type PortalState = {
	portal: Portal;
	routes: PortalRouter;
	apps?: string[];
	extensions?: Extensions;
	req?: PortalRequest;
	error?: {
		message: string;
		type: string;
	};
};

export type PortalStateInitial = Partial<Omit<PortalState, 'status'>>;

export interface PortalConfiguration {
	base: BaseConfig;
	client: IClient;
	portalConfig: PortalState;
}

export type BaseConfig = {
	portalId: string;
	portalEnv: string;
};

export type GetPortalParameters = {
	portalId: string;
};

export type GetAppsParameters = {
	portalId: string;
	contextId: string;
};

export type IClient = {
	getPortal: QueryCtorOptions<PortalRequest, GetPortalParameters>;
	getPortalApps: QueryCtorOptions<string[], GetAppsParameters>;
};
