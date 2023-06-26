import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './uss-app-module';
import { PortalConfig } from '../types';
import { AppScriptModule } from '@equinor/fusion-framework-module-app';

export const useAppLoader = (appKey: string) => {
	const { app, fusion, currentApp } = useAppModule();
	const [isLegacy, setIsLegacy] = useState(false);

	const appRef = useRef<HTMLDivElement>(document.createElement('div'));

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

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
					if (
						['meetings', 'query', 'handover-analytics', 'handover-garden', 'reviews'].includes(manifest.key)
					) {
						setIsLegacy(true);
						/** generate basename for application regex extracts /apps/:appKey */
						const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

						appRef.current = document.createElement('div');
						appRef.current.style.display = 'contents';
						const uri = '/appLoader.js';

						const legacyAppScript = (await import(/* @vite-ignore */ uri)) as AppScriptModule;

						console.log(legacyAppScript);
						const render = legacyAppScript.renderApp ?? legacyAppScript.default;

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
						setIsLegacy(false);
						/** generate basename for application regex extracts /apps/:appKey */
						const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

						appRef.current = document.createElement('div');
						appRef.current.style.display = 'contents';

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

		return () => subscription.unsubscribe();
	}, [currentApp, appRef, fusion]);

	return {
		loading,
		error,
		appRef,
		isLegacy,
	};
};

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
