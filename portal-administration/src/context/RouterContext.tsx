import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Route, Router } from "../types/router-config";
import { reducer } from "./reducers/router-reducer";
import { createRoute } from "./actions/router-actions";
import { mockRoutes } from "./mocs/routes";

export type RouterConfigContextState = {
  activeRoute?: Route;
  activeRouteControl?: Route;
} & Router;

export type RouterConfigContext = {
  setActiveRoute: (is?: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createNewRoute: (id?: string) => void;
  removeRoute: (id: string) => void;
  updateRoute: (route?: Route) => void;
  updateRoot: (pageKey: string) => void;
  hasChanges: boolean;
} & RouterConfigContextState;

const initialState = {
  root: {
    pageKey: "project-portal",
  },
  activeRoute: undefined,
  routes: mockRoutes,
} as RouterConfigContext;
const Context = createContext<RouterConfigContext>(initialState);

export const RouterConfigContextComponent = ({
  children,
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setActiveRoute = (id?: string) => {
    dispatch({ type: "SET_ACTIVE_ROUTE", payload: { id } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_ROUTE_BY_FIELD", payload: event.target });
  };

  const updateRoute = (route?: Route) => {
    dispatch({
      type: "UPDATE_ROUTE",
      payload: {
        route,
      },
    });
  };

  const hasChanges = useMemo(
    () => state.activeRoute !== state.activeRouteControl,
    [state]
  );

  const createNewRoute = (id?: string) => {
    dispatch({
      type: "CREATE_ROUTE",
      payload: {
        id,
        route: createRoute(),
      },
    });
  };
  const removeRoute = (id: string) => {
    dispatch({
      type: "REMOVE_ROUTE",
      payload: {
        id,
      },
    });
  };
  const updateRoot = (pageKey: string) => {
    dispatch({
      type: "UPDATE_ROOT",
      payload: {
        pageKey,
      },
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        hasChanges,
        setActiveRoute,
        createNewRoute,
        updateRoute,
        removeRoute,
        handleChange,
        updateRoot,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRouterConfigContext = () => {
  return useContext(Context);
};
