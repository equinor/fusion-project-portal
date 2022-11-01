import { ModuleType } from '@equinor/fusion-framework-module';
import {
  EventModule,
  FrameworkEvent,
  FrameworkEventInit,
} from '@equinor/fusion-framework-module-event';
import { Observable } from 'rxjs';
import  { createWorkSurfaceClient, WorkSurfaceClient } from './client/workSurfaceClient';
import { IWorkSurfaceModuleConfig } from './configurator';
import { WorkSurface } from './types';

/**
 * WARNING: this is an initial out cast.
 * api clients will most probably not be exposed in future!
 */
export interface IWorkSurfaceProvider {
  /** DANGER */
  readonly client: WorkSurfaceClient;
}

export class WorkSurfaceProvider implements IWorkSurfaceProvider {
  #client: WorkSurfaceClient;

  public get client() {
    return this.#client;
  }

  get currentWorkSurface(): WorkSurface | undefined {
    return this.#client.getCurrentWorkSurface();
  }
  get currentWorkSurface$(): Observable<WorkSurface | undefined> {
    return this.#client.currentWorkSurface$;
  }

  async setCurrentWorkSurface(itemOrId?: string | WorkSurface) {
    typeof itemOrId === 'string'
      ? this.#client.setCurrentWorkSurface(
          await this.#client.resolveWorkSurface(itemOrId)
        )
      : this.#client.setCurrentWorkSurface(itemOrId);
  }

  set currentWorkSurface(context: WorkSurface | undefined) {
    this.#client.setCurrentWorkSurface(context);
  }

  resolveWorkSurface = (id: string) => this.#client.resolveWorkSurface(id);

  get workSurfaces() {
    return this.#client.getWorkSurfaces();
  }
  get workSurfaces$() {
    return this.#client.workSurfaces$;
  }

  constructor(args: {
    config: IWorkSurfaceModuleConfig;
    event?: ModuleType<EventModule>;
  }) {
    const { config, event } = args;

    this.#client = createWorkSurfaceClient({client: config.client, event});

    if (event) {
      /** this might be moved to client, to await prevention of event */
      this.#client.currentWorkSurface$.subscribe((context) => {
        event.dispatchEvent('onCurrentWorkSurfaceChange', {
          canBubble: true,
          detail: { context },
        });
      });
    }
  }
}

export default WorkSurfaceProvider;

declare module '@equinor/fusion-framework-module-event' {
  interface FrameworkEventMap {
    onCurrentWorkSurfaceChange: FrameworkEvent<
      FrameworkEventInit<{
        context: WorkSurface | undefined;
      }>
    >;
  }
}
