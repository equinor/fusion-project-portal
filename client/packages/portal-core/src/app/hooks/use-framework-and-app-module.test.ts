import { describe, test, expect, vi, beforeEach } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useFrameWorkAndAppModule } from './use-framework-and-app-module';
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

describe('useFrameWorkAndAppModule', () => {
	test('should return app', async () => {
		const { result } = renderHook(() => useFrameWorkAndAppModule());

		expect(!!result.current.app).toEqual(true);
		expect(result.current.app.current?.appKey).toEqual(appProvider.current?.appKey);
	});
	test('should return auth', async () => {
		const { result } = renderHook(() => useFrameWorkAndAppModule());
		expect(result.current.fusion.modules.auth).toBe(true);
	});
	test('should return not return context', async () => {
		const { result } = renderHook(() => useFrameWorkAndAppModule());
		expect(!!result.current.app).toEqual(true);
		expect(result.current.fusion.modules.context).toBe(undefined);
	});
});
