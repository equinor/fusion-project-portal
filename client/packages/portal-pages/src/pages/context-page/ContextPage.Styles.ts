import { Card } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled, { createGlobalStyle } from 'styled-components';

export const StyledBackground = createGlobalStyle`
    body {
      // TODO fix add token
       background: #e3e3e3;
    };
`;

export const StyledHeaderSection = styled.div<{url: string}>(({url}) =>({
 backgroundImage: `url(${url})`,
 backgroundPosition: 'center',
 backgroundRepeat: 'no-repeat',
 backgroundSize: 'cover',
 height: '250px',
 display: 'flex',
 width: '100%',
 alignItems: 'center',
 padding: "2rem"
}))

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

const OPACITY_ALPHA = "cc"

export const StyledCard = styled(Card)`
  width: 450px;
  padding: 1rem;
  background-color: ${tokens.colors.ui.background__default.hex + OPACITY_ALPHA};
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

