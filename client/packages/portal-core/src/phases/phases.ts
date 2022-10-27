import { Phase } from '@equinor/portal-core';
import { createObservableStorage } from '@equinor/portal-utils';
import { from, Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
async function getPhases() {
  return await (
    await fetch(
      'https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces'
    )
  ).json();
}

//Key the selected phase is stored under
const storageKey = 'selectedPhase';

const { next, obs$, subject$ } = createObservableStorage<string | undefined>(
  storageKey,
  undefined
);

obs$.subscribe();

const currentPhaseId$ = obs$;
/**
 * Clear selected phase
 *
 * Sends user back to homepage
 */
const clearSelectedPhase = () => next(undefined);
/**
 * Set active phase
 *
 * Used for navigating a user to a certain phase homepage
 */
const setActivePhase = (phase: Phase) => next(phase.id);

const phases$: Observable<Phase[]> = from(getPhases());

const currentPhase$ = phases$.pipe(
  combineLatestWith(currentPhaseId$),
  map(([phases, selected]) => phases.find((s) => s.id === selected))
);

const getCurrentPhase = () => subject$.value;

export const phaseController = {
  currentPhase$,
  getCurrentPhase,
  phases$,
  clearSelectedPhase,
  setActivePhase,
};
