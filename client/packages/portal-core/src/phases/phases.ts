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

const { next, obs$ } = createObservableStorage<string | undefined>(
  storageKey,
  undefined
);
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

export const phaseController = {
  currentPhase$,
  phases$,
  clearSelectedPhase,
  setActivePhase,
};
