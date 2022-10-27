import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';
import { usePhases, workSurfaceController } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { tap } from 'rxjs';

const { workSurfaces$, getCurrentWorkSurfaceId } = workSurfaceController;
/**
 * Redirects to last surface
 */
export const useNavigateLastSurface = () => {
  const navigate = useNavigate();
  useObservable(workSurfaces$, (s) =>
    s.pipe(
      tap((surfaces) => {
        const surface = surfaces?.find(
          (s) => s.id === getCurrentWorkSurfaceId()
        )?.name;
        if (surface) {
          navigate(`/${surface.toLowerCase().replace(' ', '-')}`);
        }
      })
    )
  );
};

export const HomePage = (): JSX.Element => {
  const { phases: surfaces, setWorkSurface } = usePhases();

  useNavigateLastSurface();
  if (!surfaces) return <div>Loading phases...</div>;

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
