import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Presence } from './types';

export const getPresence$: (userId: string) => Observable<Presence> = (
  userId: string
) =>
  interval(5000 * 60).pipe(
    startWith(0),
    switchMap(() =>
      window.Fusion.modules.serviceDiscovery.createClient('people')
    ),
    switchMap((s) => s.fetch(`/persons/${userId}/presence`)),
    switchMap((s) => s.json())
  );
