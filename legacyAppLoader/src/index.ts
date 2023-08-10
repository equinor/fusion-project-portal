import { ComponentRenderArgs } from "@equinor/fusion-framework-react-app";

import { render } from "react-dom";
import { AppComponent } from "./App";

/** Render function */
export const renderApp = (el: HTMLElement, args: ComponentRenderArgs) => {
  render(AppComponent(args), el);

  return () => {
    //
  };
};

export default renderApp;
