import { createObservableStorage } from '@equinor/portal-utils';
import { combineLatestWith, map } from 'rxjs';
import { portalActions } from './portal-actions';
import { actions } from './portal-actions-config';
import { PortalTopBarActions } from './types';
const TOP_BAR_ACTIONS_STORAGE_KEY = 'topBarActions';

export const topBarActionsIds$ = createObservableStorage<string[]>(
  TOP_BAR_ACTIONS_STORAGE_KEY,
  actions.map((action) => action.actionId) || []
);

export const topBarActions$ = portalActions.actions$.pipe(
  combineLatestWith(topBarActionsIds$.obs$),
  map(([actions, ids]) =>
    actions.filter((action) => ids.includes(action.actionId))
  )
);

/**
 * To toggle top bar actions we firs have to check if our selection is less than all the portal actions this to determine if we want
 * to select all or deselect al, if one item is selected we should  select all, if all are selected then whe should deselect all.
 * `filter((action) => action.topParOnly)` will alow items specified to always show  in top bar, to be unchanged.
 */
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
