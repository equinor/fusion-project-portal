import { Icon } from "@equinor/eds-core-react";
import {
  chevron_down,
  chevron_right,
  dialpad,
  label,
} from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import { FC, PropsWithChildren, useState } from "react";
import styled from "styled-components";

const Style = {
  Tree: styled.div``,

  Selected: styled.div<{ selected?: string }>`
    :hover {
      background-color: ${tokens.colors.interactive.secondary__highlight.hex};
    }
    background-color: ${({ selected }) => selected && selected};
    border-radius: 5px;
  `,

  Content: styled.div`
    border-radius: 5px;
    background-color: ${tokens.colors.interactive.table__header__fill_resting
      .hex};
    padding: 0.25rem;
    padding-left: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Main: styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Children: styled.div`
    position: relative;
    padding-left: 2rem;
    margin-top: 0.5rem;
  `,
};

export const Tree = ({
  children,
  Render,
  title,
  onClick,
  selected,
}: PropsWithChildren<{
  Render?: FC;
  selected?: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}>) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Style.Tree
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      <Style.Selected selected={selected}>
        <Style.Content>
          <Style.Main>
            {children ? (
              <Icon
                size={16}
                data={toggle ? chevron_down : chevron_right}
                onClick={() => {
                  setToggle((s) => !s);
                }}
              />
            ) : null}
            {title}
          </Style.Main>
          {Render && <Render />}
        </Style.Content>
      </Style.Selected>
      {toggle ? <Style.Children> {children}</Style.Children> : null}
    </Style.Tree>
  );
};
