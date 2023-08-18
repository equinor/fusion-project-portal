import { describe, test, expect, vi, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { AppManifest } from '@equinor/fusion-framework-module-app';
import { useAppModule } from './use-app-module';
import { appProvider } from './mocks';

beforeEach(() => {
	appProvider.clearCurrentApp();
});

vi.mock('@equinor/fusion-framework-react', () => {
	const rest = vi.importActual('@equinor/fusion-framework-react');
	return {
		...rest,
		useFramework: () => ({
			modules: {
				app: appProvider,
				auth: true,
			},
		}),
	};
});

describe('useAppModule', () => {
	test('should return app with handover appKey', async () => {
		const { result } = renderHook(() => useAppModule('handover'));

		expect(result.current.app.current?.appKey).toEqual('handover');
	});
	test('should return fusion modules', async () => {
		const { result } = renderHook(() => useAppModule('query'));

		expect(result.current.fusion).toEqual({
			modules: {
				app: appProvider,
				auth: true,
			},
		});
	});
	test('should return currentApp', async () => {
		const { result } = renderHook(() => useAppModule('meetings'));

		expect(result.current.currentApp?.appKey).toEqual('meetings');
	});
	test('should return currentApp', async () => {
		const { result } = renderHook(() => useAppModule('meetings'));

		act(() => {
			result.current.currentApp?.updateManifest({ key: 'OneApp' } as AppManifest);
		});
		expect(result.current.appManifest).toEqual({ key: 'OneApp' });
	});
});
