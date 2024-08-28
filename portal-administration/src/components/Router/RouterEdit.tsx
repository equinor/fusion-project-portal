import styled from "styled-components";
import { Typography } from "@equinor/eds-core-react";

import { useRouterConfigContext } from "../../context/RouterContext";
import { RouterRoot } from "./RouterRoot";
import { RouteForm } from "./RouteForm";
import { RouterConfig } from "./RouterConfig";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    padding: 1rem;
    width: 100%;
    flex-direction: column;
  `,
};

export const RouterEdit = ({ portalName }: { portalName?: string }) => {
  const { rootActive, configActive } = useRouterConfigContext();

  return (
    <Style.Wrapper>
      <Typography variant="h4">
        {portalName
          ? `${portalName} - Router Config`
          : "Postal - Router Config"}
      </Typography>
      {configActive ? (
        <RouterConfig />
      ) : (
        <>{rootActive ? <RouterRoot /> : <RouteForm />}</>
      )}
    </Style.Wrapper>
  );
};
