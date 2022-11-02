import { BehaviorSubject, skip } from 'rxjs';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

import { WorkSurface } from '../types';
import {
  loadCurrentWorkSurface,
  loadWorkSurfaces,
  storeCurrentWorkSurface,
  storeWorkSurfaces,
} from './persist';

export type WorkSurfaceClientOptions = {
  client: IHttpClient;
};

export type WorkSurfaceClient = ReturnType<typeof createWorkSurfaceClient>;

export function createWorkSurfaceClient({ client }: WorkSurfaceClientOptions) {
  const previousWorkSurface = loadCurrentWorkSurface();

  const isLoading$ = new BehaviorSubject(true);
  const error$ = new BehaviorSubject<unknown>(null);
  const currentWorkSurface$ = new BehaviorSubject<WorkSurface | undefined>(
    undefined
  );

  currentWorkSurface$.pipe(skip(1)).subscribe(storeCurrentWorkSurface);

  const workSurfaces$ = new BehaviorSubject<WorkSurface[] | undefined>(
    undefined
  );

  const init = async () => {
    isLoading$.next(true);
    try {
      const res = await client.fetch('/api/work-surfaces');
      if (!res.ok) throw res;
      const surfaces: WorkSurface[] = await res.json();
      workSurfaces$.next(
        surfaces.map((s) => ({
          ...s,
          name: s.name.toLowerCase().replace(' ', '-'),
        }))
      );

      const prev = surfaces.find((s) => s.id === previousWorkSurface);
      if (prev) {
        currentWorkSurface$.next({
          ...prev,
          name: prev.name.toLowerCase().replace(' ', '-'),
        });
      }
      storeWorkSurfaces(surfaces);
    } catch (e) {
      console.error(e);
      error$.next(e);
    } finally {
      isLoading$.next(false);
    }

    return workSurfaces$.value;
  };

  return {
    isLoading$: isLoading$.asObservable(),
    error$: error$.asObservable(),
    workSurfaces$: workSurfaces$.asObservable(),
    getWorkSurfaces: () => workSurfaces$.getValue(),
    currentWorkSurface$: currentWorkSurface$.asObservable(),
    getCurrentWorkSurface: () => currentWorkSurface$.getValue(),
    init,
    setCurrentWorkSurface: (item?: WorkSurface) =>
      currentWorkSurface$.next(item),
    resolveWorkSurface: (guidOrName: string) =>
      workSurfaces$.value?.find(
        (s) => s.id === guidOrName || s.name === guidOrName
      ),
  };
}

export default createWorkSurfaceClient;
