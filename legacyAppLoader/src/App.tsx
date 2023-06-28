import { NavigationModule } from "@equinor/fusion-framework-module-navigation";
import { LegacyFusionWrapper } from "./app-loader";
import { AppModuleLoader } from "./app-loader/components/AppModuleLoader";

import { AppModule } from "@equinor/fusion-framework-module-app";
import { Fusion, useFramework } from "@equinor/fusion-framework-react";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { addGlobalDependencies } from "./globalResources";
import { ProgressLoader } from "./app-loader/components/ProgressLoader";

addGlobalDependencies();
export const App = (props: {
  fusion: Fusion;
  env: { config: { environment: { appKey: string } } };
}) => {
  const fusion = useFramework<[AppModule, NavigationModule]>();
  const appFramework = useAppModules<[AppModule]>();

  return (
    <LegacyFusionWrapper
      framework={fusion}
      loader={<ProgressLoader title={"1. Loading"} />}
      appFramework={appFramework}
    >
      <AppModuleLoader appKey={props.env.config.environment.appKey} />
    </LegacyFusionWrapper>
  );
};

export default App;
