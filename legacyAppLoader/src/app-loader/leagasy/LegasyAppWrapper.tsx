import { Suspense, useMemo } from 'react';

import { useFramework } from '@equinor/fusion-framework-react';

import { GLOBAL_FUSION_CONTEXT_KEY } from '../legacy-interopt/static';
import { createLegacyRender } from '../legacy-interopt';
import { LegacyEnv } from './LegasyAppLoader';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getLegacyFusion = () => window[GLOBAL_FUSION_CONTEXT_KEY];
/**
 * Legacy wrapper element
 * this should be removed in future when applications are moved over to ESM
 */

export const AppWrapperLegacy = (props: {
  appKey: string;
  env: LegacyEnv;
}): JSX.Element => {
  console.log('here');
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
      console.warn(
        '🌍❗️ Portal Legacy:',
        'no render or component, make sure app script is loading'
      );
      return null;
    }

    console.debug('🌍 Portal:', 'creating application component', manifest);

    const render =
      manifest.render ?? createLegacyRender(manifest, legacyFusion);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return render(fusion, env);
  }, [fusion, legacyFusion, manifest, env]);

  if (!AppComponent) {
    return <h2>Failed to render application, missing app component</h2>;
  }
  return (
    <Suspense fallback={<>Loding app..</>}>
      <AppComponent />
    </Suspense>
  );
};

export default AppWrapperLegacy;
