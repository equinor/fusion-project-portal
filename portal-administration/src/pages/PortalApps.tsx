import styled from "styled-components";

import { Checkbox, Chip, Typography } from "@equinor/eds-core-react";
import { useParams } from "react-router-dom";

import { ClientGrid } from "@equinor/workspace-ag-grid";

import { useState } from "react";

import { AppSideSheet } from "../components/OnboardedApps/AppSideSheet";
import { ContextType, PortalApp } from "../types";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { useOnboardApps } from "../hooks/use-onboard-apps";

const Styles = {
  Content: styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
  `,
  CellWrapper: styled.div`
    display: flex;
    gap: 0.5rem;
  `,
  Wrapper: styled.div`
    height: 100%;
    width: 100%;
  `,
  Chip: styled(Chip)`
    margin-top: 3px;
  `,
  Checkbox: styled(Checkbox)`
    margin: 0;
    padding: 0;
    > * {
      padding: 2px;
    }
  `,
};

export const PortalApps = () => {
  const { portalId } = useParams();

  const { data, isLoading } = useOnboardApps(portalId);
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
      <Styles.Content>
        <Typography variant="h4">Portal Apps</Typography>
        <ClientGrid<PortalApp>
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
              appKey: event.data?.appKey || "",
              id: "-",
              name: event.data?.name,
              contexts: event.data?.contexts || [],
            });
          }}
          colDefs={[
            {
              field: "isActive",
              headerName: "Is Active",
              width: 80,
              cellRenderer: (
                params: CustomCellRendererProps<{ isActive?: Boolean }>
              ) => {
                return (
                  <Styles.Checkbox
                    checked={Boolean(params.data?.isActive)}
                  ></Styles.Checkbox>
                );
              },
            },
            {
              field: "appKey",
              headerName: "Application key",
            },

            {
              field: "name",
              headerName: "Name",
            },
            {
              field: "description",
              headerName: "Description",
            },
            {
              field: "contexts",
              headerName: "Contexts Types",
              cellRenderer: (
                params: CustomCellRendererProps<{ contexts: ContextType[] }>
              ) => {
                return (
                  <Styles.CellWrapper>
                    {params?.data?.contexts?.map((ct) => {
                      return (
                        <Styles.Chip variant="default">{ct.type}</Styles.Chip>
                      );
                    })}
                  </Styles.CellWrapper>
                );
              },
            },
          ]}
        />
      </Styles.Content>
    </Styles.Wrapper>
  );
};
