import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFramework } from '@equinor/fusion-framework-react';
import React from 'react';
import styled from 'styled-components';

type SharedIconProps = {
  createdBy: string;
  createdById: string;
};
export function SharedIcon({ createdBy, createdById }: SharedIconProps) {
  const myId = useFramework().modules.auth.defaultAccount?.localAccountId;

  const isMe = createdById === myId;

  return (
    <StyledRow>
      {!isMe && <StyledCreatedBy>shared by {createdBy}</StyledCreatedBy>}
      <Icon
        name="share"
        color={
          isMe
            ? tokens.colors.interactive.primary__resting.hex
            : tokens.colors.interactive.disabled__border.hex
        }
      />
    </StyledRow>
  );
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

const StyledCreatedBy = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: right;
`;
