import React from "react";
import ReactDOM from "react-dom";
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
export function addGlobalDependencies() {
  window["FusionReactDOM"] = ReactDOM;
  window["FusionReact"] = React;
  window["FusionReactRouter"] = FusionReactRouter;
  window["FusionAPI"] = fusion;
  window["FusionComponents"] = fusionComponents;
  window["FusionReactStyles"] = fusionReactStyles;
}

addGlobalDependencies();
