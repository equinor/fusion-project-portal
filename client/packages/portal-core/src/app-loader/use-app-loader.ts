import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { useAppModule } from './uss-app-module';

export const useAppLoader = (appKey: string) => {
	const { app, fusion, currentApp } = useAppModule();

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
					if (manifest.key === 'meetings') {
						/** generate basename for application regex extracts /apps/:appKey */
						const [basename] = window.location.pathname.match(/\/?apps\/[a-z|-]+\//g) ?? [''];

						appRef.current = document.createElement('div');
						appRef.current.style.display = 'contents';
						const uri = './appLoader.js';

						const legacyAppScript = await import(/* @vite-ignore */ uri);

						console.log(legacyAppScript);
						const render = legacyAppScript.renderApp ?? legacyAppScript.default;

						subscription.add(
							render(appRef.current, { fusion, env: { basename, config, manifest, appKey } })
						);
					} else {
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
	};
};
