import { useFramework } from "@equinor/fusion-framework-react";
import { PropsWithChildren } from "react";

import { AppModule } from "@equinor/fusion-framework-module-app";
import { NavigationModule } from "@equinor/fusion-framework-module-navigation";
import { LegacyFusionWrapper } from "../legacy-interopt/components";
import { useAppModules } from "@equinor/fusion-framework-react-app";

export const LegacyWrapper = ({ children }: PropsWithChildren) => {
  const framework = useFramework<[AppModule, NavigationModule]>();
  const appFramework = useAppModules<[AppModule]>();

  return (
    <LegacyFusionWrapper
      framework={framework}
      loader={<div>loading...</div>}
      appFramework={appFramework}
    >
      {children}
    </LegacyFusionWrapper>
  );
};
