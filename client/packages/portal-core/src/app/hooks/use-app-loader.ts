import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './use-app-module';

import { useLegacyAppLoader } from './use-legacy-app-loader';
import { createAppElement } from '../utils/app-element';
import { appRender } from '../render';
import { isLegacyManifest, getLegacyClientConfig } from '../utils';

export const useAppLoader = (appKey: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

	const { fusion, currentApp } = useAppModule(appKey);

	const legacyAppScript = useLegacyAppLoader();

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
					const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

					try {
						//Casting to se if manifest is for fusion legacy application
						if (isLegacyManifest(manifest)) {
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
													client: getLegacyClientConfig(),
												},
											},
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
						setError(error as Error);
						setLoading(false);
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
	}, [currentApp, appRef, fusion, legacyAppScript]);

	return {
		loading,
		error,
		appRef,
	};
};
