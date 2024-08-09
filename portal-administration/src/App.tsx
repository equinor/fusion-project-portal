import {
  Button,
  Card,
  Icon,
  Table,
  Tabs,
  Typography,
} from "@equinor/eds-core-react";
import { add, check, delete_to_trash, edit, home } from "@equinor/eds-icons";
import { useAppModules } from "@equinor/fusion-framework-react-app";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import styled from "styled-components";
import { Portals } from "./pages/Portal";

const queryClient = new QueryClient();

const Style = {
  Padding: styled.div`
    padding: 1rem;
  `,
  Wrapper: styled.div`
    height: 100%;
  `,

  CardList: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
  `,
};

export default function () {
  return (
    <QueryClientProvider client={queryClient}>
      <Style.Wrapper>
        <Style.Padding>
          <Typography variant="h4">Portal Administration</Typography>
        </Style.Padding>
         <Portals />
      </Style.Wrapper>
    </QueryClientProvider>
  );
}

function Contexts() {
  const client = useAppModules().http.createClient("portal-client");

  const { isLoading, error, data } = useQuery<
    {
      title: string;
      id: string;
      externalId: string;
      type: string;
      description: string;
    }[]
  >(
    "onboarded-contexts",
    async () =>
      await client.fetch("api/onboarded-contexts").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  return (
    <Style.CardList>
      {data?.map((item) => (
        <Style.Card key={item.id}>
          <Card.Header>
            <Card.HeaderTitle>
              <h3>{item.title}</h3>
            </Card.HeaderTitle>
            <strong>{item.type}</strong>
          </Card.Header>
          <Card.Content>
            <p>{item.externalId}</p>
            <br></br>
            <strong>{item.description}</strong>
          </Card.Content>
        </Style.Card>
      ))}
    </Style.CardList>
  );
}

function Apps() {
  const client = useAppModules().http.createClient("portal-client");

  const { isLoading, error, data } = useQuery<
    {
      name: string;
      id: string;
      appKey: string;
      isLegacy: boolean;
      description: string;
    }[]
  >(
    "onboarded-app",
    async () =>
      await client.fetch("api/onboarded-apps").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  return (
    <Style.CardList>
      {data?.map((item) => (
        <Style.Card key={item.id} col={4}>
          <Card.Header>
            <Card.HeaderTitle>
              <h3>{item.name}</h3>
            </Card.HeaderTitle>
            <p>{item.appKey}</p>
          </Card.Header>
          <Card.Content>
            <span>Is Legacy:{item.isLegacy ? "true" : "false"}</span>
            <br></br>
            <strong>{item.description}</strong>
          </Card.Content>
        </Style.Card>
      ))}
    </Style.CardList>
  );
}

function ContextAppsMatrix() {
  const client = useAppModules().http.createClient("portal-client");

  const {
    isLoading,
    error,
    data: contexts,
  } = useQuery<
    {
      title: string;
      id: string;
      externalId: string;
      type: string;
      description: string;
    }[]
  >(
    "onboarded-contexts",
    async () =>
      await client.fetch("api/onboarded-contexts").then((res) => res.json())
  );

  const {
    isLoading: isAppLoading,
    error: appsError,
    data: apps,
  } = useQuery<
    {
      name: string;
      id: string;
      appKey: string;
      isLegacy: boolean;
      description: string;
    }[]
  >(
    "onboarded-app",
    async () =>
      await client.fetch("api/onboarded-apps").then((res) => res.json())
  );

  const { data: matrix } = useQuery(
    "onboarded-apps-matrix",
    async () => {
      const appsMatrix = await Promise.all(
        (contexts ? contexts : []).map(
          async (context) =>
            await client
              .fetch(
                `api/portals/0177ef5f-c49e-4d2a-7907-08db31e4e851/contexts/${context.externalId}/apps`
              )
              .then((res) => res.json())
              .then((appGroups) => appGroups.map((g: any) => g.apps).flat())
        )
      );

      return (contexts ? contexts : []).map((contexts, i) => ({
        contexts,
        apps: appsMatrix[i],
      }));
    },
    {
      enabled: Boolean(contexts) && Boolean(apps),
    }
  );

  const table = useMemo(() => {
    return (
      matrix?.map((m) => {
        const contextEntry: Record<string, any> = {
          contextName: m.contexts.title,
        };

        apps?.forEach((app) => {
          contextEntry[app.appKey] = Boolean(
            m.apps.find((a: any) => a.appKey === app.appKey)
          );
        });
        return contextEntry;
      }) || []
    );
  }, [matrix, apps]);

  useEffect(() => {
    console.table(table);
  }, [table]);

  if (isAppLoading) return "Loading...";

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          {table.length > 0 &&
            Object.keys(table[0]).map((key) => (
              <Table.Cell key={key}>{key}</Table.Cell>
            ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {table.map((row) => (
          <Table.Row key={row.contextName}>
            {Object.keys(row).map((i) => (
              <Table.Cell key={i}>
                {typeof row[i] === "string" ? (
                  row[i]
                ) : row[i] ? (
                  <Icon data={check} />
                ) : (
                  "-"
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
