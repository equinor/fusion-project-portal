import { FormattedError } from '../types';

export const DEFAULT_ERROR: FormattedError = {
	type: 'Error',
	title: 'Generic Error',
	status: -1,
};

export const formatError = (errorResponse: unknown, status: number) => {
	if (typeof errorResponse === 'string') {
		return {
			...DEFAULT_ERROR,
			title: errorResponse,
			status,
		};
	}

	if (errorResponse instanceof TypeError) {
		const { cause, name, message, stack } = errorResponse;
		return {
			type: 'Error',
			title: name || 'Generic Error',
			messages: [message],
			status: cause,
			stack,
		};
	}

	if (typeof errorResponse === 'object' && errorResponse !== null) {
		const { title, messages } = errorResponse as FormattedError;
		return {
			type: 'Error',
			title: title || 'Generic Error',
			messages: messages || [],
			status,
		};
	}
	return DEFAULT_ERROR;
};
