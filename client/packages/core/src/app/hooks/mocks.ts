import { vi } from 'vitest';

import { AppConfig, AppManifest, AppModuleProvider } from '@equinor/fusion-framework-module-app';
import { BehaviorSubject } from 'rxjs';

const config: AppConfig<AppConfigMock> = {
	environment: {
		env: 'test',
	},
};
type AppConfigMock = {
	env: string;
};

export const getAppConfigMock = vi.fn();
export const getAppManifestMock = vi.fn();
export const getAppManifestsMock = vi.fn();

export const appProvider = new AppModuleProvider({
	config: {
		client: {
			[Symbol.dispose]: vi.fn(),

			getAppConfig: <A = AppConfigMock>() => {
				getAppConfigMock();
				return new BehaviorSubject<AppConfig<A>>(config as AppConfig<A>);
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
