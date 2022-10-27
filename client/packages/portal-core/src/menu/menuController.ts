import { of, BehaviorSubject } from 'rxjs';
import { map, combineLatestWith } from 'rxjs/operators';
import { AppGroup } from '../types/portal-config';

const search$ = new BehaviorSubject<string | undefined>(undefined);

const groupsMatchingSearch$ = (groups: AppGroup[]) =>
  of(groups).pipe(
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

export const menuSearch = {
  setSearchText: (text: string | undefined) => search$.next(text),
  groupsMatchingSearch$: groupsMatchingSearch$,
};
