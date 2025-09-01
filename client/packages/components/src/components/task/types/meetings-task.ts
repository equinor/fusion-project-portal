export type MeetingType = 'GeneralMeeting' | 'GeneralSeries' | 'ReviewMeeting';

export enum ActionState {
	New = 'New',
	Active = 'Active',
	OnHold = 'OnHold',
	Deferred = 'Deferred',
	NotCompleted = 'NotCompleted',
	ReadyForCloseOut = 'ReadyForCloseOut',
	Completed = 'Completed',
}

export type MeetingActionPriority = 'Normal' | 'Low' | 'High' | 'Critical';

type ActionMeeting = {
	id: string;
	isDisabled: boolean;
	plannedDateUtc: string;
	title: string;
	isCanceled?: boolean;
	project?: {
		name?: string;
		projectMasterId: string;
	};
};

export type MeetingPerson = {
	id: string;
	name: string;
	jobTitle: string;
	department: string;
	mail: string;
};
export type MeetingAction = {
	id: string;
	title: string;
	description: string;
	category: string;
	meetingType: MeetingType;
	reviewType?: string;
  	reviewId?: string;
	completedReason: string | null;
	state: ActionState;
	meeting?: ActionMeeting;
  	review?: ActionMeeting;
	priority: MeetingActionPriority;
	percentStatus?: number;
	lastModifiedUtc?: string;
	createdBy: MeetingPerson;
	completedBy: MeetingPerson | null;
	dueDateUtc?: string;
	isCompleted: boolean;
	projectId?: string;
  	project?: { id?: string, projectMasterId: string, name?: string };
	createdUtc: string;
	contextId?: string;
	isDeleted: boolean;
	isArchived: boolean;
};
