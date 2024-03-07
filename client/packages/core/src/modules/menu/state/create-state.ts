import { Flow, FlowSubject } from '@equinor/fusion-observable';
import { storage } from '@portal/utils';
import { createReducer } from './create-reducer';

import { actions, type Actions } from './actions';

import { PortalMenuProvider, MenuState, MENU_KEY } from '../provider';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const createState = (value: MenuState, provider: PortalMenuProvider): FlowSubject<MenuState, Actions> => {
	const reducer = createReducer(value);
	const state = new FlowSubject<MenuState, Actions>(reducer);
	state.addFlow(myFlow(provider));
	return state;
};

export const myFlow =
	(provider: PortalMenuProvider): Flow<Actions, MenuState> =>
	(action$) =>
		action$.pipe(
			switchMap(() => {
				const state = provider.state;
				storage.setItem(MENU_KEY, state);
				return new Observable<Actions>((s) => s.next(actions.trackState(provider.state)));
			})
		);
