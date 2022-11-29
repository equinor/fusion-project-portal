import { Observable, interval, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Presence } from './types';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const getPresence$: (
  userId: string,
  client: Promise<IHttpClient>
) => Observable<Presence> = (userId: string, client: Promise<IHttpClient>) =>
  interval(5000 * 60).pipe(
    startWith(0),
    switchMap(() => client),
    switchMap((s) => s.fetch$(`/persons/${userId}/presence`)),
    switchMap((s) => s.json())
  );
