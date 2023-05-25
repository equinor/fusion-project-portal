/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Relations {
	relationSource: string;
	relationType?: any;
	id: string;
	externalId: string;
	source?: any;
	type: Type;
	value: Value;
	title: string;
	isActive: boolean;
	isDeleted: boolean;
	created: string;
	updated?: string;
}

interface Value {
	identity?: string;
	sapPlant?: string;
	schema?: string;
	subFacilities?: string[];
	parentFacility?: any;
	contractNumber?: string;
	companyName?: string;
	startDate?: string;
	endDate?: string;
	projectMasterId?: string;
	isValid?: boolean;
	taskName?: string;
	taskType?: string;
	taskState?: string;
	orgChartId?: string;
	orgUnitSapId?: string;
	orgUnitShortName?: string;
	orgUnitName?: string;
	orgUnitDepartment?: string;
	orgUnitFullDepartment?: string;
	orgUnitType?: string;
	domainId?: string;
	dgPhase?: string;
	siteCode?: string;
	projectIdentifier?: string;
	wbs?: string;
}

interface Contract {
	contractNumber?: number;
	companyName?: string;
	startDate?: string;
	endDate?: string;
	projectMasterId?: string;
	isValid: boolean;
}

interface Facility {
	identity: string;
	sapPlant: string;
	schema: string;
	subFacilities?: string[];
	parentFacility?: string[];
}

interface OrgChart {
	orgChartId?: string;
	domainId?: string;
	dgPhase?: string;
}

interface EquinorTask {
	taskName?: string;
	taskType?: string;
	taskState?: string;
	orgChartId?: string;
	orgUnitSapId?: string;
	orgUnitShortName?: string;
	orgUnitName?: string;
	orgUnitDepartment?: string;
	orgUnitFullDepartment?: string;
	orgUnitType?: string;
	projectMasterId?: string;
}

interface PDP {
	siteCode: string;
	projectIdentifier: string;
}

interface PimsDomain {
	domainId?: string;
	projectMasterId?: string;
}

interface Type {
	id: string;
	isChildType: boolean;
	parentTypeIds: string[];
}
