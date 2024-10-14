import { AppManifest as LegacyAppManifest } from "@equinor/fusion";
import { AppModule } from "@equinor/fusion-framework-module-app";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { useEffect, useState } from "react";

import LegacyAppContainer from "./legacy-interopt/LegacyAppContainer";
import { from, of } from "rxjs";
import { getLegacyFusion } from "./components/LegacyAppWrapper";

const setup = async (appKey: string) => {
  const appContainer = getLegacyFusion().app.container as LegacyAppContainer;

  await appContainer.getAllAsync();
  await appContainer.setCurrentAppAsync(appKey).then(() => {});
  const app = { ...appContainer.currentApp } as LegacyAppManifest;
  return app;
};
export const useAppModule = (appKey: string) => {
  const fusion = useAppModules<[AppModule]>();

  const [appManifest, setAppManifest] = useState<
    LegacyAppManifest | undefined
  >();

  useEffect(() => {
    from(setup(appKey)).subscribe((a) => {
      setAppManifest(a);
    });
  }, [appKey]);

  return {
    fusion,
    appManifest: appManifest as LegacyAppManifest,
  };
};
