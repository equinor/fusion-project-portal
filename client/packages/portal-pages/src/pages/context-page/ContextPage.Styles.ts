import { Card } from '@equinor/eds-core-react';
import styled, { createGlobalStyle } from 'styled-components';

export const StyledBackground = createGlobalStyle`
    body {
       background: #e3e3e3;
    };
`;

export const StyledContextPageGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 2rem;

  @media only screen and (min-width: 45rem) and (max-width: 80rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 80rem) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledGridItem = styled(Card)<{
  span?: number;
  heightSpan?: number;
}>`
  @media only screen and (min-width: 45rem) {
    grid-column: span ${({ span }) => span || 1};
    grid-row: span ${({ heightSpan }) => heightSpan || 1};
  }
`;
