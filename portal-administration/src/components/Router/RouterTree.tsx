import { Button, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

import { Tree, TreeRoot } from "../Tree";
import { useRouterConfigContext } from "../../context/RouterContext";
import { RouteTreeItem } from "./RouteTreeItem";

const Style = {
  Router: styled.span`
    padding: 2rem;
    min-width: 350px;
    background-color: ${tokens.colors.ui.background__medium.hex};
    display: flex;
    flex-direction: column;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  `,
};

export const RouterTree = () => {
  const { createNewRoute, routes, root } = useRouterConfigContext();
  return (
    <Style.Router>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          createNewRoute();
        }}
      >
        Add New Route
      </Button>

      <Tree>
        <TreeRoot
          title="/"
          Render={() => {
            return (
              <Style.Wrapper>
                <Typography variant="overline">- {root.pageKey}</Typography>
              </Style.Wrapper>
            );
          }}
        >
          {routes.map((route) => (
            <RouteTreeItem route={route} />
          ))}
        </TreeRoot>
      </Tree>
    </Style.Router>
  );
};
