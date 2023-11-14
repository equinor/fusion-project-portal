export type ServiceMessage = {
	id: string;
	type: 'Issue' | 'Maintenance' | 'Info';
	title: string | null;
	content: string | null;
	scope: 'Portal' | 'App';
	relevantApps?: AppReference[] | null;
	relevantPortals?: PortalReference[] | null;
	timestamp: Date;
	appliesFrom?: Date | null;
	appliesTo?: Date | null;
	notifyUser: boolean;
};

export type AppReference = {
	key: string;
	name: string | null;
	shortName: string | null;
};
export type PortalReference = {
	identifier: string;
};

export type ServiceMessages = Record<string, ServiceMessage>;
