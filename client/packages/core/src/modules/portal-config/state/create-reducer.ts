import {
	actionBaseType,
	createReducer as makeReducer,
	isCompleteAction,
	isRequestAction,
} from '@equinor/fusion-observable';

import { enableMapSet } from 'immer';

enableMapSet();

import { actions } from './actions';
import { PortalState, PortalStateInitial } from '../types';

export const createReducer = (value: PortalStateInitial) =>
	makeReducer({ ...value, status: new Set() } as PortalState, (builder) =>
		builder
			.addCase(actions.setPortal, (state, action) => {
				state.portal = action.payload;
			}) /** mark status as loading type */
			.addMatcher(isRequestAction, (state, action) => {
				state.status.add(actionBaseType(action));
			})
			/** clear status type */
			.addMatcher(isCompleteAction, (state, action) => {
				state.status.delete(actionBaseType(action));
			})
	);

export default createReducer;
