export type Facility = {
	identity: string;

	parentFacility: string | null;
	sapPlant: string | null;

	schema: string | null;
} & Record<string, unknown>;
