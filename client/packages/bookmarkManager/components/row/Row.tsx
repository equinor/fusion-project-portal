import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';
import React, { MutableRefObject, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';

type MenuOption = {
  name: string;
  disabled: boolean;
  onClick: VoidFunction;
};

type RowProps = {
  name: string;
  menuOptions: MenuOption[];
  children?: ReactNode;
};
export function Row({ name, menuOptions, children }: RowProps) {
  const pRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(pRef.current, () => setIsOpen(false));

  return (
    <StyledRow>
      <Typography>{name}</Typography>
      <StyledIconRow>
        {children}
        {!!menuOptions?.length && (
          <Icon
            name="more_vertical"
            onClick={() => setIsOpen((s) => !s)}
            color={tokens.colors.interactive.primary__resting.hex}
            ref={pRef as unknown as MutableRefObject<SVGSVGElement>}
          />
        )}

        {pRef.current !== null && isOpen && !!menuOptions && (
          <MoreMenu
            options={menuOptions}
            close={() => setIsOpen(false)}
            pRef={pRef.current}
          />
        )}
      </StyledIconRow>
    </StyledRow>
  );
}

type MenuProps = {
  pRef: HTMLElement;
  close: VoidFunction;
  options: MenuOption[];
};
export function MoreMenu({ pRef, close, options }: MenuProps) {
  return (
    <Menu open anchorEl={pRef}>
      {options.map(({ onClick, name, disabled }) => (
        <Menu.Item
          disabled={disabled}
          onClick={() => {
            onClick();
            close();
          }}
          key={name}
        >
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );
}

const StyledIconRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  align-items: center;
`;

const StyledRow = styled.li`
  cursor: pointer;
  &:hover {
    background-color: ${tokens.colors.ui.background__light.hex};
  }

  display: flex;
  align-items: center;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  justify-content: space-between;
  border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
`;
