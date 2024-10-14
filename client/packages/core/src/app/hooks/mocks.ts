import { vi } from 'vitest';

import { AppConfig, AppManifest, AppModuleProvider } from '@equinor/fusion-framework-module-app';
import { BehaviorSubject } from 'rxjs';

const config: AppConfig = {
	environment: {
		env: 'test',
		home: '/',
	},
	endpoints: {},
};
export const getAppConfigMock = vi.fn();
export const getAppManifestMock = vi.fn();
export const getAppManifestsMock = vi.fn();

export const appProvider = new AppModuleProvider({
	config: {
		client: {
			[Symbol.dispose]: vi.fn(),

			getAppConfig: () => {
				getAppConfigMock();
				return new BehaviorSubject<AppConfig<any>>(config);
			},
			getAppManifest: ({ appKey }) => {
				getAppManifestMock();
				return new BehaviorSubject({
					key: appKey,
					name: 'testName',
				} as AppManifest);
			},

			getAppManifests: getAppManifestsMock,
		},
	},
});
