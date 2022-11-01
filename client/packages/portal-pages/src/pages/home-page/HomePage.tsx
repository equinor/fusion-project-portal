import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { useNavigate } from 'react-router-dom';
import { useWorkSurface } from '@equinor/portal-core';

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  const module = useWorkSurface();

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {(module?.workSurfaces ?? []).map((section) => (
              <PhaseSelectorItem
                {...section}
                onClick={() => {
                  module.setCurrentWorkSurface(section);
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
