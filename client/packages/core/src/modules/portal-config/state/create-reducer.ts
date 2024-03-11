import { createReducer as makeReducer } from '@equinor/fusion-observable';

import { enableMapSet } from 'immer';

enableMapSet();

import { actions } from './actions';
import { Portal, PortalRequest, PortalState, PortalStateInitial } from '../types';

const portalMapper = (portalRequest: PortalRequest): Portal => ({
	id: portalRequest.id,
	icon: portalRequest.icon,
	name: portalRequest.name,
	shortName: portalRequest.shortName,
	subtext: portalRequest.subtext,
	contexts: portalRequest.contexts,
});

export const createReducer = (value: PortalStateInitial) =>
	makeReducer({ ...value, status: new Set() } as PortalState, (builder) => {
		builder.addCase(actions.setPortal, (state, action) => {
			state.portal = portalMapper(action.payload);
			state.apps = action.payload.apps;
			if (action.payload.routes) {
				state.routes = action.payload.routes;
			}
			if (action.payload.extensions) {
				state.extensions = action.payload.extensions;
			}
		});
		builder.addCase(actions.setApps, (state, action) => {
			state.apps = action.payload;
		});
	});

export default createReducer;
