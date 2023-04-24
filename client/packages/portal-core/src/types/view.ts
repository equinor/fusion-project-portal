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
	appKey: string;
	name: string;
	description: string;
	order: number;
	appGroup?: string;
}

export interface AppGroup {
	name: string;
	accentColor: string;
	order: number;
	apps: App[];
}

export type ContextType = 'Facility' | 'ProjectMaster' | 'Contract';
