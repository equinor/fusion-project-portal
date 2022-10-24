import { Phase } from '@equinor/portal-core';
import { storage } from '@equinor/portal-utils';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const storageKey = 'selectedPhase';

export const phaseStorage = {
  readPhase: () => storage.getItem(storageKey) as string | undefined,
  storePhase: (id: string | undefined) => storage.setItem(storageKey, id),
};

const phaseSubject = new BehaviorSubject<string | undefined>(
  phaseStorage.readPhase()
);

export const selectedPhase$ = phaseSubject.pipe(tap(phaseStorage.storePhase));

export const clearSelectedPhase = () => phaseSubject.next(undefined);
export const setActivePhase = (phase: Phase) => phaseSubject.next(phase.id);
