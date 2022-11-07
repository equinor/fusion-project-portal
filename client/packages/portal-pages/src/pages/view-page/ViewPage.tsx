import { useViews } from '@equinor/portal-core';
import { FullPageLoading } from '@equinor/portal-ui';
import { useParams } from 'react-router-dom';
import { StyledBackgroundSection, StyledMain } from '../common-styles/Styles';
import { StyledContentSection, StyledContentWrapper } from './PhasePage.Styles';
import { PasePageHeader } from './ViewPageHeader';

export const CurrentViewPage = (): JSX.Element => {
  const { viewKey } = useParams();

  const { data, isLoading } = useViews();
  if (isLoading) return <FullPageLoading detail="Loading phase" />;
  //TODO: Make component
  if (!data) return <div>Something went wrong</div>;
  const view = data.find((s) => s.name === viewKey);
  if (!view) return <div>Phase not found</div>;

  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <PasePageHeader {...view} />

          <StyledContentWrapper>
            <p>// some content</p>
          </StyledContentWrapper>
        </StyledContentSection>
      </StyledBackgroundSection>
    </StyledMain>
  );
};
