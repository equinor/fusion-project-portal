export type TaskSource = 'Query & NC Request' | 'Meetings' | 'Review' | 'PIMS' | 'ProCoSys';

export interface Task {
	id: string;
	title: string;
	description?: string;
	category?: string;
	type?: string;
	state?: string;
	source: TaskSource;
	dueDate?: string;
	ceratedDate?: string;
	isOverdue?: boolean;
	href?: string;
	isExternal?: boolean;
}
