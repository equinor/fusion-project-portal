import { Observable, interval, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Presence } from './types';

export const getPresence$: (userId: string) => Observable<Presence> = (
  userId: string
) =>
  interval(5000 * 60).pipe(
    startWith(0),
    map((s) => ({
      activity: 'Available',
      id: '123',
      availability: 'Available',
    }))
  );
