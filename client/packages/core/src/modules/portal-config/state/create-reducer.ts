import { createReducer as makeReducer } from '@equinor/fusion-observable';

import { enableMapSet } from 'immer';

enableMapSet();

import { actions } from './actions';
import { PortalState, PortalStateInitial } from '../types';

export const createReducer = (value: PortalStateInitial) =>
	makeReducer({ ...value, status: new Set() } as PortalState, (builder) => {
		builder.addCase(actions.setPortal, (state, action) => {
			state.portal = action.payload;
			state.apps = action.payload.apps;
		});

		builder.addCase(actions.setPortalRoutes, (state, action) => {
			state.routes = action.payload;
		});
		return builder;
	});

export default createReducer;
