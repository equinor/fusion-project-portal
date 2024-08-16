import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Chip, Typography } from "@equinor/eds-core-react";
import { ClientGrid } from "@equinor/workspace-ag-grid";
import { useState } from "react";
import styled from "styled-components";
import { useOnboardedApps } from "../../hooks/use-onboarded-apps";
import { PortalApp, ContextType } from "../../types";
import { AppSideSheet } from "./AppSideSheet";

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
  CellWrapper: styled.div`
    display: flex;
    gap: 0.5rem;
  `,
  Chip: styled(Chip)`
    margin-top: 3px;
  `,
};
export const AppsTable = () => {
  const { data, isLoading } = useOnboardedApps();
  const [selectedApp, setSelectedApp] = useState<PortalApp | undefined>();
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
            setSelectedApp(event.data);
          }}
          colDefs={[
            {
              field: "id",
              headerName: "Id",
            },
            {
              field: "name",
              headerName: "Name",
            },
            {
              field: "appKey",
              headerName: "App Key",
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
