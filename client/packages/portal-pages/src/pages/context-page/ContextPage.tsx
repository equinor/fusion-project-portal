import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { StyledMain } from '../common-styles/Styles';
import {
  StyledBackground,
  StyledContextPageGrid,
  StyledGridItem,
} from './ContextPage.Styles';

export const ContextPage = () => {
  const currentContext = useFrameworkCurrentContext();

  return (
    <StyledMain>
      <StyledBackground />
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
          </StyledGridItem.Header>
        </StyledGridItem>
      </StyledContextPageGrid>
    </StyledMain>
  );
};
