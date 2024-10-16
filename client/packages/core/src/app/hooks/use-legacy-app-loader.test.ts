import { describe, test, expect, vi, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react-hooks';

import { useLegacyAppLoader } from './use-legacy-app-loader';
import { appProvider } from './mocks';
import { waitFor } from '@testing-library/react';

beforeEach(() => {
	appProvider.clearCurrentApp();
});
vi.mock('/appLegacyLoader.js', () => {
	return {
		renderApp: () => vi.fn(),
		default: () => vi.fn(),
	};
});

describe('useLegacyAppLoader', () => {
	test('should return appRender function', async () => {
		const { result } = renderHook(() => useLegacyAppLoader());

		await act(async () => {
			await waitFor(() => {
				expect(typeof result.current?.legacyAppScript?.renderApp === 'function').toEqual(true);
			});
		});
	});

	test('should return default function', async () => {
		const { result } = renderHook(() => useLegacyAppLoader());

		await act(async () => {
			await waitFor(() => {
				expect(typeof result.current?.legacyAppScript?.default === 'function').toEqual(true);
			});
		});
	});
});
