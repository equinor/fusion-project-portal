import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { Link } from 'react-router-dom';
import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { Phase, phaseController } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';

export const HomePage = (): JSX.Element => {
  const phases = useObservable(phaseController.phases$);

  if (!phases) return <div>Loading phases...</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {phases.map((section) => (
              <PhaseSelectorItem
                {...section}
                onClick={() => {
                  location.replace(
                    `/${section.name.toLowerCase().replace(' ', '-')}`
                  );
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
