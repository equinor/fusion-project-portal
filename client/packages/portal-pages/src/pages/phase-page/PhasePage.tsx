import { useWorkSurface } from '@equinor/portal-core';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './PhasePageHeader';

export const WorkSurfacePage = (): JSX.Element => {
  const module = useWorkSurface();

  const { workSurfaceKey } = useParams();
  const navigate = useNavigate();

  if (!workSurfaceKey) {
    navigate('/');
    return <></>;
  }
  const surface =
    module.currentWorkSurface ??
    module?.workSurfaces?.find((s) => s.name === workSurfaceKey);

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
