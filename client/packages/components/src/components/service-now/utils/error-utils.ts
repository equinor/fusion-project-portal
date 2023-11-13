import { FormattedError } from '../types/types';

type StandardErrorResponse = {
	error: {
		code: string;
		message: string;
	};
};

type ValidationErrorResponse = {
	title: string;
	errors: Record<string, string[]>;
};
export const errorIsStandardFormat = (error: unknown): error is StandardErrorResponse => {
	if (
		(error as StandardErrorResponse)?.error?.code !== undefined &&
		(error as StandardErrorResponse)?.error?.message !== undefined
	) {
		return true;
	} else return false;
};

export const errorIsValidationError = (error: unknown): error is ValidationErrorResponse => {
	if (
		(error as ValidationErrorResponse)?.title !== undefined &&
		(error as ValidationErrorResponse)?.errors !== undefined
	) {
		return true;
	} else return false;
};

export const DEFAULT_ERROR: FormattedError = {
	type: 'Error',
	title: 'Unable to connect to ServiceNow',
	status: -1,
};
export const formatError = (errorResponse: unknown, status: number): FormattedError => {
	if (typeof errorResponse === 'string') {
		return { title: errorResponse, status: status, type: 'Error' };
	} else if (errorResponse && typeof errorResponse === 'object') {
		if (errorIsStandardFormat(errorResponse)) {
			return {
				type: 'Error',
				title: errorResponse.error.message,
				status: status,
				messages: [errorResponse.error.code],
			};
		} else if (errorIsValidationError(errorResponse)) {
			return {
				type: 'Error',
				status: status,
				title: errorResponse.title,
				messages: Object.values(errorResponse.errors).map((error) => error.toString()),
			};
		} else {
			return DEFAULT_ERROR;
		}
	} else {
		return DEFAULT_ERROR;
	}
};
