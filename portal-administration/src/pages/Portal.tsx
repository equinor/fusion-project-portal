import {
  Card,
  Button,
  Icon,
  Tooltip,
  Typography,
} from "@equinor/eds-core-react";
import { add, delete_to_trash, edit } from "@equinor/eds-icons";
import { useAppModules } from "@equinor/fusion-framework-react-app";

import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Portal, PortalSideSheet } from "../components/PortalSideSheet";
import { EditPortal } from "../components/EditPortal";
import { tokens } from "@equinor/eds-tokens";

const Style = {
  Background: styled.div`
    background-color: ${tokens.colors.ui.background__light.hex};
    display: block;
    padding: 1rem;
    height: calc(100% - 96px);
  `,
  CardList: styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;
  `,
  Menu: styled.div`
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
  `,
};

export function Portals() {
  const client = useAppModules().http.createClient("portal-client");
  const [activePortal, setActivePortal] = useState<Portal | undefined>(
    undefined
  );
  const [editPortal, setEditPortal] = useState<Portal | undefined>(undefined);

  const { isLoading, error, data } = useQuery<Portal[]>(
    "portals",
    async () => await client.fetch("api/portals").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  return (
    <Style.Background>
      <PortalSideSheet
        activePortalId={editPortal?.id}
        onClose={() => {
          setEditPortal(undefined);
        }}
      />

      {activePortal ? (
        <EditPortal
          onClose={() => setActivePortal(undefined)}
          activePortal={activePortal}
        />
      ) : (
        <div>
          <Style.Menu>
            <Typography>
              Please select an existing portal to manage or create a new one.
            </Typography>
            <Button variant="ghost_icon">
              <Icon data={add}></Icon>
            </Button>
          </Style.Menu>

          <Style.CardList>
            {data?.map((item) => (
              <Style.Card
                key={item.id}
                onClick={() => {
                  setActivePortal(item);
                }}
              >
                <Card.Header>
                  <Card.HeaderTitle>
                    <h2>{item.name}</h2>
                  </Card.HeaderTitle>
                </Card.Header>
                <Card.Content>
                  <span>{item.shortName}</span>
                  <span>{item.subtext}</span>
                </Card.Content>
                <Card.Actions>
                  <Button variant="ghost_icon">
                    <Icon data={delete_to_trash} />
                  </Button>
                  <Button
                    variant="ghost_icon"
                    onClick={() => {
                      setEditPortal(item);
                    }}
                  >
                    <Icon data={edit} />
                  </Button>
                </Card.Actions>
              </Style.Card>
            ))}
          </Style.CardList>
        </div>
      )}
    </Style.Background>
  );
}
