import { Button, Card, Icon, Typography } from "@equinor/eds-core-react";

import styled from "styled-components";
import { PortalApp } from "../../types";
import { useState } from "react";
import { AppSideSheet } from "./AppSideSheet";
import { delete_to_trash, edit } from "@equinor/eds-icons";
import {
  useDeleteOnboardedApp,
  useOnboardedApps,
} from "../../hooks/use-onboarded-apps";
import { Loading } from "../Loading";

const Style = {
  CardList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    height: calc(100vh - 250px);
    overflow: auto;
  `,
  Content: styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  Card: styled(Card)<{ col?: number }>`
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    padding: 0;
  `,
};

export function AppsList() {
  const { data: apps, isLoading } = useOnboardedApps();
  const { mutateAsync: deleteAppByAppKey } = useDeleteOnboardedApp();
  const [selectedApp, setSelectedApp] = useState<PortalApp | undefined>();

  if (isLoading) return <Loading detail="Loading onboarded apps" />;

  return (
    <>
      <AppSideSheet
        app={selectedApp}
        onClose={() => {
          setSelectedApp(undefined);
        }}
      />
      <Style.CardList>
        {apps?.map((app) => (
          <Style.Card key={app.id}>
            <Style.Content>
              <div>
                <Typography variant="h4">{app.name}</Typography>

                <Typography>
                  ContextTypes:{" "}
                  {app.contexts.length > 0
                    ? app.contexts.map((context, i) => (
                        <span>
                          {context.type}{" "}
                          {app.contexts.length > i + 1 ? " | " : ""}
                        </span>
                      ))
                    : "No Support"}
                </Typography>
              </div>
              <Button.Group>
                <Button
                  onClick={() => setSelectedApp(app)}
                  variant="ghost_icon"
                >
                  <Icon data={edit} />
                </Button>
                <Button
                  variant="ghost_icon"
                  onClick={() => {
                    deleteAppByAppKey(app.appKey);
                  }}
                >
                  <Icon data={delete_to_trash} />
                </Button>
              </Button.Group>
            </Style.Content>
          </Style.Card>
        ))}
      </Style.CardList>
    </>
  );
}
