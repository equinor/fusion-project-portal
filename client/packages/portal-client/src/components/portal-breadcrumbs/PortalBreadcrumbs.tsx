import { Breadcrumbs } from '@equinor/eds-core-react';
import {
  PortalTopBarContextSelector,
  useViewController,
} from '@equinor/portal-core';
import styled from 'styled-components';

const StyledBreadcrumbs = styled(Breadcrumbs)`
  > ol {
    align-items: center;
  }
`;

export const PortalBreadcrumbs = () => {
  const { currentView } = useViewController();

  return (
    <StyledBreadcrumbs>
      <Breadcrumbs.Breadcrumb>Project Portal</Breadcrumbs.Breadcrumb>
      {currentView && (
        <Breadcrumbs.Breadcrumb>{currentView.name}</Breadcrumbs.Breadcrumb>
      )}
      <Breadcrumbs.Breadcrumb>App Name</Breadcrumbs.Breadcrumb>
      <PortalTopBarContextSelector />
    </StyledBreadcrumbs>
  );
};
