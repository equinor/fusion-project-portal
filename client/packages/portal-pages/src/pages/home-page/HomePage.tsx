import { useCurrentWorkSurfaceId, useViews } from '@equinor/portal-core';
import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { LoadingWorkSurfacesTransition } from '../../../../portal-core/src/currentWorkSurfaceContext/LoadingWorkSurfacesTransition';

export const HomePage = (): JSX.Element => {
  const { isLoading, data } = useViews();
  const { setViewId } = useCurrentWorkSurfaceId();
  if (isLoading) return <LoadingWorkSurfacesTransition />;
  if (!data) return <div>Something went wrong</div>;
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {data.map((section) => (
              <PhaseSelectorItem
                {...section}
                onClick={() => {
                  setViewId(section.id);
                }}
                key={section.id}
              />
            ))}
          </StyledPaseSectionWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
