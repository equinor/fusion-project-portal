import { Phase } from '@equinor/portal-core';
import { createObservableStorage } from '@equinor/portal-utils';
import { from, Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';

async function getWorkSurfaces() {
  return await (
    await fetch(
      'https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces'
    )
  ).json();
}

//Key the selected phase is stored under
const storageKey = 'work-surface';

const { next, obs$, subject$ } = createObservableStorage<string | undefined>(
  storageKey,
  undefined
);

obs$.subscribe();

const currentWsId$ = obs$;
/**
 * Clear selected phase
 *
 * Sends user back to homepage
 */
const clearWorkSurface = () => next(undefined);
/**
 * Set active phase
 *
 * Used for navigating a user to a certain phase homepage
 */
const setWorkSurface = (workSurface: Phase) => next(workSurface.id);

const workSurfaces$: Observable<Phase[]> = from(getWorkSurfaces());

const currentWorkSurface$ = workSurfaces$.pipe(
  combineLatestWith(currentWsId$),
  map(([surfaces, selected]) => surfaces.find((s) => s.id === selected))
);

const getCurrentWorkSurfaceId = () => subject$.value;

export const workSurfaceController = {
  currentWorkSurface$,
  getCurrentWorkSurfaceId,
  workSurfaces$,
  clearWorkSurface,
  setWorkSurface,
};
