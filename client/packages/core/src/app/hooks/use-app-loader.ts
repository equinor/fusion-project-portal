import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './use-app-module';

import { useLegacyAppLoader } from './use-legacy-app-loader';
import { createAppElement } from '../utils/app-element';
import { appRender } from '../render';
import { getLegacyClientConfig, getFusionLegacyEnvIdentifier, getLegacyFusionConfig } from '../utils';

import { AppConfig } from '@equinor/fusion-framework-app';
import { ConfigEnvironment } from '@equinor/fusion-framework-module-app';
import { Client } from '@portal/types';

export const useAppLoader = (appKey: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

	const { fusion, currentApp } = useAppModule(appKey);

	const { legacyAppScript, legacyAppError } = useLegacyAppLoader();

	const appRef = useRef<HTMLDivElement>(createAppElement());

	useEffect(() => {
		setLoading(true);
		setError(undefined);
		const subscription = new Subscription();
		subscription.add(
			currentApp?.initialize().subscribe({
				next: ({ manifest, script, config }) => {
					// Application Element for mounting
					appRef.current = createAppElement();

					// Generate basename for application regex extracts /apps/:appKey
					const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [
						window.location.pathname,
					];

					try {
						//Casting to se if manifest is for fusion legacy application
						if (!Boolean(script.default) && !Boolean(script.renderApp)) {
							subscription.add(
								appRender({
									script: legacyAppScript,
									element: appRef.current,
									config: {
										fusion,
										env: {
											basename,
											manifest,
											config: {
												...config,
												environment: {
													appKey,
													env: getFusionLegacyEnvIdentifier(),

													loadingText: 'Loading',
													endpoints: {
														client: getLegacyClientConfig(),
														fusion: getLegacyFusionConfig(),
													},
												},
											} as AppConfig<
												ConfigEnvironment & {
													appKey: string;
													env: string;
													loadingText: string;
													endpoints: {
														client: Client;
														fusion: Client;
													};
												}
											>,
										},
									},
								})
							);
						} else {
							subscription.add(
								appRender({
									script,
									element: appRef.current,
									config: {
										fusion,
										env: { basename, config, manifest },
									},
								})
							);
						}
					} catch (error) {
						console.error('App loading Error: ', error);

						setError(error as Error);
					}
				},
				complete: () => {
					setLoading(false);
				},
				error: (error) => {
					console.error('App init Error: ', error, legacyAppError);
					if (legacyAppError) {
						setError(legacyAppError);
					} else {
						setError(error);
					}
					setLoading(false);
				},
			})
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [currentApp, appRef, fusion, legacyAppScript, legacyAppError]);

	return {
		loading,
		error,
		appRef,
	};
};
