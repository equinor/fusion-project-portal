/**
 * # Application Loader #
 *
 *  - loadApp
 *  - setElement and hol a reference to dom element
 *  - Verify that dom element exist.
 *  - Run application
 *  - application teardown on application switch.
 *  - validateApp handle error
 *  - loadAppMetadata
 *  - loading feedback
 */

export class ModuleLoaderController<TModules, TProps> {
  private _module:
    | ((
        element: HTMLDivElement,
        modules?: TModules,
        props?: TProps
      ) => () => void)
    | undefined;

  private _teardown: (() => void) | undefined;

  private _modulePathProvider: (moduleId: string) => Promise<string>;

  constructor(modulePathProvider: (moduleId: string) => Promise<string>) {
    this._modulePathProvider = modulePathProvider;
  }

  async loadModule(
    moduleId: string,
    element: HTMLDivElement,
    modules?: TModules,
    props?: TProps
  ) {
    try {
      await this._loadModuleByModulePath(
        await this._modulePathProvider(moduleId)
      );

      this._runModule(element, modules, props);
    } catch (error) {
      console.error(error);
      throw new Error('Could not load application');
    }
    return () => this._runModule(element, modules);
  }

  teardownModule() {
    if (this._teardown) {
      this._teardown();
    }

    this.clearModule();
  }

  clearModule() {
    this._module = undefined;
    this._teardown = undefined;
  }

  private _runModule(
    element: HTMLDivElement,
    modules?: TModules,
    props?: TProps
  ) {
    if (element && this._module) {
      this._teardown = this._module(element, modules, props);
    }
    this._teardown = undefined;
  }

  private async _loadModuleByModulePath(modulePath: string) {
    const { render, default: moduleRender } = await import(modulePath);
    if (typeof render === 'function') {
      this._module = render;
    } else if (typeof moduleRender === 'function') {
      this._module = moduleRender;
    } else {
      console.warn('This is not a valid fusion application');
    }
  }
}
