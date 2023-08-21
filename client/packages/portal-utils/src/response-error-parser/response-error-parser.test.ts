import { test, describe, expect } from 'vitest';
import { responseErrorParser } from './response-error-parser';

describe('responseErrorParser', () => {
	test('500 Should return - Server failed to respond', () => {
		const res = { status: 500 } as Response;
		const errorMessage = responseErrorParser(res);
		expect(errorMessage).toEqual('Server failed to respond');
	});
	test('401 Should return - Failed to authenticate, reload the page and try again', () => {
		const res = { status: 401 } as Response;
		const errorMessage = responseErrorParser(res);
		expect(errorMessage).toEqual('Failed to authenticate, reload the page and try again');
	});
	test(`403 Should return - It looks like you don't have permission to view this page`, () => {
		const res = { status: 403 } as Response;
		const errorMessage = responseErrorParser(res);
		expect(errorMessage).toEqual(`It looks like you don't have permission to view this page`);
	});
	test('404 Should return - Resource not found.', () => {
		const res = { status: 404 } as Response;
		const errorMessage = responseErrorParser(res);
		expect(errorMessage).toEqual('Resource not found.');
	});
	test('405 Should return - We are not sure whats wrong', () => {
		const res = { status: 405 } as Response;
		const errorMessage = responseErrorParser(res);
		expect(errorMessage).toEqual('We are not sure whats wrong');
	});
});
