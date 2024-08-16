import { Card, Button, Icon, Typography } from "@equinor/eds-core-react";
import { add, delete_to_trash, edit } from "@equinor/eds-icons";
import { useAppModules } from "@equinor/fusion-framework-react-app";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { PortalSideSheet } from "../components/PortalSideSheet";

import { Portal } from "../types";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { usePortalContext } from "../context/PortalContext";

const Style = {
  Content: styled.div`
    padding: 1rem;
  `,
  CardList: styled.div`
    padding-top: 1rem;
    display: flex;

    flex-wrap: wrap;
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
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 10rem)`};
  `,
};

export const Portals = () => {
  const client = useAppModules().http.createClient("portal-client");

  const { setActivePortalById, activePortalId } = usePortalContext();

  const { isLoading, data } = useQuery<Portal[]>({
    queryKey: ["portals"],
    queryFn: async () =>
      await client.fetch("api/portals").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  return (
    <>
      <Header title="Portals" />
      <Style.Content>
        <div>
          <Style.Menu>
            <Typography>
              Please select an existing portal to manage or create a new one.
            </Typography>

            <Button as={Link} to={"new"} variant="ghost_icon">
              <Icon data={add}></Icon>
            </Button>
          </Style.Menu>

          <Style.CardList>
            {data?.map((item) => (
              <Style.Card key={item.id}>
                <Card.Header>
                  <Card.HeaderTitle>
                    <Typography
                      variant="h3"
                      color={item.id === activePortalId ? "Green" : ""}
                    >
                      {item.name}
                    </Typography>
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
                    as={Link}
                    to={`portal/${item.id}/overview`}
                    variant="ghost_icon"
                    onClick={() => {
                      setActivePortalById(item.id);
                    }}
                  >
                    <Icon data={edit} />
                  </Button>
                </Card.Actions>
              </Style.Card>
            ))}
          </Style.CardList>
        </div>
      </Style.Content>
    </>
  );
};
