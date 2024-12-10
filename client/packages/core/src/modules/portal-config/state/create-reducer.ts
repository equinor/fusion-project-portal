import { createReducer as makeReducer } from '@equinor/fusion-observable';

import { enableMapSet } from 'immer';

enableMapSet();

import { actions } from './actions';
import { PortalConfigState, PortalRequest, PortalState, PortalStateInitial } from '../types';

const portalMapper = (portalRequest: PortalRequest): PortalConfigState => ({
	id: portalRequest.id,
	icon: portalRequest.icon,
	name: portalRequest.name,
	shortName: portalRequest.shortName,
	subtext: portalRequest.subtext,
	contexts: portalRequest.contexts,
});

export const createReducer = (value: PortalStateInitial = {}) =>
	makeReducer({ ...value, status: new Set() } as PortalState, (builder) => {
		builder.addCase(actions.setPortalConfig, (state, action) => {
			state.req = action.payload;
			state.portal = portalMapper(action.payload);
			if (action.payload.configuration.router) {
				state.routes = JSON.parse(action.payload.configuration.router);
			}
			if (action.payload.configuration.extension) {
				state.extensions = JSON.parse(action.payload.configuration.extension);
			}
		});
		builder.addCase(actions.setAppKeys, (state, action) => {
			state.apps = action.payload;
		});
		builder.addCase(actions.clearAppKeys, (state, action) => {
			state.apps = [];
		});
	});

export default createReducer;
