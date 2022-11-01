import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { useWorkSurfaces } from '@equinor/portal-core';
import { LoadingWorkSurfacesTransition } from './LoadingPhaseTransition';
import { useNavigate } from 'react-router-dom';

export const HomePage = (): JSX.Element => {
  const { data: surfaces, isLoading } = useWorkSurfaces();
  const navigate = useNavigate();

  if (isLoading) return <LoadingWorkSurfacesTransition />;
  if (!surfaces) return <div>Something went wrong</div>;
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
