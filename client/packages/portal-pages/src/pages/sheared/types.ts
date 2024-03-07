export type Facility = {
	identity: string;

	parentFacility: string | null;
	sapPlant: string | null;

	schema: string | null;
} & Record<string, unknown>;

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;
