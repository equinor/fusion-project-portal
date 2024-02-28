import { FlowSubject } from '@equinor/fusion-observable';

import { createReducer } from './create-reducer';

import type { Actions } from './actions';
import { PortalState, PortalStateInitial } from '../types';

import { PortalConfigProvider } from '../provider';
import { handleFetchPortal, handleFetchAppsByContext } from './flows';

export const createState = (
	value: PortalStateInitial,
	provider: PortalConfigProvider
): FlowSubject<PortalState, Actions> => {
	const reducer = createReducer(value);
	const state = new FlowSubject<PortalState, Actions>(reducer);
	state.addFlow(handleFetchPortal(provider));
	state.addFlow(handleFetchAppsByContext(provider));

	return state;
};
