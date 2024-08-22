import styled from "styled-components";
import { ClientGrid } from "@equinor/workspace-ag-grid";
import { Portal } from "../../types";
import { useNavigate } from "react-router-dom";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Button, Chip, Icon } from "@equinor/eds-core-react";
import { edit, delete_to_trash } from "@equinor/eds-icons";

const Styles = {
  Wrapper: styled.div``,

  CellWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  Chip: styled(Chip)`
    margin-top: 0.5rem;
  `,
};

export function PortalTable({ portalsData }: { portalsData?: Portal[] }) {
  const navigate = useNavigate();
  return (
    <ClientGrid<Portal>
      height={window.innerHeight - 200}
      rowData={portalsData || []}
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
          onCellClicked: (event) => {
            navigate(`/portals/${event.data?.id}/overview`);
          },
        },
        {
          field: "subtext",
          headerName: "Sub Text",
        },
        {
          field: "shortName",
          headerName: "Short Name",
        },
        {
          field: "description",
          headerName: "Description",
        },
        {
          field: "id",
          headerName: "Actions",
          cellRenderer: (params: CustomCellRendererProps<Portal>) => {
            return (
              <Styles.CellWrapper>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    navigate(`/portals/${params.data?.id}/overview`);
                  }}
                >
                  <Icon data={edit} size={16} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
  );
}
