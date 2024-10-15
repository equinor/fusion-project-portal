import { describe, test, expect, vi, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useCurrentApp } from './use-current-app';

import { AppConfig, AppManifest, AppModuleProvider, IAppClient } from '@equinor/fusion-framework-module-app';
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
			getAppManifest: ({ appKey }) => {
				getAppManifestMock();
				return new BehaviorSubject({
					appKey: appKey,
					displayName: 'testName',
				} as AppManifest);
			},
			getAppManifests: () => {
				getAppManifestsMock();
				return new BehaviorSubject([] as AppManifest[]);
			},
			getAppConfig: () => {
				getAppConfigMock();
				return new BehaviorSubject<AppConfig<any>>(config);
			},
		},
	},
});

beforeEach(() => {
	appProvider.clearCurrentApp();
});

describe('use-current-app', () => {
	test('Set app', () => {
		const { result } = renderHook(() => useCurrentApp(appProvider));
		act(() => {
			appProvider.setCurrentApp('test');
		});
		expect(result.current?.appKey).toEqual('test');
	});
	// test('result - loadConfig', () => {
	// 	const { result } = renderHook(() => useCurrentApp(appProvider));
	// 	act(() => {
	// 		appProvider.setCurrentApp('test');
	// 	});
	// 	result.current?.loadConfig();
	// 	expect(getAppConfigMock).toBeCalled();
	// });
	test('result - loadManifest', () => {
		const { result } = renderHook(() => useCurrentApp(appProvider));
		act(() => {
			appProvider.setCurrentApp('test');
		});
		result.current?.loadManifest();
		expect(getAppManifestMock).toBeCalled();
	});
});
