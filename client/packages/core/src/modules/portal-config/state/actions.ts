import { ActionInstanceMap, ActionTypes, createAction, createAsyncAction } from '@equinor/fusion-observable';
import { Portal, PortalRequest } from '../types';
import { AppManifest } from '@equinor/fusion-framework-module-app';

const createActions = () => ({
	/** Portal loading */
	setPortal: createAction('set_portal', (portal: Portal, update?: boolean) => ({
		payload: portal,
		meta: {
			created: Date.now(),
			update,
		},
	})),
	fetchPortal: createAsyncAction(
		'fetch_portal',
		(payload: { portalId: string }, update?: boolean) => ({
			payload,
			meta: { update },
		}),
		(portal: Portal) => ({ payload: portal }),
		(error: unknown) => ({ payload: error })
	),
	fetchAppsByContextId: createAsyncAction(
		'fetch_portal',
		(payload: { portalId: string; contextId: string }, update?: boolean) => ({
			payload,
			meta: { update },
		}),
		(apps: AppManifest[]) => ({ payload: apps }),
		(error: unknown) => ({ payload: error })
	),
	setApps: createAction('set_apps', (apps: AppManifest[], update?: boolean) => ({
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
