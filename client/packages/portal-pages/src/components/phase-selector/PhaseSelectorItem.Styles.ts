import { Card, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled, { css } from 'styled-components';

export const StyledTypography = styled(Typography)`
  color: ${tokens.colors.interactive.disabled__text.rgba};
`;

export const StyledCard = styled(Card)<{ active?: boolean }>`
  min-width: 280px;
  width: 280px;
  height: 500px;
  background-color: #f7f7f7cc;

  ${({ active }) =>
    active &&
    css`
      ${StyledTypography} {
        color: blue;
        color: ${tokens.colors.text.static_icons__default.rgba};
      }
      cursor: pointer;
      ${StyledIconWrapper} {
        background: ${tokens.colors.ui.background__default.rgba};
      }
      :hover {
        ${StyledIconWrapper} {
          box-shadow: 0px 12px 17px rgba(0, 0, 0, 0.14),
            0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2);
        }
      }
    `}
`;

export const StyledIconWrapper = styled.div<{ active?: boolean }>`
  width: 300px;
  height: 300px;
  display: flex;
  background: #ececec;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 90px;
  left: -10px;
  > svg {
    min-width: 150px;
    min-height: 150px;

    ${({ active }) =>
      !active &&
      css`
        opacity: 0.3;
      `}
  }
`;
