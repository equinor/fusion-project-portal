import { Icon } from "@equinor/eds-core-react";
import { chevron_down, chevron_right } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import { PropsWithChildren, FC, useState, Children } from "react";
import styled from "styled-components";

const Style = {
  Tree: styled.ul`
    padding-left: 5px;
    list-style: none;
  `,
  Selected: styled.div<{ selected?: string }>`
    :hover {
      background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
      cursor: pointer;
    }
  `,
  Content: styled.div<{ selected?: string }>`
    border-radius: 5px;
    background-color: ${({ selected }) =>
      selected ? selected : `var(--tree-color)`};
    gap: 1rem;
    display: flex;
    padding-left: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Main: styled.div`
    gap: 1rem;
    height: 3rem;
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

export type TreeBaseItemProps = PropsWithChildren<{
  Render?: FC;
  selected?: string;
  title: string;
  initOpen?: boolean;
}>;

export const TreeBaseItem = ({
  children,
  Render,
  title,
  selected,
  initOpen,
}: TreeBaseItemProps) => {
  const [toggle, setToggle] = useState(initOpen || false);
  return (
    <>
      <Style.Selected>
        <Style.Content selected={selected}>
          <Style.Main>
            {children && Children.toArray(children).length > 0 ? (
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
      {toggle ? <Style.Tree> {children}</Style.Tree> : null}
    </>
  );
};
