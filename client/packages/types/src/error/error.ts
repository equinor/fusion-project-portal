export interface FusionError {
	type: string;
	title: string;
	status: number;
	instance: string;
	error: BaseError;
	traceId: string;
	timestamp: string;
}

interface BaseError {
	resourceIdentifier: string;
	code: string;
	message: string;
	possibleAction?: string | null;
}
