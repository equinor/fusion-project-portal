import { FC, Suspense, useMemo } from "react";

import { ProgressLoader } from "./ProgressLoader";
import { createLegacyAppLoader } from "./LegacyAppLoader";

interface CurrentAppLoaderProps {
  appKey: string;
}

export const AppModuleLoader: FC<CurrentAppLoaderProps> = ({ appKey }) => {
  const LegacyLoader = useMemo(() => createLegacyAppLoader(appKey), [appKey]);

  return (
    <Suspense fallback={<ProgressLoader title="Loading App" />}>
      <LegacyLoader />
    </Suspense>
  );
};

export default AppModuleLoader;
