import { Search } from '@equinor/eds-core-react';
import { useMenuContext } from '@equinor/portal-core';
import { GroupWrapper, LoadingMenu, PortalMenu } from '@equinor/portal-ui';
import { appsMatchingSearch } from '@equinor/portal-utils';
import { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 1rem 0;
`;

export function MenuGroups() {
  const { appGroups, isLoading } = useMenuContext();
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
        {isLoading && appGroups.length === 0 ? (
          <LoadingMenu />
        ) : (
          <GroupWrapper
            appGroups={appsMatchingSearch(appGroups ?? [], searchText)}
          />
        )}
      </StyledWrapper>
    </PortalMenu>
  );
}
