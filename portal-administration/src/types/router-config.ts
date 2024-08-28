export type RootRoute = {
  pageKey: string;
};

export type Router = {
  root: RootRoute;
  routes: Route[];
};

export type Route = {
  id: string;
  description?: string;
  path: string;
  pageKey: string;
  messages: {
    errorMessage: string;
    noPageMessage?: string;
  };
  children?: Route[];
};
