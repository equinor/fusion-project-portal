import { ActionInstanceMap, ActionTypes, createAction, createAsyncAction } from '@equinor/fusion-observable';
import { PortalRequest } from '../types';

const createActions = () => ({
	setPortalConfig: createAction('set_portal', (portal: PortalRequest, update?: boolean) => ({
		payload: portal,
		meta: {
			created: Date.now(),
			update,
		},
	})),
	fetchPortalConfig: createAsyncAction(
		'fetch_portal',
		(payload: { portalId: string }, update?: boolean) => ({
			payload,
			meta: { update },
		}),
		(portal: PortalRequest) => ({ payload: portal }),
		(error: unknown) => ({ payload: error })
	),
	fetchAppKeysByContextId: createAsyncAction(
		'fetch_apps_by_context',
		(payload: { contextId: string }, update?: boolean) => ({
			payload,
			meta: { update },
		}),
		(apps: string[]) => ({ payload: apps }),
		(error: unknown) => ({ payload: error })
	),
	fetchAppKeys: createAsyncAction(
		'fetch_apps',
		(update?: boolean) => ({
			payload: null,
			meta: { update },
		}),
		(apps: string[]) => ({ payload: apps }),
		(error: unknown) => ({ payload: error })
	),
	clearAppKeys: createAsyncAction(
		'clear_apps',
		(update?: boolean) => ({
			payload: null,
			meta: { update },
		}),
		(apps: string[]) => ({ payload: apps })
	),
	setAppKeys: createAction('set_apps', (apps: string[], update?: boolean) => ({
		payload: apps,
		meta: {
			created: Date.now(),
			update,
		},
	})),
});

export const actions = createActions();

export type ActionBuilder = ReturnType<typeof createActions>;

export type ActionMap = ActionInstanceMap<ActionBuilder>;

export type Actions = ActionTypes<typeof actions>;
