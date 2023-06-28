import { FC, Suspense, useMemo } from "react";

import { ProgressLoader } from "./ProgressLoader";
import { createLegacyAppLoader } from "./LegasyAppLoader";

interface CurrentAppLoaderProps {
  appKey: string;
}

export const AppModuleLoader: FC<CurrentAppLoaderProps> = ({ appKey }) => {
  const LegacyLoader = useMemo(() => createLegacyAppLoader(appKey), [appKey]);

  return (
    <Suspense fallback={<ProgressLoader title="2. Loading" />}>
      <LegacyLoader />
    </Suspense>
  );
};

export default AppModuleLoader;
