import { describe, test, expect, vi, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useCurrentApp } from './use-current-app';

import { appProvider, getAppConfigMock, getAppManifestMock } from './mocks';

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
		result.current?.config$.subscribe(() => {
			expect(getAppConfigMock).toBeCalled();
		});
		result.current?.loadConfig();
	});
	test('result - loadManifest', () => {
		const { result } = renderHook(() => useCurrentApp(appProvider));
		act(() => {
			appProvider.setCurrentApp('test');
		});
		result.current?.manifest$.subscribe(() => {
			expect(getAppManifestMock).toBeCalled();
		});
		result.current?.loadManifest();
	});
});
