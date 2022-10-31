import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { useNavigateLastSurface, usePhases } from '@equinor/portal-core';
import { HomePageHeader } from './HomePageHeader';
import { LoadingWorkSurfacesTransition } from './LoadingPhaseTransition';

export const HomePage = (): JSX.Element => {
  const { phases: surfaces, setWorkSurface } = usePhases();

  useNavigateLastSurface();
  if (!surfaces) return <LoadingWorkSurfacesTransition />;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {surfaces.map((section) => (
              <PhaseSelectorItem
                {...section}
                onClick={() => {
                  setWorkSurface(section);
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
