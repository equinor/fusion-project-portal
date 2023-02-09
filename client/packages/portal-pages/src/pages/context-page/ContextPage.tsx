import { Card, Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { StyledMain } from '../common-styles/Styles';
import {
  StyledBackground,
  StyledContextPageGrid,
  StyledGridItem,
  StyledHeaderSection,
  StyledCard
} from './ContextPage.Styles';

function getBackgroundURL(instCode: string) {
  return `https://stiddata.equinor.com/public/${instCode}.jpg`

}

interface ProjectMaster extends Record<string, unknown> {
  facilities: string[];
  projectCategory: string;
}

export const ContextPage = () => {
  const currentContext = useFrameworkCurrentContext<ProjectMaster>();

  return (
    <StyledMain>
      <StyledBackground />
      {currentContext?.value.facilities && <StyledHeaderSection url={getBackgroundURL(currentContext?.value.facilities[0])}>
        <StyledCard>
          <Typography variant='h3'>
            <b>
            {currentContext?.title}
            </b>
            </Typography>
            <Typography variant='h3'>
       
            {currentContext.value.projectCategory.replace('\-|\_\/*'," ")}
    
            </Typography>
        </StyledCard>
        </StyledHeaderSection>}
      <StyledContextPageGrid>
        <StyledGridItem span={2}>
          <StyledGridItem.Header>
            <h5>{currentContext?.title}</h5>
          </StyledGridItem.Header>
        </StyledGridItem>
        <StyledGridItem heightSpan={2}>
          <StyledGridItem.Header>
            <h5>Work Items</h5>
          </StyledGridItem.Header>
        </StyledGridItem>
        <StyledGridItem heightSpan={2}>
          <StyledGridItem.Header>
            <h5>My Position</h5>
          </StyledGridItem.Header>
        </StyledGridItem>
        <StyledGridItem span={2}>
          <StyledGridItem.Header>
            <h5>Some Content</h5>
            <pre>{JSON.stringify(currentContext,null,'\t')  }</pre>
          </StyledGridItem.Header>
        </StyledGridItem>
      </StyledContextPageGrid>
    </StyledMain>
  );
};
