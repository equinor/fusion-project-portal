import { Link } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../CommonStyles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PasePage.Styles';
import { PasePageHeader } from './PasePageHeader';

interface PhaseProps {
  id?: string;
  title: string;
  description: string;
  icon: string | React.FC;
}

export const Phase = (props: PhaseProps): JSX.Element => {
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...props} />

          <StyledContentWrapper>
            <p>// some content</p>
            <Link to={'/'}>home</Link>
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
