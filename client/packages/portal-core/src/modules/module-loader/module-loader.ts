/**
 * AppLoaderModule
 * - Hold a reference to dom element.
 * - Verify that dom element exist.
 * - Load application.
 * - Verify application.
 * - Run application.
 * - application teardown on application switch.
 * - Handle errors.
 * - application cache ?
 *  loading feedback
 *
 */

export class ModuleLoaderService<TModules> {
  private _module:
    | ((element: HTMLDivElement, modules?: TModules) => () => void)
    | undefined = undefined;

  async loadModule(
    moduleId: string,
    element: HTMLDivElement,
    modules?: TModules
  ) {
    try {
      await this.loadModuleById(moduleId);

      this.runModule(element, modules);
    } catch (error) {
      console.error(error);
      throw new Error('Could not load application');
    }
    return () => this.runModule(element, modules);
  }

  clearModule() {
    this._module = undefined;
  }

  private runModule(element: HTMLDivElement, modules?: TModules) {
    if (element && this._module) {
      return this._module(element, modules);
    }
    return () => {
      console.warn('noting to tear down!');
    };
  }

  private async loadModuleById(moduleId: string) {
    // if ()
    // const { render, default: moduleRender } = await import(
    //   await this.getModulePath(moduleId)
    // );
    // if (typeof render === 'function') {
    //   this._module = render;
    // } else if (typeof moduleRender === 'function') {
    //   this._module = moduleRender;
    // } else {
    //   console.warn('This is not a valid fusion application');
    // }
  }

  private async getModulePath(moduleId: string) {
    // get this form backend
    return `@equinor/${moduleId}`;
  }
}
