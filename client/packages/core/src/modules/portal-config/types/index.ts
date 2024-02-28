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
	apps?: AppManifest[];
	routes?: PortalRoutes;
	extensions?: Extensions;
};

export type PortalRoutes = {
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
	name: string | null;
	color: string | null;
	defaultIcon: string | null;
	apps: AppManifest[];
};

export type AppManifest = FusionAppManifest & { isPinned?: boolean; isDisabled?: boolean; url?: string };

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
	routes: PortalRoutes;
	apps?: AppManifest[];
	extensions?: Extensions;
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
	getPortal: QueryCtorOptions<Portal, GetPortalParameters>;
	getApps: QueryCtorOptions<AppManifest[], GetAppsParameters>;
};
