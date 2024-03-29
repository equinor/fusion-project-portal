import { AppScriptModule } from '@equinor/fusion-framework-module-app';
import { useLayoutEffect, useState } from 'react';

export const useLegacyAppLoader = () => {
	const [legacyAppScript, setLegacyAppScript] = useState<AppScriptModule>();

	useLayoutEffect(() => {
		const setupLegacy = async () => {
			const uri = '/appLegacyLoader.js';
			const script = await import(/* @vite-ignore */ uri /* @vite-ignore */);
			setLegacyAppScript(script);
		};
		setupLegacy();
	}, []);

	return legacyAppScript;
};
