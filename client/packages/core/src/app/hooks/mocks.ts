import { vi } from 'vitest';

import { AppConfig, AppManifest, AppModuleProvider, ConfigEnvironment } from '@equinor/fusion-framework-module-app';
import { BehaviorSubject } from 'rxjs';

const config = {
	environment: {
		env: 'test',
	},
} as AppConfig<ConfigEnvironment & { env: string }>;

export const getAppConfigMock = vi.fn();
export const getAppManifestMock = vi.fn();
export const getAppManifestsMock = vi.fn();

export const appProvider = new AppModuleProvider({
	config: {
		client: {
			[Symbol.dispose]: vi.fn(),

			getAppConfig: <TEnv>() => {
				getAppConfigMock();
				return new BehaviorSubject(config as AppConfig<ConfigEnvironment & TEnv>);
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
