import styled from "styled-components";
import {
  useEditOnboardContext,
  ussOnboardedContexts,
} from "../../hooks/use-onboarded-context";
import { OnboardedContext } from "../../types";
import { useState } from "react";
import { ClientGrid } from "@equinor/workspace-ag-grid";

const Style = {
  Wrapper: styled.div`
    height: 100%;
    width: 100%;
  `,
};

export function OnboardedContextsTable() {
  const { isLoading, error, data } = ussOnboardedContexts();
  const { mutateAsync } = useEditOnboardContext();
  const [selectedAContext, setSelectedContext] = useState<
    Partial<OnboardedContext> | undefined
  >();

  if (isLoading) return "Loading...";

  return (
    <Style.Wrapper>
      <ClientGrid<OnboardedContext>
        height={900}
        rowData={data || []}
        enableCellTextSelection
        ensureDomOrder
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 80,
          defaultMaxWidth: 300,
        }}
        onRowSelected={(event) => {
          setSelectedContext(event);
        }}
        onCellValueChanged={(event) => {
          if (event.data) mutateAsync(event.data);
        }}
        colDefs={[
          {
            field: "id",
            headerName: "Id",
            hide: true,
          },
          {
            field: "title",
            headerName: "Title",
          },
          {
            field: "contextId",
            headerName: "Context Id",
          },
          {
            field: "externalId",
            headerName: "External Context Id",
          },
          {
            field: "type",
            headerName: "Context Type",
          },
          {
            field: "description",
            headerName: "Description",
            editable: true,
          },
        ]}
      />
    </Style.Wrapper>
  );
}
