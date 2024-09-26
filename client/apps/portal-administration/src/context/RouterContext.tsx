import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Route, Router } from '../types/router-config';
import { reducer } from './reducers/router-reducer';
import { addRoute, createRoute, removeRoute } from './actions/router-actions';
import { mockRoutes } from './mocs/routes';
import { usePortalContext } from './PortalContext';
import { useGetPortalConfiguration, useUpdatePortalConfig } from '../hooks/use-portal-config-query';

export type RouterConfigContextState = {
	activeRoute?: Route;
	activeRouteControl?: Route;
	rootActive: boolean;
	configActive: boolean;
} & Router;

export type RouterConfigContext = {
	setActiveRoute: (is?: string) => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	createNewRoute: (id?: string) => void;
	removeRouteById: (id: string) => void;
	updateRoute: (route?: Route) => void;
	updateRoot: (pageKey: string) => void;
	toggleRoot: VoidFunction;
	seeConfig: VoidFunction;
} & RouterConfigContextState;

const initialState = {
	root: {
		pageKey: '',
		messages: {
			errorMessage: '',
		},
	},
	activeRoute: undefined,
	routes: [] as Route[],
	rootActive: true,
	configActive: false,
} as RouterConfigContext;

const Context = createContext<RouterConfigContext>(initialState);

export const RouterConfigContextComponent = ({ children }: PropsWithChildren) => {
	const { activePortalId } = usePortalContext();
	const [state, dispatch] = useReducer(reducer, initialState);

	const { data } = useGetPortalConfiguration(activePortalId);
	const { mutate: updatePortalConfig } = useUpdatePortalConfig();
	useEffect(() => {
		if (data) {
			updateRouter(data.router);
		}
	}, [data]);

	const setActiveRoute = (id?: string) => {
		dispatch({ type: 'SET_ACTIVE_ROUTE', payload: { id } });
	};
	const updateRouter = (router: Router) => {
		dispatch({ type: 'UPDATE_ROUTER', payload: router });
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'UPDATE_ROUTE_BY_FIELD', payload: event.target });
	};

	const toggleRoot = () => {
		dispatch({ type: 'TOGGLE_ROOT' });
	};

	const seeConfig = () => {
		dispatch({ type: 'TOGGLE_CONFIG' });
	};

	const updateRoute = (route?: Route) => {
		dispatch({
			type: 'UPDATE_ROUTE',
			payload: {
				route,
			},
		});
	};

	const createNewRoute = (id?: string) => {
		const route = createRoute();
		dispatch({
			type: 'CREATE_ROUTE',
			payload: {
				id,
				route,
			},
		});
	};
	const removeRouteById = (id: string) => {
		dispatch({
			type: 'REMOVE_ROUTE',
			payload: {
				id,
			},
		});
		if (activePortalId && state.routes && state.root) {
			updatePortalConfig({
				id: activePortalId,
				router: { root: state.root, routes: removeRoute(id, state.routes) || [] },
			});
		}
	};
	const updateRoot = (pageKey: string) => {
		dispatch({
			type: 'UPDATE_ROOT',
			payload: {
				pageKey,
			},
		});
	};

	return (
		<Context.Provider
			value={{
				...state,
				setActiveRoute,
				createNewRoute,
				updateRoute,
				removeRouteById,
				handleChange,
				updateRoot,
				toggleRoot,
				seeConfig,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useRouterConfigContext = () => {
	return useContext(Context);
};
