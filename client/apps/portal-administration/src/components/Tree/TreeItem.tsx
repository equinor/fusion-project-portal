import { TreeBaseItem, TreeBaseItemProps } from "./TreeBaceItem";
import styled from "styled-components";

const Style = {
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
};

export const TreeItem = ({
  children,
  Render,
  title,
  onClick,
  selected,
}: TreeBaseItemProps & {
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}) => {
  return (
    <Style.TreeItem
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      <TreeBaseItem title={title} Render={Render} selected={selected}>
        {children}
      </TreeBaseItem>
    </Style.TreeItem>
  );
};
