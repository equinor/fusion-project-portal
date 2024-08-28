import { Icon } from "@equinor/eds-core-react";
import { chevron_down, chevron_right } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import React, { Children } from "react";
import { FC, PropsWithChildren, useState } from "react";
import styled from "styled-components";

const Style = {
  TreeWrapper: styled.div`
    position: relative;

    list-style: none;
    --tree-color: ${tokens.colors.ui.background__light.hex};
    --tree-line-color: ${tokens.colors.ui.background__light.hex};
    --tree-width: 2px;
  `,
  Tree: styled.ul`
    padding-left: 5px;
    list-style: none;
  `,

  TreeItem: styled.li`
    position: relative;
    padding-top: 5px;

    padding-left: 2rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    &:before {
      position: absolute;
      top: 25px;
      left: 1rem;
      width: 15px;
      height: var(--tree-width);
      margin: auto;
      content: "";
      border-bottom: var(--tree-width) dotted var(--tree-line-color);
    }

    &:after {
      position: absolute;
      top: 0px;
      bottom: 0;
      left: 1rem;
      width: var(--tree-width);
      height: calc(100% + 25px);
      content: "";
      border-left: var(--tree-width) dotted var(--tree-line-color);
    }

    &:last-child:after {
      height: 25px;
    }
  `,

  TreeRoot: styled.li`
    position: relative;
    padding-top: 5px;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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

export const TreeItem = ({
  children,
  Render,
  title,
  onClick,
  selected,
}: PropsWithChildren<{
  Render?: FC;
  selected?: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}>) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Style.TreeItem
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
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
    </Style.TreeItem>
  );
};

export const TreeRoot = ({
  children,
  Render,
  title,
  onClick,
}: PropsWithChildren<{
  Render?: FC;
  title: string;
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}>) => {
  const [toggle, setToggle] = useState(true);
  return (
    <Style.TreeRoot
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
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

      {toggle ? <Style.Tree> {children}</Style.Tree> : null}
    </Style.TreeRoot>
  );
};

export const Tree = ({ children }: PropsWithChildren) => {
  return (
    <Style.TreeWrapper>
      <Style.Tree>{children}</Style.Tree>
    </Style.TreeWrapper>
  );
};
