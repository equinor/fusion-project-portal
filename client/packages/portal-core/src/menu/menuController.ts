import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, combineLatestWith } from 'rxjs/operators';
import { phaseController } from '../phases';
import { AppGroup, Phase } from '../types/portal-config';

const fetchGroups$ = (phaseId?: string): Observable<AppGroup[]> =>
  of(phaseId).pipe(
    switchMap(async (phaseId) => {
      if (!phaseId) return [];
      const res = await fetch(
        `https://app-pep-backend-noe-dev.azurewebsites.net/api/work-surfaces/${phaseId}`
      );
      const phase = (await res.json()) as Phase;
      return phase.appGroups;
    })
  );

const menuGroups$ = phaseController.currentPhase$.pipe(
  switchMap((s) => fetchGroups$(s?.id))
);

const search$ = new BehaviorSubject<string | undefined>(undefined);
const groupsMatchingSearch$: Observable<AppGroup[]> = menuGroups$.pipe(
  combineLatestWith(search$.pipe(map((s) => s?.toLowerCase()))),
  map(([groups, search]) => {
    if (!search) return groups;

    return groups
      .map((group) => ({
        ...group,
        children: group.applications.filter((group) =>
          group.appKey.toLowerCase().includes(search)
        ),
      }))
      .filter((group) => group.children.length);
  })
);

export const menuController = {
  setSearchText: (text: string | undefined) => search$.next(text),
  groupsMatchingSearch$: groupsMatchingSearch$,
  menuGroups$,
};
