import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

interface PhaseProps {
  id?: string;
  title: string;
  description: string;
  icon: string | React.FC;
}

export const PhasePage = (props: PhaseProps): JSX.Element => {
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...props} />

          <StyledContentWrapper>
            <p>// some content</p>
            {/* <Link to={'/'}>home</Link> */}
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
