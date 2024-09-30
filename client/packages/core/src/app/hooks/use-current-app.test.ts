import { describe, test, expect, vi, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useCurrentApp } from './use-current-app';

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
	test('result - loadConfig', () => {
		const { result } = renderHook(() => useCurrentApp(appProvider));
		act(() => {
			appProvider.setCurrentApp('test');
		});
		result.current?.loadConfig();
		expect(getAppConfigMock).toBeCalled();
	});
	test('result - loadManifest', () => {
		const { result } = renderHook(() => useCurrentApp(appProvider));
		act(() => {
			appProvider.setCurrentApp('test');
		});
		result.current?.loadManifest();
		expect(getAppManifestMock).toBeCalled();
	});
});
