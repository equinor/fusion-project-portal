import { framework$ } from '../create-portal-framework/create-portal-framework';
import { HttpClient } from '@equinor/fusion-framework-module-http/client';

/** Requests an api client from the fusion framework */
export async function requirePortalClient(): Promise<HttpClient> {
  return new Promise((res) =>
    framework$.subscribe(
      (fusion) =>
        fusion && fusion.serviceDiscovery.createClient('portal').then(res)
    )
  );
}
