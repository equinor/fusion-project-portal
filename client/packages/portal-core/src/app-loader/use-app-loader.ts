import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './uss-app-module';
import { PortalConfig } from '../types';
import { AppScriptModule } from '@equinor/fusion-framework-module-app';

let count = 0;

export const useAppLoader = (appKey: string) => {
	const { app, fusion, currentApp } = useAppModule();
	const [legacyAppScript, setLegacyAppScript] = useState<AppScriptModule>();

	const appRef = useRef<HTMLDivElement>(document.createElement('div'));

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

	useLayoutEffect(() => {
		const setupLegacy = async () => {
			const uri = '/app-bundle.js';
			setLegacyAppScript((await import(/* @vite-ignore */ uri /* @vite-ignore */)) as AppScriptModule);
		};
		setupLegacy();
	}, []);

	useEffect(() => {
		appKey && app.setCurrentApp(appKey);
	}, [app, appKey]);

	useEffect(() => {
		setLoading(true);
		setError(undefined);
		const subscription = new Subscription();
		subscription.add(
			currentApp?.initialize().subscribe({
				next: async ({ manifest, script, config }) => {
					appRef.current = document.createElement('div');
					appRef.current.style.display = 'contents';
					console.log('ohh no!', count);
					count++;
					/** generate basename for application regex extracts /apps/:appKey */
					const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

					if (
						['meetings', 'query', 'handover-analytics', 'handover-garden', 'reviews'].includes(manifest.key)
					) {
						if (!legacyAppScript) return;
						const render = legacyAppScript.renderApp ?? legacyAppScript?.default;

						subscription.add(
							render(appRef.current, {
								fusion,
								env: {
									basename,
									manifest,
									config: {
										...config,
										environment: {
											appKey,
											client: {
												baseUri: window._config_.portalClient.client.baseUri,
												defaultScopes: window._config_.portalClient.client.defaultScopes,
											},
										},
									},
								},
							})
						);
					} else {
						const render = script.renderApp ?? script.default;
						subscription.add(render(appRef.current, { fusion, env: { basename, config, manifest } }));
					}
				},
				complete: () => {
					setLoading(false);
				},
				error: (err) => {
					setError(err);
				},
			})
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [currentApp, appRef, fusion, legacyAppScript]);

	return {
		loading,
		error,
		appRef,
	};
};

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
