import { tokens } from "@equinor/eds-tokens";
import { Route } from "../../types/router-config";
import { RouteMenu } from "./RouteMenu";
import { useRouterConfigContext } from "../../context/RouterContext";
import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { TreeItem } from "../Tree/TreeItem";

const Style = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
};

export const RouteTreeItem = ({ route }: { route: Route }) => {
  const { activeRoute, setActiveRoute } = useRouterConfigContext();
  return (
    <TreeItem
      onClick={() => setActiveRoute(route.id)}
      selected={
        activeRoute?.id === route.id
          ? tokens.colors.interactive.primary__selected_highlight.hex
          : undefined
      }
      title={route.path}
      key={route.path}
      Render={() => {
        return (
          <Style.Wrapper>
            <Typography variant="overline">- {route.pageKey}</Typography>
            <RouteMenu route={route} />
          </Style.Wrapper>
        );
      }}
    >
      {route.children?.map((childRoute) => (
        <RouteTreeItem route={childRoute} key={childRoute.path}></RouteTreeItem>
      ))}
    </TreeItem>
  );
};
