import { Suspense, useMemo } from 'react';

import { useFramework } from '@equinor/fusion-framework-react';

import { GLOBAL_FUSION_CONTEXT_KEY } from '../legacy-interopt/static';
import { createLegacyRender } from '../legacy-interopt';

import { MessagePage } from './MessagePage';
import { ProgressLoader } from './ProgressLoader';

import { LegacyEnv } from './LegacyAppLoader';

const DEBUG_LOG = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getLegacyFusion = () => window[GLOBAL_FUSION_CONTEXT_KEY];
/**
 * Legacy wrapper element
 * this should be removed in future when applications are moved over to ESM
 */

export const AppWrapperLegacy = (props: { appKey: string; env: LegacyEnv }): JSX.Element => {
	const { appKey, env } = props;
	const fusion = useFramework();
	const legacyFusion = getLegacyFusion();
	const manifest = getLegacyFusion().app.container.get(appKey) || null;

	const AppComponent = useMemo(() => {
		if (!manifest) {
			console.warn('🌍❗️ Portal Legacy:', 'missing application manifest');
			return null;
		}

		/** sanity check if the `registerApp` has been loaded */
		if (!manifest.render && !manifest.AppComponent) {
			DEBUG_LOG &&
				console.warn('🌍❗️ Portal Legacy:', 'no render or component, make sure app script is loading');
			return null;
		}

		DEBUG_LOG && console.debug('🌍 Portal:', 'creating application component', manifest);

		const render = manifest.render ?? createLegacyRender(manifest, legacyFusion);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return render(fusion, env);
	}, [fusion, legacyFusion, manifest, env]);

	if (!AppComponent) {
		return (
			<MessagePage title="Loader Error">
				<p>Failed to render application, missing app component</p>
			</MessagePage>
		);
	}
	return (
		<Suspense fallback={<ProgressLoader title="Loading" />}>
			<AppComponent />
		</Suspense>
	);
};

export default AppWrapperLegacy;
