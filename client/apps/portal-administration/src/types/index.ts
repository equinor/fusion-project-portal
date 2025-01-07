import { AppManifest as FusionAppManifest } from '@equinor/fusion-framework-react-app';
import { Router } from './router-config';

export type AppManifest = FusionAppManifest & {
	isDisabled?: boolean;
	url?: string;
};

export type Admin = {
	id?: string;
	azureUniqueId: string;
};

export type Portal = {
	name: string;
	shortName: string;
	subtext: string;
	id: string;
	key: string;
	type: string;
	icon?: string;
	description: string;
	admins: Admin[];
	contexts: ContextType[];
};

export type CreatePortal = Omit<Portal, 'id'>;

export type PortalAppCreate = {
	appKey: string;
	removeAppFromContexts: boolean;
};

export type ContextType = {
	type: string;
};
export type OnboardedContext = {
	title: string;
	id: string;
	contextId: string;
	externalId: string;
	type: string;
	description: string;
	isActive?: boolean;
};

export type Variant = 'Warning' | 'Error' | 'Info' | 'NoContent';

export type Message = {
	type?: Variant;
	title: string;
	messages?: string[];
};

export type FormattedError = {
	status: number;
} & Message;

export type PortalApp = {
	name: string;
	displayName: string;
	id: string;
	appKey: string;
	isLegacy: boolean;
	description: string;
	contexts: ContextType[];
	contextTypes: string[];
	appInformation: { icon: string };
	isActive?: boolean;
	isGlobal?: boolean;
	isContextual?: boolean;
};

export type PortalApplication = {
	id: string;
	appKey: string;
	contextTypes: string[];
	appManifest: AppManifest;
	isActive?: boolean;
	isGlobal?: boolean;
	isContextual?: boolean;
	contextIds?: string[];
};

export type PortalAppMutation = {
	appKey: string;
	contextTypes: string[];
};

export type AppManifestResponse = {
	appKey: string;
	contextTypes: ContextType[];
	appManifest: AppManifest;
};

export type PortalConfiguration = {
	router: Router;
};

export type PortalConfigurationEditInput = {
	id: string;
} & PortalConfiguration;
