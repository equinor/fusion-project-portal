import { NavigationModule } from "@equinor/fusion-framework-module-navigation";
import { LegacyFusionWrapper } from "./app-loader";
import { AppModuleLoader } from "./app-loader/components/AppModuleLoader";

import { AppModule } from "@equinor/fusion-framework-module-app";
import { Fusion, useFramework } from "@equinor/fusion-framework-react";

import {
  ComponentRenderArgs,
  makeComponent,
  useAppModules,
} from "@equinor/fusion-framework-react-app";

import { ProgressLoader } from "./app-loader/components/ProgressLoader";

import { addGlobalDependencies } from "./globalResources";
import { Suspense, createElement } from "react";
import configure from "./config";

addGlobalDependencies();

export const App = (props: {
  fusion: Fusion;
  env: {
    config: {
      environment: { appKey: string; env: string; loadingText?: string };
    };
  };
}) => {
  const fusion = useFramework<[AppModule, NavigationModule]>();
  const appFramework = useAppModules<[AppModule]>();

  return (
    <LegacyFusionWrapper
      framework={fusion}
      options={{
        loadBundlesFromDisk: false,
        environment: {
          env: props.env.config.environment.env,
        },
      }}
      loader={
        <ProgressLoader
          title={props.env.config.environment.loadingText || "Loading"}
        />
      }
      appFramework={appFramework}
    >
      <AppModuleLoader appKey={props.env?.config.environment.appKey} />
    </LegacyFusionWrapper>
  );
};

const appComponent = (args: any) => createElement(App, args);

/** create React render root component */
export const createApp = (args: ComponentRenderArgs) => {
  return makeComponent(appComponent(args), args, configure as any);
};

export const AppComponent = (args: ComponentRenderArgs) => {
  const AppComponent = createApp(args);
  return (
    <Suspense fallback={<></>}>
      <AppComponent />
    </Suspense>
  );
};
