import { AppGroup } from '@equinor/portal-core';

export function appsMatchingSearch(groups: AppGroup[], searchText?: string) {
  if (!searchText) return groups;
  return groups
    .map((group) => ({
      ...group,
      applications: group.apps.filter((group) =>
        group.appKey.toLowerCase().includes(searchText)
      ),
    }))
    .filter((group) => group.applications.length);
}
