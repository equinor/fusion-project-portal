import { workSurfaceController } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { useParams } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

export const WorkSurfacePage = (): JSX.Element => {
  const { workSurfaceKey } = useParams();

  const phases = useObservable(workSurfaceController.workSurfaces$);

  if (!phases) return <div>Loading...</div>;

  const phase = phases.find(
    (s) => s.name.toLowerCase().replace(' ', '-') === workSurfaceKey
  );

  if (!phase) return <div>Phase not found</div>;
  workSurfaceController.setWorkSurface(phase);

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
