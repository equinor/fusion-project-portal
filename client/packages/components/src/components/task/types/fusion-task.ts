import { AssignedTo } from './sheared';

export type FusionTask = {
	externalId: string;
	body: AssignmentBody;
	taskMode: string;
	state: 'Active' | 'Closed';
	priority: string;
	dueDate: string | null;
	sourceSystem: SourceSystem;
	ownerApplication: OwnerApplication;
	taskContexts: [];
	metadata: MetaData[];
	createdBy: string;
	created: string;
	modifiedBy: string | null;
	modified: string | null;
	id: string;
	title: string;
	category: string;
	url: string;
	assignedTo: AssignedTo;
	type?: 'Internal' | 'External';
};

interface MetaDataType {
	internalName: string;
	displayName: string;
	valueType: string;
}

interface MetaData {
	type: MetaDataType;
	value: string;
	valueEntity: string | null;
}
interface SourceSystem {
	name: string;
	subSystem: string;
	identifier: string;
}

interface AssignmentBody {
	type: string;
	payload: string;
}

interface OwnerApplication {
	id: string;
	title: string;
}
