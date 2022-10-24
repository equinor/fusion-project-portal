import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/homePageBackground.svg';
import { PaseSelectorItem } from '../../components/PaseSelector/PaseSelectorItem';
import { HomePageHeader } from './HomePageHeader';

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
}

const StyledMain = styled.main``;

const StyledBackgroundSection = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  background-image: url(${background});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: #dee5e7;
`;
const StyledContentSection = styled.section`
  padding: 10rem 5rem 0rem 5rem;
`;

const StyledPaseSectionWrapper = styled.section`
  display: flex;
  gap: 3rem;
  margin-top: 5rem;
`;

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
