// import { AppManifest } from '@equinor/fusion-framework-module-app';

// export type Portal = {
// 	id: string;
// 	icon?: string;
// 	name: string;
// 	shortName: string;
// 	subtext: string;
// 	order: number;
// 	appGroups: AppGroup[];
// 	key: string;
// 	isDefault: boolean;
// 	contexts?: ContextType[];
// };

// export interface App {
// 	key: string;
// 	appKey: string;
// 	name: string;
// 	description: string;
// 	order: number;
// 	appGroup?: string;
// 	isDisabled?: boolean;
// 	isPinned?: boolean;
// }

// export interface AppGroup {
// 	name: string;
// 	accentColor: string;
// 	order: number;
// 	apps: App[];
// }

// export type FusionAppManifest = AppManifest & { isPinned?: boolean; isDisabled?: boolean; url?: string };

// export interface FusionAppGroup {
// 	name: string;
// 	accentColor: string;
// 	order: number;
// 	apps: FusionAppManifest[];
// }
// export interface FusionAppCategory {
// 	id?: string;
// 	name: string | null;
// 	color: string | null;
// 	defaultIcon: string | null;
// 	apps: FusionAppManifest[];
// }

export type ContextTypeOld = { type: 'Facility' } | { type: 'ProjectMaster' };
