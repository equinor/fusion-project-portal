import { Search } from '@equinor/eds-core-react';
import { AppGroup, Phase } from '@equinor/portal-core';
import { PortalMenu } from '@equinor/portal-ui';
import { useObservable } from '@equinor/portal-utils';
import { phaseController } from 'packages/portal-core/src/phases/phases';
import {
  BehaviorSubject,
  combineLatestWith,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GroupWrapper } from './GroupWrapper/GroupWrapper';

const fetchGroups$ = (phaseId?: string): Observable<AppGroup[]> =>
  of(phaseId).pipe(
    tap(() => console.log(phaseId)),
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

export function MenuGroups() {
  const groups = useObservable(groupsMatchingSearch$);

  if (!groups) return null;

  return (
    <PortalMenu>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
        <Search
          placeholder="Search for apps"
          onChange={(e) => {
            search$.next(e.target.value);
          }}
        />
        <GroupWrapper groups={groups} />
      </div>
    </PortalMenu>
  );
}
