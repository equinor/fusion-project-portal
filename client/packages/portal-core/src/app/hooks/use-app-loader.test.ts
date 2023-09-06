/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, vi, Mock } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useAppLoader } from './use-app-loader';
import { BehaviorSubject, map } from 'rxjs';
import { useMemo } from 'react';

let legacyAppScript = {};

vi.mock('./use-legacy-app-loader', async () => {
	return {
		useLegacyAppLoader: () => useMemo(() => legacyAppScript, []),
	};
});

vi.mock('../utils', async (getRest) => {
	const rest = await getRest<any>();
	return {
		...rest,
		getLegacyClientConfig: () => ({
			baseUri: 'baseUri',
			defaultScopes: ['defaultScopes'],
		}),
		getFusionLegacyEnvIdentifier: () => 'ci',
	};
});

const appRender = vi.fn();

const createApp = (app?: Mock, isLegacy?: boolean) =>
	new BehaviorSubject({
		manifest: {
			key: 'handover',
			isLegacy,
		},
		script: {
			renderApp: app,
			default: app,
		},
		config: undefined,
	});

const initialize = vi.fn();

vi.mock('./use-app-module', async () => {
	return {
		useAppModule: () => {
			return useMemo(
				() => ({
					currentApp: {
						initialize,
					},
				}),
				[]
			);
		},
	};
});

describe('use-app-loader', () => {
	test('should return default values', () => {
		const app = createApp(appRender);
		initialize.mockImplementation(() => app.asObservable());

		const { result } = renderHook(() => useAppLoader('handover'));

		act(() => {
			app.complete();
		});
		expect(result.current.error).toBe(undefined);
		expect(result.current.appRef.current.style.display).toBe('contents');
		expect(result.current.loading).toBe(false);
		expect(appRender).toBeCalled();
	});

	test('should add my test app to inner html on app root object', () => {
		const testApp = 'My Test App';

		appRender.mockImplementation((el: Element) => {
			el.innerHTML = testApp;
		});

		const app = createApp(appRender);
		initialize.mockImplementation(() => app.asObservable());

		const { result } = renderHook(() => useAppLoader('handover'));

		act(() => {
			app.complete();
		});
		expect(result.current.appRef.current.innerHTML).toBe(testApp);
		expect(result.current.loading).toBe(false);
	});

	test('should get error when no render is provider from script', () => {
		const app = createApp();
		initialize.mockImplementation(() => app.asObservable());
		const { result } = renderHook(() => useAppLoader('handover'));
		act(() => {
			app.complete();
		});
		expect(result.current.error?.message).toBe('Application is not supported, no render function provided');
		expect(result.current.loading).toBe(false);
	});

	test('should add my legacy test app to inner html on app root object', () => {
		const testApp = 'My Legacy Loader Test App';

		legacyAppScript = {
			default: (el: Element) => {
				el.innerHTML = testApp;
			},
		};

		const app = createApp(appRender, true);
		initialize.mockImplementation(() => app.asObservable());

		const { result } = renderHook(() => useAppLoader('handover'));

		act(() => {
			app.complete();
		});
		expect(result.current.appRef.current.innerHTML).toBe(testApp);
		expect(result.current.loading).toBe(false);
	});

	test('should get error server responds or internal fusion core returns error', () => {
		const app = createApp(appRender);
		initialize.mockImplementation(() =>
			app.asObservable().pipe(
				map(() => {
					throw new Error('Internal Fusion Error');
				})
			)
		);

		const { result } = renderHook(() => useAppLoader('handover'));
		act(() => {
			app.complete();
		});
		expect(result.current.error?.message).toBe('Internal Fusion Error');
		expect(result.current.loading).toBe(false);
	});
});
