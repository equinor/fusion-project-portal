import { TreeBaseItem, TreeBaseItemProps } from "./TreeBaceItem";
import styled from "styled-components";

const Style = {
  TreeRoot: styled.li`
    position: relative;
    padding-top: 5px;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  `,
};
export const TreeRoot = ({
  children,
  Render,
  title,
  onClick,
  selected,
}: TreeBaseItemProps & {
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}) => {
  return (
    <Style.TreeRoot
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      <TreeBaseItem title={title} Render={Render} initOpen selected={selected}>
        {children}
      </TreeBaseItem>
    </Style.TreeRoot>
  );
};
