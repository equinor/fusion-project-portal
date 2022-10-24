import { Phase } from '@equinor/portal-core';
import { storage } from '@equinor/portal-utils';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

//Key the selected phase is stored under
const storageKey = 'selectedPhase';

//Interface to read and save phase from local storage
export const phaseStorage = {
  readPhase: () => storage.getItem(storageKey) as string | undefined,
  storePhase: (id: string | undefined) => storage.setItem(storageKey, id),
};

const phaseSubject = new BehaviorSubject<string | undefined>(
  phaseStorage.readPhase()
);

export const selectedPhase$ = phaseSubject.pipe(tap(phaseStorage.storePhase));

/**
 * Clear selected phase
 *
 * Sends user back to homepage
 */
export const clearSelectedPhase = () => phaseSubject.next(undefined);

/**
 * Set active phase
 *
 * Used for navigating a user to a certain phase homepage
 */
export const setActivePhase = (phase: Phase) => phaseSubject.next(phase.id);
