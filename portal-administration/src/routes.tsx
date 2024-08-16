import { Outlet, RouteObject } from "react-router-dom";

import { NewPortal } from "./pages/NewPortal";
import { Portals } from "./pages/Portals";

import { EditPortal } from "./pages/EditPortal";
import { RouterConfig } from "./pages/RouterConfig";
import { OnboardedContext } from "./pages/OnboardedContext";
import Portal from "./pages/Portal";
import { OnboardedApps } from "./pages/OnboardedApps";
import { PortalApps } from "./pages/PortalApps";
import { Root } from "./pages/Root";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Portals,
      },
      {
        path: "new",
        Component: NewPortal,
      },
      {
        path: "apps",
        Component: OnboardedApps,
      },
      {
        Component: OnboardedContext,
        path: "context",
      },
      {
        path: "portal/:portalId",
        Component: Portal,
        children: [
          {
            Component: EditPortal,
          },
          {
            path: "overview",
            Component: EditPortal,
          },
          {
            Component: RouterConfig,
            path: "router",
          },
          {
            Component: PortalApps,
            path: "apps",
          },
          {
            Component: OnboardedContext,
            path: "context",
          },
        ],
      },
    ],
  },
];

export default routes;
