import { useWorkSurfaces } from '@equinor/portal-core';
import { useParams } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

export const WorkSurfacePage = (): JSX.Element => {
  const { workSurfaceKey } = useParams();

  const { data: phases, isLoading } = useWorkSurfaces();

  if (isLoading) return <div>Loading...</div>;
  if (!phases) return <div>Woops something went wrong</div>;
  const phase = phases.find(
    (s) => s.name.toLowerCase().replace(' ', '-') === workSurfaceKey
  );

  if (!phase) return <div>Phase not found</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...phase} />

          <StyledContentWrapper>
            <p>// some content</p>
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
