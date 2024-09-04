import { Button, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

import { Tree } from "../Tree/Tree";
import { useRouterConfigContext } from "../../context/RouterContext";
import { RouteTreeItem } from "./RouteTreeItem";
import { TreeRoot } from "../Tree/TreeRoot";

const Style = {
  Router: styled.span`
    padding: 1rem;
    background-color: ${tokens.colors.ui.background__medium.hex};
    border-right: 1px solid ${tokens.colors.ui.background__default.hex};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-box-shadow: -10px 0 20px 3px #00000005 inset;
    -moz-box-shadow: -10px 0 20px 3px #00000005 inset;
    box-shadow: -10px 0 20px 3px #00000005 inset;
  `,
  Top: styled.span`
    display: flex;
    flex-direction: column;
    min-width: 350px;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  `,
};

export const RouterTree = () => {
  const { createNewRoute, routes, root, rootActive, toggleRoot, seeConfig } =
    useRouterConfigContext();
  return (
    <Style.Router>
      <Style.Top>
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
            selected={
              rootActive
                ? tokens.colors.interactive.primary__selected_highlight.hex
                : undefined
            }
            onClick={() => {
              toggleRoot();
            }}
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
      </Style.Top>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          seeConfig();
        }}
      >
        See Config
      </Button>
    </Style.Router>
  );
};
