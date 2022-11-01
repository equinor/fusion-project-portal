import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

import { WorkSurface } from '../types';

export type WorkSurfaceClientOptions = {
  client: IHttpClient;
};

export class WorkSurfaceClient extends Observable<WorkSurface> {
  #client: IHttpClient;

  #currentWorkSurface$ = new BehaviorSubject<WorkSurface | undefined>(
    undefined
  );
  #workSurfaces$ = new BehaviorSubject<WorkSurface[] | undefined>(undefined);

  get currentWorkSurface(): WorkSurface | undefined {
    return this.#currentWorkSurface$.value;
  }

  get currentWorkSurface$(): Observable<WorkSurface | undefined> {
    return this.#currentWorkSurface$.asObservable();
  }

  get workSurfaces(): WorkSurface[] | undefined {
    return this.#workSurfaces$.value;
  }

  get workSurfaces$(): Observable<WorkSurface[] | undefined> {
    return this.#workSurfaces$.asObservable();
  }

  constructor(options: WorkSurfaceClientOptions) {
    super((observer) => this.#currentWorkSurface$.subscribe(observer));

    this.#client = options.client;

    this.#initWorkSurfaces();
  }

  async #initWorkSurfaces() {
    const rest = await this.#client.fetch('/api/work-surfaces');
    const surfaces: WorkSurface[] = await rest.json();
    this.#workSurfaces$.next(
      surfaces.map((s) => ({
        ...s,
        name: s.name.toLowerCase().replace(' ', '-'),
      }))
    );
  }

  public setCurrentWorkSurface(item?: WorkSurface) {
    this.#currentWorkSurface$.next(item);
  }

  public async resolveWorkSurface$(
    id: string
  ): Promise<WorkSurface | undefined> {
    console.log(id, this.workSurfaces);

    return this.workSurfaces?.find((s) => s.id === id);
  }
}

export default WorkSurfaceClient;
