import React, { useState } from 'react';
import { ReactNode } from 'react';
import { Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_right } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

Icon.add({
  chevron_down,
  chevron_right,
});

type SectionProps = {
  name: string;
  children: ReactNode;
};
export function Section({ children, name }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <StyledHeaderWrapper onClick={() => setIsExpanded((s) => !s)}>
        <Icon name={isExpanded ? chevron_down.name : chevron_right.name} />
        <StyledTitle>{name}</StyledTitle>
      </StyledHeaderWrapper>
      {isExpanded && <StyledChildrenFlex>{children}</StyledChildrenFlex>}
    </div>
  );
}

const StyledChildrenFlex = styled.ol`
  display: flex;
  flex-direction: column;
  padding-inline-start: 24px;
`;

const StyledHeaderWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  color: ${tokens.colors.interactive.primary__resting.hex};
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-family: Equinor;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
`;
