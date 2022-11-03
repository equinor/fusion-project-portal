import { HttpClient } from '@equinor/fusion-framework-module-http/client';
import { framework$ } from '../portal-framework-config/portal-framework-config';

/** Requests an api client from the fusion framework */
export async function requirePortalClient(): Promise<HttpClient> {
  return new Promise((res) =>
    framework$.subscribe(
      (fusion) => fusion && res(fusion.http.createClient('portal-client'))
    )
  );
}
