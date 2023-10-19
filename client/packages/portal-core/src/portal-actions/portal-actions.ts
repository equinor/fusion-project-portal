import { BehaviorSubject } from 'rxjs';
import { PortalAction, PortalActions } from './types';
import { actions } from './portal-actions-config';

const actions$ = new BehaviorSubject<PortalAction[]>([]);

const activeAction$ = new BehaviorSubject<PortalAction | undefined>(undefined);

function setActiveActionById(actionId: string) {
	const action = actions$.value.find((action: { actionId: string }) => action.actionId === actionId);
	action
		? activeAction$.next(action)
		: console.warn(`trying to open action not known to system with actionId: ${actionId}`);
}

function closeActiveAction() {
	activeAction$.next(undefined);
}
function configureActions(actions: PortalAction[]) {
	actions$.next(actions);
}

export const portalActions: PortalActions = {
	actions$,
	configureActions,
	activeAction$,
	setActiveActionById,
	closeActiveAction,
};

configureActions(actions);
