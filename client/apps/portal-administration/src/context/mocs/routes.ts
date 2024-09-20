import { uuidv4 } from "uuidv7";

export const mockRoutes = [
  {
    id: uuidv4(),
    path: "project/*",
    pageKey: "project",
    messages: {
      errorMessage: "Fail to load project page",
    },
    children: [
      {
        id: uuidv4(),
        messages: {
          errorMessage: "Fail to load project page",
        },
        path: ":contextId",
        pageKey: "project",
      },
    ],
  },
  {
    id: uuidv4(),
    path: "facility/*",
    pageKey: "facility",
    messages: {
      errorMessage: "Fail to load facility page",
    },
    children: [
      {
        id: uuidv4(),
        messages: {
          errorMessage: "Fail to load facility page",
        },
        path: ":contextId",
        pageKey: "facility",
      },
    ],
  },
];
