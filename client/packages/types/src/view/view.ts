import { AppManifest } from '@equinor/fusion-framework-module-app';

export type View = {
	id: string;
	icon?: string;
	name: string;
	shortName: string;
	subtext: string;
	order: number;
	appGroups: AppGroup[];
	key: string;
	isDefault: boolean;
	contextType: ContextType[];
};

export interface App {
	key: string;
	appKey: string;
	name: string;
	description: string;
	order: number;
	appGroup?: string;
	isDisabled?: boolean;
	isPinned?: boolean;
}

export interface AppGroup {
	name: string;
	accentColor: string;
	order: number;
	apps: App[];
}

export type FusionAppManifest = AppManifest & { isPinned?: boolean; isDisabled?: boolean; url?: string };

export interface FusionAppGroup {
	name: string;
	accentColor: string;
	order: number;
	apps: FusionAppManifest[];
}

export type ContextType = 'Facility' | 'ProjectMaster' | 'Contract';
