import { describe, test, expect, beforeEach } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { AppManifest } from '@equinor/fusion-framework-module-app';
import { useCurrentAppManifest } from './use-current-app-manifest';
import { appProvider } from './mocks';

beforeEach(() => {
	appProvider.clearCurrentApp();
});

describe('useCurrentAppManifest', () => {
	test('should return undefined when no app is sett', async () => {
		appProvider.clearCurrentApp();
		const { result } = renderHook(() => useCurrentAppManifest(appProvider.current));
		act(() => {
			appProvider.current?.updateManifest({ key: 'handover' } as AppManifest);
		});

		expect(result.current).toEqual(undefined);
	});

	test('should return handover key', async () => {
		appProvider.setCurrentApp('meetings');
		if (!appProvider.current) throw new Error('No App currently sett');
		const { result } = renderHook(() => useCurrentAppManifest(appProvider.current));
		await act(async () => {
			appProvider.current?.updateManifest({ key: 'handover' } as AppManifest);
		});

		expect(result.current).toEqual({ key: 'handover' });
	});
});
