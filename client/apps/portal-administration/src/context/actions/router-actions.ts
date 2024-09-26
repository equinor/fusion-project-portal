import { uuidv4 } from 'uuidv7';
import { Route, Router } from '../../types/router-config';

export type Actions =
	| {
			type: 'SET_ACTIVE_ROUTE';
			payload: {
				id?: string;
			};
	  }
	| {
			type: 'TOGGLE_ROOT';
	  }
	| {
			type: 'UPDATE_ROUTER';
			payload: Router;
	  }
	| {
			type: 'TOGGLE_CONFIG';
	  }
	| {
			type: 'UPDATE_ROOT';
			payload: {
				pageKey: string;
			};
	  }
	| {
			type: 'UPDATE_ROUTE_BY_FIELD';
			payload: {
				id: string;
				value: string;
			};
	  }
	| {
			type: 'UPDATE_ROUTE';
			payload: {
				route?: Route;
			};
	  }
	| {
			type: 'CREATE_ROUTE';
			payload: {
				id?: string;
				route: Route;
			};
	  }
	| {
			type: 'REMOVE_ROUTE';
			payload: {
				id: string;
			};
	  };

export const findRouteById = (routes?: Route[], id?: string): Route | undefined => {
	const result = { route: undefined } as { route: Route | undefined };

	routes?.forEach((route) => {
		if (route.id === id) {
			result.route = route;
		} else if (!result.route) {
			const data = findRouteById(route.children, id);
			if (data) {
				result.route = data;
			}
		}
	});

	return result.route;
};

export const addRoute = (newRoute: Route, routes?: Route[], id?: string) => {
	if (!routes) return;

	if (id) {
		return routes.reduce((acc, route, i) => {
			if (route.id === id) {
				const newRoutes = addRoute(newRoute, route.children || []);
				if (newRoutes) {
					route.children = [...newRoutes];
				}
			} else if (route.children) {
				const newRoutes = addRoute(newRoute, route.children, id);
				if (newRoutes) {
					route.children = [...newRoutes];
				}
			}

			acc[i] = route;
			return acc;
		}, routes);
	}

	return [...routes, newRoute];
};
export const updateRoute = (newRoute?: Route, routes?: Route[]) => {
	if (!routes) return [];

	if (!newRoute) return routes;
	return [
		...routes.reduce((acc, route, i) => {
			if (route.id === newRoute.id) {
				acc[i] = newRoute;
			} else {
				const newRoutes = updateRoute(newRoute, route.children);
				if (newRoutes) {
					route.children = [...newRoutes];
				}
			}

			return acc;
		}, routes),
	];
};

export const removeRoute = (id: string, routes?: Route[]) => {
	if (!routes) return;

	const result = routes.reduce((acc, route, i) => {
		if (route.id === id) {
			return [...acc.filter((route) => route.id !== id)];
		} else if (route.children?.length && acc[i]) {
			acc[i].children = removeRoute(id, route.children);
		}

		return acc;
	}, routes);

	return result;
};

export const createRoute = (): Route => {
	return {
		id: uuidv4(),
		messages: {
			errorMessage: '',
		},
		description: '',
		path: '',
		pageKey: '',
	};
};

export const updateRouteByField = (id: string, value: string, route?: Route): Route => {
	if (!route) {
		return {
			id: '',
			messages: {
				errorMessage: '',
			},
			path: '',
			description: '',
			pageKey: '',
			[id]: value,
		};
	}
	if (id.toLowerCase().includes('message')) {
		return {
			...route,
			messages: { ...route.messages, [id]: value },
		};
	}
	return { ...route, [id]: value };
};
