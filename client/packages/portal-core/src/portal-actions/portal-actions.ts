import { BehaviorSubject } from 'rxjs';
import { actions } from './portal-actions-config';
import { PortalAction, PortalActions } from './types';

const actions$ = new BehaviorSubject<PortalAction[]>(actions);

const activeAction$ = new BehaviorSubject<PortalAction | undefined>(undefined);

function setActiveActionById(actionId: string) {
  activeAction$.next(
    actions$.value.find(
      (action: { actionId: string }) => action.actionId === actionId
    )
  );
}

function closeActiveAction() {
  activeAction$.next(undefined);
}

export const portalActions: PortalActions = {
  actions$,
  activeAction$,
  setActiveActionById,
  closeActiveAction,
};
