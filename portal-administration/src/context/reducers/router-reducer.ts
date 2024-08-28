import { uuidv4 } from "uuidv7";
import { RouterConfigContextState } from "../RouterContext";
import {
  Actions,
  findRouteById,
  addRoute,
  updateRouteByField,
  updateRoute,
  removeRoute,
} from "../actions/router-actions";

export const reducer = (state: RouterConfigContextState, action: Actions) => {
  switch (action.type) {
    case "UPDATE_ROOT":
      return {
        ...state,
        root: {
          pageKey: action.payload.pageKey,
        },
      };
    case "SET_ACTIVE_ROUTE":
      const activeRoute = findRouteById(state.routes, action.payload?.id);

      return {
        ...state,
        activeRoute,
        activeRouteControl: activeRoute,
      };
    case "CREATE_ROUTE":
      const newRoute =
        state.activeRoute?.id !== ""
          ? action.payload.route
          : { ...state.activeRoute, id: uuidv4() };
      return {
        ...state,
        routes: addRoute(newRoute, state.routes, action.payload.id) || [],
        activeRoute: newRoute,
      };
    case "REMOVE_ROUTE":
      return {
        ...state,
        routes: removeRoute(action.payload.id, state.routes) || [],
      };
    case "UPDATE_ROUTE_BY_FIELD":
      return {
        ...state,
        activeRoute: updateRouteByField(
          action.payload.id,
          action.payload.value,
          state.activeRoute
        ),
      };
    case "UPDATE_ROUTE":
      const routes = updateRoute(action.payload.route, state.routes);
      return {
        ...state,
        routes,
      };
    default:
      return state;
  }
};
