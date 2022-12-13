import { Breadcrumbs as EdsBreadcrumbs } from '@equinor/eds-core-react';
import {
  TopBarContextSelector,
  useViewController,
} from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  const app = false;
  return (
    <StyledBreadcrumbs>
      <span />
      {currentView && (
        <StyledBreadcrumbs.Breadcrumb onClick={() => {
          navigate("/")
        }}>{currentView.name}</StyledBreadcrumbs.Breadcrumb>
      )}
      {app && <StyledBreadcrumbItem>App Name</StyledBreadcrumbItem>}
      <StyledBreadcrumbItem><TopBarContextSelector /></StyledBreadcrumbItem>
    </StyledBreadcrumbs>
  );
};
