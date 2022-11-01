import { HttpClient } from '@equinor/fusion-framework-module-http/client';
import { framework$ } from '../create-portal-framework/create-portal-framework';

/** Requests an api client from the fusion framework */
export async function requirePortalClient(): Promise<HttpClient> {
  return new Promise((res) =>
    framework$.subscribe(
      (fusion) => fusion && res(fusion.http.createClient('portal-client'))
    )
  );
}
