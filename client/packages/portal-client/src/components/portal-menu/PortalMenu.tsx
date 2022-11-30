import { Search } from '@equinor/eds-core-react';
import {
  GroupWrapper,
  LoadingMenu,
  PortalMenu,
  useMenuContext,
} from '@equinor/portal-ui';
import { useState } from 'react';
import styled from 'styled-components';
import { appsMatchingSearch } from '../../utils/appsMatchingSearch';

const StyledWrapper = styled.div`
  padding: 1rem 0;
`;

export function MenuGroups() {
  const { data, isLoading } = useMenuContext();
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
        {isLoading && data.length === 0 ? (
          <LoadingMenu />
        ) : (
          <GroupWrapper groups={appsMatchingSearch(data ?? [], searchText)} />
        )}
      </StyledWrapper>
    </PortalMenu>
  );
}
