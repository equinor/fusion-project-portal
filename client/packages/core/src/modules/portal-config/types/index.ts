import { AppManifest as FusionAppManifest } from '@equinor/fusion-framework-module-app';
import { QueryCtorOptions } from '@equinor/fusion-query';

export type Portal = {
	id: string;
	icon?: string;
	name: string;
	shortName?: string;
	subtext?: string;
	contexts?: ContextType[];
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

export type Apps = {
	appGroups: AppGroup[];
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
	apps?: Apps;
	error?: {
		message: string;
		type: string;
	};
};

export type PortalStateInitial = Partial<Omit<PortalState, 'status'>>;

export interface PortalConfig {
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

export type IClient = {
	getPortal: QueryCtorOptions<Portal, GetPortalParameters>;
};
