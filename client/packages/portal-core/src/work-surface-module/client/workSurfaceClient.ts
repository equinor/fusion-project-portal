import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { IEventModuleProvider } from '@equinor/fusion-framework-module-event';

import { WorkSurface } from '../types';
import {
  loadWorkSurfaces,
} from './persist';

export type WorkSurfaceClientOptions = {
  client: IHttpClient;
  event: IEventModuleProvider | undefined;
};

export type WorkSurfaceClient = ReturnType<typeof createWorkSurfaceClient>;


export function createWorkSurfaceClient({client, event}: WorkSurfaceClientOptions){

    const isLoading$ = new BehaviorSubject(true);
    const error$ = new BehaviorSubject<unknown>(null);
    const currentWorkSurface$ = new BehaviorSubject<WorkSurface | undefined>(undefined);
    const workSurfaces$ = new BehaviorSubject<WorkSurface[] | undefined>(undefined);


    const init = async () => {
      throw new Error("")
      workSurfaces$.next(loadWorkSurfaces());
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
      } catch (e) {
        console.error(e)
        error$.next(e);
      } finally {
        isLoading$.next(false);
      }
      return lastValueFrom(workSurfaces$)
    }

  return { 
    isLoading$: isLoading$.asObservable(),
    error$: error$.asObservable(),
    workSurfaces$: workSurfaces$.asObservable(),
    getWorkSurfaces: () => workSurfaces$.getValue(),
    currentWorkSurface$: currentWorkSurface$.asObservable(),
    getCurrentWorkSurface: () => currentWorkSurface$.getValue(),
    init,
    setCurrentWorkSurface: (item?: WorkSurface) => currentWorkSurface$.next(item),
    resolveWorkSurface: (guidOrName: string) => workSurfaces$.value?.find(s => s.id === guidOrName || s.name === guidOrName) 
  }
}

export default createWorkSurfaceClient;
