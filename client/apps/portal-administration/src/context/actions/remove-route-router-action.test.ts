import { describe, it, expect } from "vitest";
import { removeRoute } from "./router-actions";
import { Route } from "../../types/router-config";

describe("removeRoute", () => {
  it("should remove a route from the router", () => {
    // Arrange
    const routes: Route[] = [
      {
        id: "1",
        description: "Route 1",
        path: "/route1",
        pageKey: "route1",
        messages: {
          errorMessage: "Error message for Route 1",
        },
      },
      {
        id: "2",
        description: "Route 2",
        path: "/route2",
        pageKey: "route2",
        messages: {
          errorMessage: "Error message for Route 2",
          noPageMessage: "No page message for Route 2",
        },
        children: [
          {
            id: "2.1",
            description: "Route 2.1",
            path: "/route2.1",
            pageKey: "route2.1",
            messages: {
              errorMessage: "Error message for Route 2.1",
            },
          },
        ],
      },
    ];

    // Act
    const updatedRouter = removeRoute("1", routes);

    // Assert
    if (updatedRouter) {
      expect(updatedRouter).toHaveLength(1);
      expect(updatedRouter).not.toContain(routes[0]);
    }
  });
  it("should remove a child route from the router", () => {
    // Arrange
    const routes: Route[] = [
      {
        id: "1",
        description: "Route 1",
        path: "/route1",
        pageKey: "route1",
        messages: {
          errorMessage: "Error message for Route 1",
        },
      },
      {
        id: "2",
        description: "Route 2",
        path: "/route2",
        pageKey: "route2",
        messages: {
          errorMessage: "Error message for Route 2",
        },
        children: [
          {
            id: "2.1",
            description: "Route 2.1",
            path: "/route2.1",
            pageKey: "route2.1",
            messages: {
              errorMessage: "Error message for Route 2.1",
            },
          },
        ],
      },
    ];

    // Act
    const updatedRouter = removeRoute("2.1", routes);

    // Assert
    if (updatedRouter) {
      expect(updatedRouter[1].children).toHaveLength(0);
    }
  });
});
