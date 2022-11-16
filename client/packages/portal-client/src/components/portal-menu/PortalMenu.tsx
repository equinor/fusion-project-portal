import { Search } from '@equinor/eds-core-react';
import { useMenuItems } from '@equinor/portal-core';
import { PortalMenu } from '@equinor/portal-ui';
import { useState } from 'react';
import { appsMatchingSearch } from '../../utils/appsMatchingSearch';
import { GroupWrapper } from './GroupWrapper/GroupWrapper';
import { LoadingMenu } from './LoadingMenu';

export function MenuGroups() {
  const { data, isLoading } = useMenuItems();
  const [searchText, setSearchText] = useState<string | undefined>();

  return (
    <PortalMenu>
      <Search
        id="app-search"
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
    </PortalMenu>
  );
}
