import styled from "styled-components";
import { ClientGrid } from "@equinor/workspace-ag-grid";

import { useEditOnboardContext } from "../../hooks/use-onboarded-context";
import { OnboardedContext } from "../../types";
import { useState } from "react";

const Style = {
  Wrapper: styled.div`
    height: 100%;
    width: 100%;
  `,
};

export function OnboardedContextsTable({
  onboardedContexts,
}: {
  onboardedContexts?: OnboardedContext[];
}) {
  const { mutateAsync } = useEditOnboardContext();

  return (
    <Style.Wrapper>
      <ClientGrid<OnboardedContext>
        height={900}
        rowData={onboardedContexts || []}
        enableCellTextSelection
        ensureDomOrder
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 80,
          defaultMaxWidth: 300,
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
