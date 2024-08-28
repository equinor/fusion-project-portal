import { tokens } from "@equinor/eds-tokens";
import { PropsWithChildren } from "react";
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
};

export const Tree = ({ children }: PropsWithChildren) => {
  return (
    <Style.TreeWrapper>
      <Style.Tree>{children}</Style.Tree>
    </Style.TreeWrapper>
  );
};
