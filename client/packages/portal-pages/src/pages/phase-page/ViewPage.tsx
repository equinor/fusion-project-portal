import { Button } from '@equinor/eds-core-react';
import { useViewController } from '@equinor/portal-core';
import { FullPageLoading } from '@equinor/portal-ui';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './ViewPage.Styles';
import { PasePageHeader } from './ViewPageHeader';

export const CurrentViewPage = (): JSX.Element => {
  const { setViewId, views, currentView, isLoading } = useViewController();

  if (isLoading) return <FullPageLoading detail="Loading view" />;
  //TODO: Make component
  if (!views) return <div>Something went wrong</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          {currentView && (
            <>
              <PasePageHeader {...currentView} />

              <StyledContentWrapper>
                {views.map((view) => {
                  if (view.key === currentView.key) {
                    return <div key={view.id}></div>;
                  }
                  return (
                    <Button
                      key={view.key}
                      variant="ghost"
                      onClick={() => {
                        setViewId(view.key);
                      }}
                    >
                      {view.name}
                    </Button>
                  );
                })}
              </StyledContentWrapper>
            </>
          )}
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
