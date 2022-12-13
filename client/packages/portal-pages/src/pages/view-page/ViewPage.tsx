import { PortalContextSelector, useViewController } from '@equinor/portal-core';
import { FullPageLoading } from '@equinor/portal-ui';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './ViewPage.Styles';
import { PasePageHeader } from './ViewPageHeader';
import { ViewSelector } from './ViewSelector';

export const ViewPage = (): JSX.Element => {
  const { views, isLoading, currentView, setViewId } = useViewController();

  if (isLoading) return <FullPageLoading detail="Loading view" />;

  //TODO: Make component
  if (!currentView) return <div>Something went wrong no view precent</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...currentView} />
          <StyledContentWrapper>
            <PortalContextSelector />
            <ViewSelector {...{ currentView, views, setViewId }} />
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
