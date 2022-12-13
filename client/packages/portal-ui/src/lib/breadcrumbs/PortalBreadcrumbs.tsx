import { Breadcrumbs as EdsBreadcrumbs } from '@equinor/eds-core-react';
import {
  TopBarContextSelector,
  useViewController,
} from '@equinor/portal-core';
import styled from 'styled-components';

const StyledBreadcrumbs = styled(EdsBreadcrumbs)`
  > ol {
    align-items: center;
    flex-wrap: nowrap
  }
`;

const StyledBreadcrumbItem = styled.span`
`;

export const Breadcrumbs = () => {
  const { currentView } = useViewController();
  const app = false;
  return (
    <StyledBreadcrumbs>
      <span />
      {currentView && (
        <StyledBreadcrumbItem>{currentView.name}</StyledBreadcrumbItem>
      )}
      {app && <StyledBreadcrumbItem>App Name</StyledBreadcrumbItem>}
      <StyledBreadcrumbItem><TopBarContextSelector /></StyledBreadcrumbItem>
    </StyledBreadcrumbs>
  );
};
