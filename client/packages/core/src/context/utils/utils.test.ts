import { ContextItem } from '@equinor/fusion-framework-module-context';
import { getContextPageURL } from './utils';
import { describe, test, expect } from 'vitest';

describe('context url utils', () => {
	test('it should return url with context', () => {
		const url = getContextPageURL({ id: '1234', type: { id: 'ProjectMaster' } } as ContextItem);
		expect(url).toEqual('project/1234');
	});
	test('it should return url with no context', () => {
		const url = getContextPageURL(undefined);
		expect(url).toEqual('/');
	});
});
