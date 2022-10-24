import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { Link } from 'react-router-dom';
import { PaseSelectorItem } from '../../components/pase-selector/PaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
}

interface HomePageProps {
  phases: Phase[];
}

export const HomePage = (props: HomePageProps): JSX.Element => {
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {props.phases.map((section) => (
              <PaseSelectorItem {...section} key={section.id} />
            ))}
          </StyledPaseSectionWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};

const FrameworkData = (): JSX.Element => {
  const framework = useFramework();
  const account = useCurrentUser();

  return (
    <StyledMain>
      <Link to={'early-pase'}>Early Pase</Link>

      <Link to={'execution-pase'}>Early Pase</Link>
      <h3>Current user</h3>
      <code>
        <pre>{JSON.stringify(account, null, 4)}</pre>
      </code>
      <h3>Registered modules in Framework</h3>
      <ul>
        http://localhost:3000/
        {Object.keys(framework.modules).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </StyledMain>
  );
};
