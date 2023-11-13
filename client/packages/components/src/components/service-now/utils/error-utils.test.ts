import { formatError, DEFAULT_ERROR, errorIsStandardFormat, errorIsValidationError } from './error-utils';

describe('errorUtils', () => {
	describe('errorIsStandardFormat', () => {
		it('should return true for a valid StandardErrorResponse', () => {
			const errorResponse = { error: { code: '123', message: 'Test Error' } };
			expect(errorIsStandardFormat(errorResponse)).toBe(true);
		});

		it('should return false for an invalid StandardErrorResponse', () => {
			const errorResponse = { code: '123', message: 'Test Error' };
			expect(errorIsStandardFormat(errorResponse)).toBe(false);
		});
	});

	describe('errorIsValidationError', () => {
		it('should return true for a valid ValidationErrorResponse', () => {
			const errorResponse = { title: 'Validation Error', errors: { field: ['Error message'] } };
			expect(errorIsValidationError(errorResponse)).toBe(true);
		});

		it('should return false for an invalid ValidationErrorResponse', () => {
			const errorResponse = { title: 'Validation Error' };
			expect(errorIsValidationError(errorResponse)).toBe(false);
		});
	});

	describe('formatError', () => {
		it('should format a string error response', () => {
			const errorResponse = 'Connection failed';
			const status = 404;
			const formattedError = formatError(errorResponse, status);
			expect(formattedError).toEqual({
				type: 'Error',
				title: 'Connection failed',
				status: 404,
			});
		});

		it('should format a StandardErrorResponse', () => {
			const errorResponse = { error: { code: '123', message: 'Test Error' } };
			const status = 500;
			const formattedError = formatError(errorResponse, status);
			expect(formattedError).toEqual({
				type: 'Error',
				title: 'Test Error',
				status: 500,
				messages: ['123'],
			});
		});

		it('should format a ValidationErrorResponse', () => {
			const errorResponse = { title: 'Validation Error', errors: { field: ['Error message'] } };
			const status = 422;
			const formattedError = formatError(errorResponse, status);
			expect(formattedError).toEqual({
				type: 'Error',
				title: 'Validation Error',
				status: 422,
				messages: ['Error message'],
			});
		});

		it('should use DEFAULT_ERROR for unknown error types', () => {
			const errorResponse = null; // or any other unknown type
			const status = 500;
			const formattedError = formatError(errorResponse, status);
			expect(formattedError).toEqual(DEFAULT_ERROR);
		});
	});
});
