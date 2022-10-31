import { WorkSurfaceClient } from './client/client';
import { ModuleType } from '@equinor/fusion-framework-module';
import {
  EventModule,
  FrameworkEvent,
  FrameworkEventInit,
} from '@equinor/fusion-framework-module-event';
import { IWorkSurfaceModuleConfig } from './configurator';
import { WorkSurface } from './types';

/**
 * WARNING: this is an initial out cast.
 * api clients will most probably not be exposed in future!
 */
export interface IWorkSurfaceProvider {
  /** DANGER */
  readonly workSurfaceClient: WorkSurfaceClient;
}

export class WorkSurfaceProvider implements IWorkSurfaceProvider {
  #workSurfaceClient: WorkSurfaceClient;

  public get workSurfaceClient() {
    return this.#workSurfaceClient;
  }

  get currentContext(): WorkSurface | undefined {
    return this.#workSurfaceClient.currentWorkSurface;
  }

  set currentContext(context: WorkSurface | undefined) {
    this.#workSurfaceClient.setCurrentWorkSurface(context);
  }

  constructor(args: {
    config: IWorkSurfaceModuleConfig;
    event?: ModuleType<EventModule>;
  }) {
    const { config, event } = args;
    this.#workSurfaceClient = new WorkSurfaceClient(config.getWorkSurface);

    if (event) {
      /** this might be moved to client, to await prevention of event */
      this.#workSurfaceClient.currentWorkSurface$.subscribe((context) => {
        event.dispatchEvent('onCurrentWorkSurfaceChanged', {
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
    onCurrentWorkSurfaceChanged: FrameworkEvent<
      FrameworkEventInit<{
        context: WorkSurface | undefined;
      }>
    >;
  }
}
