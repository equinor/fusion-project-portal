import { createObservableStorage } from '@equinor/portal-utils';
import { map, switchMap } from 'rxjs';
import { portalActions } from './portal-actions';
import { actions } from './portal-actions-config';
import { PortalTopBarActions } from './types';
const TOP_BAR_ACTIONS_STORAGE_KEY = 'topBarActions';

export const topBarActionsIds$ = createObservableStorage<string[]>(
  TOP_BAR_ACTIONS_STORAGE_KEY,
  actions.map((action) => action.actionId) || []
);

export const topBarActions$ = portalActions.actions$.pipe(
  switchMap((actions) =>
    topBarActionsIds$.obs$.pipe(
      map((ids) => actions.filter((action) => ids.includes(action.actionId)))
    )
  )
);

function toggleTopBarAllActions() {
  topBarActionsIds$.next(
    topBarActionsIds$.subject$.value.length <
      portalActions.actions$.value.length
      ? portalActions.actions$.value.map((action) => action.actionId)
      : portalActions.actions$.value
          .filter((action) => action.topParOnly)
          .map((action) => action.actionId) || []
  );
}

function toggleActionById(actionId: string) {
  const topBarActionsIds = topBarActionsIds$.subject$.value;
  topBarActionsIds$.next(
    topBarActionsIds.includes(actionId)
      ? topBarActionsIds.filter(
          (topBarActionsId) => topBarActionsId !== actionId
        )
      : [...topBarActionsIds, actionId]
  );
}

export const portalTopBarActions: PortalTopBarActions = {
  topBarActionsIds$,
  topBarActions$,
  setActiveActionById: portalActions.setActiveActionById,
  toggleTopBarAllActions,
  toggleActionById,
};
