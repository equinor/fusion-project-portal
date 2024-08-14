import { Button, Card, Icon, Typography } from "@equinor/eds-core-react";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { PortalApp } from "../types";
import { useState } from "react";
import { AppSideSheet } from "./AppSideSheet";
import { delete_to_trash, edit } from "@equinor/eds-icons";

const Style = {
  CardList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
  const client = useAppModules().http.createClient("portal-client");
  const [selectedApp, setSelectedApp] = useState<PortalApp | undefined>();
  const { isLoading, error, data } = useQuery<PortalApp[]>({
    queryKey: ["onboarded-app"],
    queryFn: async () =>
      await client.fetch("api/onboarded-apps").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  return (
    <>
      <AppSideSheet
        app={selectedApp}
        onClose={() => {
          setSelectedApp(undefined);
        }}
      />
      <Style.CardList>
        {data?.map((item) => (
          <Style.Card key={item.id}>
            <Style.Content>
              <div>
                <Typography variant="h4">{item.name}</Typography>

                <Typography>
                  ContextTypes:{" "}
                  {item.contexts.length > 0
                    ? item.contexts.map((context) => (
                        <span>{context.type}</span>
                      ))
                    : "No Support"}
                </Typography>
              </div>
              <div>
                <Button
                  variant="ghost_icon"
                  onClick={() => setSelectedApp(item)}
                >
                  <Icon data={edit} />
                </Button>
                <Button variant="ghost_icon">
                  <Icon data={delete_to_trash} />
                </Button>
              </div>
            </Style.Content>
          </Style.Card>
        ))}
      </Style.CardList>
    </>
  );
}
