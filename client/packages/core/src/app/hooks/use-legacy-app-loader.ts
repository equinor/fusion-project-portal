import { AppScriptModule } from '@equinor/fusion-framework-module-app';
import { useLayoutEffect, useState } from 'react';

export const useLegacyAppLoader = () => {
	const [legacyAppScript, setLegacyAppScript] = useState<AppScriptModule>();
	const [legacyAppError, setLegacyAppError] = useState<Error | undefined>();

	useLayoutEffect(() => {
		const setupLegacy = async () => {
			const uri = '/appLegacyLoader.js';
			try {
				const script = await import(/* @vite-ignore */ uri /* @vite-ignore */);
				setLegacyAppScript(script);
			} catch (_) {
				const error = new Error(
					'Failed to load legacy app script, for development you need to build the legacy app loader first'
				);
				error.name = 'LegacyAppLoaderError';
				setLegacyAppError(error);
			}
		};
		setupLegacy();
	}, []);

	return { legacyAppScript, legacyAppError };
};
