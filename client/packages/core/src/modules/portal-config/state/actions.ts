import { ActionInstanceMap, ActionTypes, createAction, createAsyncAction } from '@equinor/fusion-observable';
import { Portal } from '../types';

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
});

export const actions = createActions();

export type ActionBuilder = ReturnType<typeof createActions>;

export type ActionMap = ActionInstanceMap<ActionBuilder>;

export type Actions = ActionTypes<typeof actions>;
