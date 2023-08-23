import { describe, test, expect } from 'vitest';
import { getLegacyClientConfig } from './app-get-legacy-client-config';
import { JSDOM } from 'jsdom';
import { PortalConfig } from '../../types';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

window['_config_'] = {
	portalClient: {
		client: {
			baseUri: 'test',
			defaultScopes: ['test'],
		},
	},
} as PortalConfig;

describe('getLegacyClientConfig', () => {
	test('should return client', () => {
		const client = getLegacyClientConfig();
		expect(client.baseUri).toBe('test');
		expect(client.defaultScopes[0]).toBe('test');
	});
});
