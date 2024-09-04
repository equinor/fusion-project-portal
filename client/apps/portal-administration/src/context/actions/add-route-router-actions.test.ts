import { Route } from "../../types/router-config";
import { addRoute } from "./router-actions";
import { describe, it, expect } from "vitest";
describe("addRoute", () => {
  it("should add a new route to the routes array", () => {
    const newRoute: Route = {
      id: "new-route",
      path: "/new-route",
      pageKey: "page3",
      messages: {
        errorMessage: "",
      },
    };

    const routes: Route[] = [
      {
        id: "route1",
        path: "/route1",
        pageKey: "page1",
        messages: {
          errorMessage: "",
        },
      },
      {
        id: "route2",
        path: "/route2",
        pageKey: "page2",
        messages: {
          errorMessage: "",
        },
      },
    ];

    const updatedRoutes = addRoute(newRoute, routes);

    if (updatedRoutes) {
      expect(updatedRoutes).toHaveLength(routes.length + 1);
      expect(updatedRoutes[2]).toEqual(newRoute);
    }
  });

  it("should add a new route as a child of an existing route", () => {
    const newRoute: Route = {
      id: "new-route",
      path: "/new-route",
      pageKey: "page3",
      messages: {
        errorMessage: "",
      },
    };

    const routes: Route[] = [
      {
        id: "parent-route",
        path: "/parent-route",
        pageKey: "page3",
        messages: {
          errorMessage: "",
        },
        children: [
          {
            id: "child-route1",
            path: "/child-route1",
            pageKey: "page3",
            messages: {
              errorMessage: "",
            },
          },
          {
            id: "child-route2",
            path: "/child-route2",
            pageKey: "page3",
            messages: {
              errorMessage: "",
            },
          },
        ],
      },
    ];

    const updatedRoutes = addRoute(newRoute, routes, "parent-route");
    if (updatedRoutes && updatedRoutes[0].children) {
      expect(updatedRoutes).toHaveLength(routes.length);
      expect(updatedRoutes[0].children).toHaveLength(3);
      expect(updatedRoutes[0].children[2]).toBe(newRoute);
    }
  });
});
