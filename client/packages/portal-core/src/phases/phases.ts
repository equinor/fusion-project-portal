import { Phase } from '@equinor/portal-core';
import { createObservableStorage } from '@equinor/portal-utils';
import { BehaviorSubject, of } from 'rxjs';
import { combineLatestWith, switchMap } from 'rxjs/operators';
import { phases as MockPhases } from '../mock/phases';

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

const phases = new BehaviorSubject<Phase[]>(MockPhases);
const phases$ = phases.asObservable();

const currentPhase$ = phases$.pipe(
  combineLatestWith(currentPhaseId$),
  switchMap(([phases, selected]) => of(phases.find((s) => s.id === selected)))
);

export const phaseController = {
  currentPhase$,
  phases$,
  clearSelectedPhase,
  setActivePhase,
};
