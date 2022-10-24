import { Phase } from '@equinor/portal-core';
import { storage } from '@equinor/portal-utils';
import { BehaviorSubject, of } from 'rxjs';
import { combineLatestWith, switchMap, tap } from 'rxjs/operators';
import { phases as MockPhases } from '../mock/phases';

//Key the selected phase is stored under
const storageKey = 'selectedPhase';

//Interface to read and save phase from local storage
const phaseStorage = {
  readPhase: () => storage.getItem(storageKey) as string | undefined,
  storePhase: (id: string | undefined) => storage.setItem(storageKey, id),
};

const phaseSubject = new BehaviorSubject<string | undefined>(
  phaseStorage.readPhase()
);

const currentPhaseId$ = phaseSubject.pipe(tap(phaseStorage.storePhase));

/**
 * Clear selected phase
 *
 * Sends user back to homepage
 */
const clearSelectedPhase = () => phaseSubject.next(undefined);

/**
 * Set active phase
 *
 * Used for navigating a user to a certain phase homepage
 */
const setActivePhase = (phase: Phase) => phaseSubject.next(phase.id);

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
