import styled from "styled-components";
import { ClientGrid } from "@equinor/workspace-ag-grid";
import { Portal } from "../../types";
import { useNavigate } from "react-router-dom";

const Style = {
  Wrapper: styled.div``,
};

export function PortalTable({ portalsData }: { portalsData?: Portal[] }) {
  const navigate = useNavigate();
  return (
    <ClientGrid<Portal>
      height={window.innerHeight - 200}
      rowData={portalsData || []}
      enableCellTextSelection
      ensureDomOrder
      autoSizeStrategy={{
        type: "fitGridWidth",
        defaultMinWidth: 80,
        defaultMaxWidth: 300,
      }}
      onRowClicked={(event) => {
        navigate(`/portals/${event.data?.id}/overview`);
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
      ]}
    />
  );
}
