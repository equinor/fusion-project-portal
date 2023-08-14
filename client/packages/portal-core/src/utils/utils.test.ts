import { getContextPageUrl } from './utils';
import { describe, test, expect } from 'vitest';

describe('context url utils', () => {
	test('it should return url with context', () => {
		const url = getContextPageUrl('1234');
		expect(url).toEqual('/context-page/1234');
	});
	test('it should return url with no context', () => {
		const url = getContextPageUrl(undefined);
		expect(url).toEqual('/context-page/');
	});
});
