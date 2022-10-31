import { Observable, BehaviorSubject } from 'rxjs';

import { WorkSurface } from '../types';

export type WorkSurfaceOptions = {
  initial?: WorkSurface;
};

export class WorkSurfaceClient extends Observable<WorkSurface> {
  /** might change to reactive state, for comparing state with reducer */
  #currentWorkSurface$: BehaviorSubject<WorkSurface | undefined>;

  get currentWorkSurface(): WorkSurface | undefined {
    return this.#currentWorkSurface$.value;
  }

  get currentWorkSurface$(): Observable<WorkSurface | undefined> {
    return this.#currentWorkSurface$.asObservable();
  }

  constructor(options: WorkSurfaceOptions) {
    super((observer) => this.#currentWorkSurface$.subscribe(observer));
    this.#currentWorkSurface$ = new BehaviorSubject<WorkSurface | undefined>(
      options.initial
    );
  }

  public setCurrentWorkSurface(item: WorkSurface | undefined) {
    this.#currentWorkSurface$.next(item);
  }
}

export default WorkSurfaceClient;
