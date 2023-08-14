import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './use-app-module';
import { PortalConfig } from '../../types';
import { AppManifest } from '@equinor/fusion-framework-module-app';
import { useLegacyAppLoader } from './use-legacy-app-loader';
import { createAppElement } from '../utils/app-element';

export const useAppLoader = (appKey: string) => {
	const { fusion, currentApp } = useAppModule(appKey);

	const legacyAppLoader = useLegacyAppLoader();

	const appRef = useRef<HTMLDivElement>(createAppElement());

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

	useEffect(() => {
		setLoading(true);
		setError(undefined);
		const subscription = new Subscription();
		subscription.add(
			currentApp?.initialize().subscribe({
				next: async ({ manifest, script, config }) => {
					appRef.current = createAppElement();

					/** generate basename for application regex extracts /apps/:appKey */
					const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

					//Casting to se if manifest is for fusion legacy application
					const isLegacy = (manifest as AppManifest & { isLegacy?: boolean }).isLegacy;

					if (isLegacy) {
						if (!legacyAppLoader) return;
						const render = legacyAppLoader.renderApp ?? legacyAppLoader?.default;

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
					setLoading(false);
				},
			})
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [currentApp, appRef, fusion, legacyAppLoader]);

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
