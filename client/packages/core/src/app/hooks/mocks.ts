import { vi } from 'vitest';

import { AppManifest, AppModuleProvider } from '@equinor/fusion-framework-module-app';
import { BehaviorSubject } from 'rxjs';

const config = {
	environment: {
		env: 'test',
	},
	endpoints: {
		home: '/',
	},
};
export const getAppConfigMock = vi.fn();
export const getAppManifestMock = vi.fn();
export const getAppManifestsMock = vi.fn();

export const appProvider = new AppModuleProvider({
	config: {
		proxy: {
			path: '',
		},
		client: {
			getAppConfig: {
				client: {
					fn: () => {
						getAppConfigMock();
						return new BehaviorSubject(config);
					},
				},
				key: ({ appKey }) => appKey,
			},
			getAppManifest: {
				client: {
					fn: ({ appKey }) => {
						getAppManifestMock();
						return new BehaviorSubject({
							key: appKey,
							name: 'testName',
						} as AppManifest);
					},
				},
				key: () => 'getAppManifest',
			},
			getAppManifests: {
				client: {
					fn: getAppManifestsMock,
				},
				key: () => 'getAppManifests',
			},
		},
	},
});
