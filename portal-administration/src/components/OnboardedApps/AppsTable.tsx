import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Button, Chip, Icon } from "@equinor/eds-core-react";
import { ClientGrid } from "@equinor/workspace-ag-grid";
import { useState } from "react";
import styled from "styled-components";
import {
  useDeleteOnboardedApp,
  useOnboardedApps,
} from "../../hooks/use-onboarded-apps";
import { PortalApp, ContextType } from "../../types";
import { AppSideSheet } from "./AppSideSheet";
import { Loading } from "../Loading";
import { delete_forever, delete_to_trash, edit } from "@equinor/eds-icons";

const Styles = {
  Wrapper: styled.div`
    padding: 0 1rem;
  `,
  CellWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  Chip: styled(Chip)`
    margin-top: 0.25rem;
    margin-right: 0.5rem;
  `,
};
export const AppsTable = () => {
  const { data, isLoading } = useOnboardedApps();
  const [selectedApp, setSelectedApp] = useState<PortalApp | undefined>();

  const { mutateAsync: deleteAppByAppKey } = useDeleteOnboardedApp();
  if (isLoading) return <Loading detail="Loading onboarded apps" />;

  if (!data) return <>No data provided</>;

  return (
    <Styles.Wrapper>
      <AppSideSheet
        app={selectedApp}
        onClose={() => {
          setSelectedApp(undefined);
        }}
      />

      <ClientGrid<PortalApp>
        height={window.innerHeight - 250}
        rowData={data}
        enableCellTextSelection
        ensureDomOrder
        rowHeight={36}
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 80,
          defaultMaxWidth: 300,
        }}
        colDefs={[
          {
            field: "id",
            headerName: "Id",
            hide: true,
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
          {
            field: "appKey",
            headerName: "Actions",
            cellRenderer: (params: CustomCellRendererProps<PortalApp>) => {
              return (
                <Styles.CellWrapper>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setSelectedApp(params.data);
                    }}
                  >
                    <Icon data={edit} size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const appKey = params.data?.appKey;
                      appKey && deleteAppByAppKey(appKey);
                    }}
                  >
                    <Icon data={delete_to_trash} size={16} />
                  </Button>
                </Styles.CellWrapper>
              );
            },
          },
        ]}
      />
    </Styles.Wrapper>
  );
};
