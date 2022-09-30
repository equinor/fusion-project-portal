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

export class AppLoaderService<TModules> {
  private _cache: Record<
    string,
    (element: HTMLDivElement, modules?: TModules) => () => void
  > = {};

  async loadApplication(
    applicationId: string,
    element: HTMLDivElement,
    modules?: TModules
  ) {
    try {
      if (!this._cache[applicationId]) {
        await this.loadApplicationById(applicationId);
      }
      this.runApplication(applicationId, element, modules);
    } catch (error) {
      console.error(error);
      throw new Error('Could not load application');
    }
    return () => this.runApplication(applicationId, element, modules);
  }

  clearCache() {
    this._cache = {};
  }

  private runApplication(
    applicationId: string,
    element: HTMLDivElement,
    modules?: TModules
  ) {
    if (element) {
      // Check if application is loaded.
      return this._cache[applicationId](element, modules);
    }
    return () => {
      console.warn('noting to tear down!');
    };
  }

  private async loadApplicationById(applicationId: string) {
    const { render } = await import(this.getAppPath(applicationId));
    if (typeof render !== 'function') {
      console.warn('This is not a valid fusion application');
    } else {
      this._cache[applicationId] = render;
    }
  }

  private getAppPath(appId: string) {
    return `apps/${appId}`;
  }
}
