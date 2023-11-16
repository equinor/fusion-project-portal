import { describe, test, expect, vi, beforeEach } from 'vitest';

import { isLegacyFusionApplication } from './app-is-legacy-fusion-application';
import { AppModuleConfig, AppModuleProvider } from '@equinor/fusion-framework-module-app';

beforeEach(() => {
	vi.resetModules();
});
vi.mock('rxjs', async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const original: any = await vi.importActual('rxjs');

	return {
		...original,
		lastValueFrom: () =>
			new Promise((resolve) => {
				resolve({ isLegacy: true });
			}),
	};
});
const appProvider = new AppModuleProvider({
	config: {
		client: {
			getAppManifest: {
				client: {
					fn: vi.fn(),
				},
				key: vi.fn(),
			},
			getAppManifests: {
				client: {
					fn: vi.fn(),
				},
				key: vi.fn(),
			},
			getAppConfig: {
				client: {
					fn: vi.fn(),
				},
				key: vi.fn(),
			},
		},
	} as AppModuleConfig,
});

describe('isLegacyFusionApplication', () => {
	test('Should return true', async () => {
		const getAppManifest = vi.fn();
		appProvider.getAppManifest = getAppManifest;
		const isLegacy = await isLegacyFusionApplication({ appKey: 'meetings', appProvider });
		expect(getAppManifest).toBeCalledWith('meetings');
		expect(getAppManifest).toBeCalledTimes(1);
		expect(isLegacy).toBe(true);
	});
	test('Should return false if no app key is provided', async () => {
		const getAppManifest = vi.fn();
		appProvider.getAppManifest = getAppManifest;
		const isLegacy = await isLegacyFusionApplication({ appProvider });
		expect(getAppManifest).not.toBeCalled();
		expect(isLegacy).toBe(false);
	});
});
