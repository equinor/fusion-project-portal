import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { useNavigateLastSurface, useWorkSurfaces } from '@equinor/portal-core';
import { LoadingWorkSurfacesTransition } from './LoadingPhaseTransition';
import { useObservable } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';

export const HomePage = (): JSX.Element => {
  const { workSurfaces$, setWorkSurface } = useWorkSurfaces();
  const navigate = useNavigate();
  const surfaces = useObservable(workSurfaces$);

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
                  navigate(`/${section.name}`);
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
