import { Phase } from '@equinor/portal-core';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

export const PhasePage = (props: Phase): JSX.Element => {
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...props} />

          <StyledContentWrapper>
            <p>// some content</p>
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
