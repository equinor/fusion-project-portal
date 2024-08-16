import styled from "styled-components";

import { Header } from "../components/Header";
import { Chip, SideSheet, Typography } from "@equinor/eds-core-react";
import { AppsList } from "../components/OnboardedApps/AppsList";
import { useParams } from "react-router-dom";
import { useGetPortalApps } from "../hooks/use-portal-apps";
import { ClientGrid } from "@equinor/workspace-ag-grid";

import { useResizeObserver } from "../hooks/use-resise-observer";
import { useRef, useState } from "react";
import { tokens } from "@equinor/eds-tokens";
import { AppSideSheet } from "../components/OnboardedApps/AppSideSheet";
import { AppManifestResponse, ContextType, PortalApp } from "../types";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { RowSelectedEvent } from "@ag-grid-community/core";

const Styles = {
  Content: styled.div`
    width: 100%;
    display: grid;

    gap: 1rem;
  `,

  Wrapper: styled.div`
    height: 100%;
    width: 100%;
  `,
  Chip: styled(Chip)`
    margin-top: 3px;
  `,
};
export const PortalApps = () => {
  const { portalId } = useParams();

  const ref = useRef(null);
  const [_, height] = useResizeObserver(ref);
  const { data, isLoading } = useGetPortalApps(portalId);
  const [selectedApp, setSelectedApp] = useState<
    Partial<PortalApp> | undefined
  >();
  if (!portalId) {
    return <>No portalId provided</>;
  }
  if (isLoading) {
    return <>Loading....</>;
  }

  if (!data) return <>No data provided</>;

  return (
    <Styles.Wrapper>
      <AppSideSheet
        app={selectedApp}
        onClose={() => {
          setSelectedApp(undefined);
        }}
      />
      <Styles.Content ref={ref}>
        <Typography variant="h4">Portal Apps</Typography>
        <ClientGrid<AppManifestResponse>
          height={700}
          rowData={data}
          enableCellTextSelection
          ensureDomOrder
          autoSizeStrategy={{
            type: "fitGridWidth",
            defaultMinWidth: 80,
            defaultMaxWidth: 300,
          }}
          onRowSelected={(event) => {
            setSelectedApp({
              appKey: event.data?.key || "",
              id: "-",
              name: event.data?.appManifest.name,
              contexts: event.data?.contextTypes || [],
            });
          }}
          colDefs={[
            {
              field: "appManifest.key",
              headerName: "Application key",
            },
            {
              field: "appManifest.version",
              headerName: "Version",
            },
            {
              field: "appManifest.name",
              headerName: "Name",
            },
            {
              field: "appManifest.description",
              headerName: "Description",
            },
            {
              field: "appManifest.category.name",
              headerName: "Category",
            },
            {
              field: "contextTypes",
              headerName: "Contexts Types",
              cellRenderer: (
                params: CustomCellRendererProps<{ contextTypes: ContextType[] }>
              ) => {
                return (
                  <>
                    {params?.data?.contextTypes?.map((ct) => {
                      return (
                        <Styles.Chip variant="default">{ct.type}</Styles.Chip>
                      );
                    })}
                  </>
                );
              },
            },
          ]}
        />
      </Styles.Content>
    </Styles.Wrapper>
  );
};
