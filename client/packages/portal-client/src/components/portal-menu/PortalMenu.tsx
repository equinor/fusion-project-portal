import { CircularProgress, Search } from '@equinor/eds-core-react';
import { PortalMenu } from '@equinor/portal-ui';
import { GroupWrapper } from './GroupWrapper/GroupWrapper';
import { AppGroup, useMenuItems } from '@equinor/portal-core';
import { useState } from 'react';
import { appsMatchingSearch } from '../../utils/appsMatchingSearch';
import { LoadingMenu } from './LoadingMenu';

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
          <LoadingMenu />
        ) : (
          <GroupWrapper groups={appsMatchingSearch(data ?? [], searchText)} />
        )}
      </div>
    </PortalMenu>
  );
}
