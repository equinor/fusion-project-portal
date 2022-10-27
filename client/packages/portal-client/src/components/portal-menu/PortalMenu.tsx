import { CircularProgress, Search } from '@equinor/eds-core-react';
import { PortalMenu } from '@equinor/portal-ui';
import { GroupWrapper } from './GroupWrapper/GroupWrapper';
import { AppGroup } from '@equinor/portal-core';
import { useMenuItems } from '../portal-header/Header';
import { useState } from 'react';

export function MenuGroups() {
  const { data, isLoading } = useMenuItems();
  const [searchText, setSearchText] = useState<string | undefined>();

  return (
    <PortalMenu>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
        <Search
          placeholder="Search for apps"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {isLoading ? (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1.2em',
            }}
          >
            <CircularProgress />
            <div>Loading apps</div>
          </div>
        ) : (
          <GroupWrapper groups={appsMatchingSearch(data ?? [], searchText)} />
        )}
      </div>
    </PortalMenu>
  );
}

export function appsMatchingSearch(groups: AppGroup[], searchText?: string) {
  if (!searchText) return groups;
  return groups
    .map((group) => ({
      ...group,
      applications: group.applications.filter((group) =>
        group.appKey.toLowerCase().includes(searchText)
      ),
    }))
    .filter((group) => group.applications.length);
}
