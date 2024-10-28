import { FlowSubject } from '@equinor/fusion-observable';

import { createReducer } from './create-reducer';

import type { Actions } from './actions';
import { PortalState, PortalStateInitial } from '../types';

import { PortalConfigProvider } from '../provider';
import { handleFetchPortal, handleFetchAppsByContext, handleFetchApps } from './flows';

export const createState = (
	provider: PortalConfigProvider,
	initial?: PortalStateInitial
): FlowSubject<PortalState, Actions> => {
	const reducer = createReducer(initial);
	const state = new FlowSubject<PortalState, Actions>(reducer);
	state.addFlow(handleFetchPortal(provider));
	state.addFlow(handleFetchAppsByContext(provider));
	state.addFlow(handleFetchApps(provider));

	return state;
};
