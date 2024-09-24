import { describe, it, expect } from "vitest";
import { updateRouteByField } from "./router-actions";

describe("updateRouteByField", () => {
  it("should return a new route object with the specified field updated", () => {
    const route = {
      id: "123",
      messages: {
        errorMessage: "Error",
      },
      path: "/home",
      pageKey: "home",
    };

    const updatedRoute = updateRouteByField("id", "456", route);

    expect(updatedRoute).toEqual({
      id: "456",
      messages: {
        errorMessage: "Error",
      },
      path: "/home",
      pageKey: "home",
    });
  });

  it("should return a new route object with the specified message field updated", () => {
    const route = {
      id: "123",
      messages: {
        errorMessage: "Error",
      },
      path: "/home",
      pageKey: "home",
    };

    const updatedRoute = updateRouteByField("errorMessage", "New Error", route);

    expect(updatedRoute).toEqual({
      id: "123",
      messages: {
        errorMessage: "New Error",
      },
      path: "/home",
      pageKey: "home",
    });
  });

  it("should return a new route object with the specified field added if route is not provided", () => {
    const updatedRoute = updateRouteByField("id", "123");

    expect(updatedRoute).toEqual({
      id: "123",
      messages: {
        errorMessage: "",
      },
      path: "",
      pageKey: "",
    });
  });
});
