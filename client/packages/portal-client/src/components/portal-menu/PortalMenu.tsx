import { Search } from '@equinor/eds-core-react';
import { useMenuItems } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu } from '@equinor/portal-ui';
import { useState } from 'react';
import styled from 'styled-components';
import { appsMatchingSearch } from '../../utils/appsMatchingSearch';

const StyledWrapper = styled.div`
  padding: 1rem 0;
`;

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
      <StyledWrapper>
        {isLoading ? (
          <LoadingMenu />
        ) : (
          <GroupWrapper groups={appsMatchingSearch(data ?? [], searchText)} />
        )}
      </StyledWrapper>
    </PortalMenu>
  );
}
