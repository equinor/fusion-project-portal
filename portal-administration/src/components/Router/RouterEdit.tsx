import styled from "styled-components";
import { Card, Icon, Typography } from "@equinor/eds-core-react";

import { useRouterConfigContext } from "../../context/RouterContext";
import { RouterRoot } from "./RouterRoot";
import { RouteForm } from "./RouteForm";
import { RouterConfig } from "./RouterConfig";
import { info_circle } from "@equinor/eds-icons";
import { Message } from "../Message";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    padding: 1rem;
    width: 100%;
    flex-direction: column;
  `,
  Content: styled.div`
    gap: 1rem;
    display: flex;

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
        <Style.Content>
          <RouterConfig />
          <Card>
            <Message
              title="Configuration"
              messages={[
                "This is used for developers to ensure the configuration is proper",
              ]}
            />
          </Card>
        </Style.Content>
      ) : (
        <>
          {rootActive ? (
            <Style.Content>
              <RouterRoot />
              <Card>
                <Message
                  title="Base Config Help"
                  messages={[
                    "The page key is used to decide what application to load",
                    "Error message is shown if application fails to load",
                  ]}
                />
              </Card>
            </Style.Content>
          ) : (
            <Style.Content>
              <RouteForm />
              <Card>
                <Message
                  title="Route Help"
                  messages={[
                    "A * on the end will hit all sub paths, ie. my-page/*",
                    "Adding : at the front will result in a readable parameter ie. :myid",
                    "The page key is used to decide what application to load",
                    "Error message is shown if application fails to load",
                  ]}
                />
              </Card>
            </Style.Content>
          )}
        </>
      )}
    </Style.Wrapper>
  );
};
