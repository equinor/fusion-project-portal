import { useWorkSurfaces } from '@equinor/portal-core';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

export const WorkSurfacePage = (): JSX.Element => {
  const { workSurfaceKey } = useParams();
  const navigate = useNavigate();
  const { currentWorkSurface$, resolveWorkSurface } = useWorkSurfaces();

  if (!workSurfaceKey) {
    navigate('/');
    return <></>;
  }

  const { data: surface, isLoading } = useQuery(['resolve'], () =>
    resolveWorkSurface(workSurfaceKey)
  );

  if (!surface) return <div>Phase not found</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...surface} />

          <StyledContentWrapper>
            <p>// some content</p>
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
