import { useViewController, useViews } from '@equinor/portal-core';
import { FullPageLoading } from '@equinor/portal-ui';
import { PhaseSelectorItem } from '../../components/phase-selector/PhaseSelectorItem';
import {
  StyledBackgroundSection,
  StyledContentSection,
  StyledMain,
  StyledPaseSectionWrapper,
} from './HomePage.Styles';

import { HomePageHeader } from './HomePageHeader';

export const HomePage = (): JSX.Element => {
  const { isLoading, data } = useViews();
  const { setViewId } = useViewController();
  if (isLoading) return <FullPageLoading detail="Loading views" />;
  //TODO: make component
  if (!data) return <div>Something went wrong</div>;
  return (
    <StyledMain>
      <StyledBackgroundSection>
        <StyledContentSection>
          <HomePageHeader />
          <StyledPaseSectionWrapper>
            {data.map((section) => (
              <PhaseSelectorItem
                {...section}
                onClick={() => {
                  setViewId(section.id);
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
