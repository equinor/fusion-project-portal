import * as React from "react";
import * as ReactDOM from "react-dom";
import * as fusion from "@equinor/fusion";
import * as fusionComponents from "@equinor/fusion-components";
import * as fusionReactStyles from "@equinor/fusion-react-styles";
import * as FusionReactRouter from "react-router-dom";

declare global {
  interface Window {
    FusionReact: typeof React;
    FusionReactDOM: typeof ReactDOM;
    FusionReactRouter: typeof FusionReactRouter;
    FusionAPI: typeof fusion;
    FusionComponents: typeof fusionComponents;
    FusionReactStyles: typeof fusionReactStyles;
    clientBaseUri: string;
  }
}
function addGlobalDependencies() {
  window["FusionReact"] = React;
  window["FusionReactDOM"] = ReactDOM;
  window["FusionReactRouter"] = FusionReactRouter;
  window["FusionAPI"] = fusion;
  window["FusionComponents"] = fusionComponents;
  window["FusionReactStyles"] = fusionReactStyles;
}

addGlobalDependencies();
