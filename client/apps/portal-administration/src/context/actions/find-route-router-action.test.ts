import { test, expect } from "vitest";
import { findRouteById } from "./router-actions";
import { Route } from "../../types/router-config";

test("findRouteById should return the correct route", () => {
  const childRoute = {
    id: "3",
    description: "Route 3",
    path: "/route3",
    pageKey: "route3",
    messages: {
      errorMessage: "Error in Route 3",
      noPageMessage: "No page found for Route 3",
    },
    children: undefined,
  };
  const routes: Route[] = [
    {
      id: "1",
      description: "Route 1",
      path: "/route1",
      pageKey: "route1",
      messages: {
        errorMessage: "Error in Route 1",
        noPageMessage: "No page found for Route 1",
      },
      children: [
        {
          id: "2",
          description: "Route 2",
          path: "/route2",
          pageKey: "route2",
          messages: {
            errorMessage: "Error in Route 2",
            noPageMessage: "No page found for Route 2",
          },
          children: [
            {
              id: "3",
              description: "Route 3",
              path: "/route3",
              pageKey: "route3",
              messages: {
                errorMessage: "Error in Route 3",
                noPageMessage: "No page found for Route 3",
              },
              children: undefined,
            },
          ],
        },
      ],
    },
    {
      id: "4",
      description: "Route 4",
      path: "/route4",
      pageKey: "route4",
      messages: {
        errorMessage: "Error in Route 4",
        noPageMessage: "No page found for Route 4",
      },
      children: undefined,
    },
  ];

  const result = findRouteById(routes, "3");

  expect(result).toEqual(childRoute);
});
