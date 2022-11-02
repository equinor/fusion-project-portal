import { Card } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledGrid = styled.section`
  padding: 3rem 2rem 0rem 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: [column-1] auto [column-2] 446px;
`;

export const GridItem = styled(Card)<{
  columnName: string;
  rowStart?: boolean;
}>`
  grid-column-start: ${({ columnName }) => columnName};
  grid-row-start: ${({ rowStart }) => (rowStart ? 1 : 'auto')};
`;
