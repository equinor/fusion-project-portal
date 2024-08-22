import styled from "styled-components";

import { Chip } from "@equinor/eds-core-react";

import { ClientGrid } from "@equinor/workspace-ag-grid";

import { useEffect, useRef, useState } from "react";
import { tokens } from "@equinor/eds-tokens";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { useResizeObserver } from "../../hooks/use-resise-observer";
import { PortalApp, ContextType } from "../../types";
import { ActionBar } from "./ActionBar";

const Styles = {
  Content: styled.div`
    width: 100%;
    gap: 1rem;
    padding: 1rem;
    position: relative;
  `,
  TableContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  CellWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 36px;
  `,

  Chip: styled(Chip)`
    margin-top: 3px;
  `,
  Indicator: styled.span<{ active?: boolean | undefined }>`
    display: block;
    height: 16px;
    width: 16px;
    background-color: ${({ active }) =>
      active
        ? tokens.colors.interactive.success__resting.hex
        : tokens.colors.interactive.disabled__fill.hex};
    border-radius: 50%;
  `,
};

export const PortalAppTable = ({ portalApps }: { portalApps: PortalApp[] }) => {
  const ref = useRef(null);
  const [_, height] = useResizeObserver(ref);
  const [selectedApps, setSelectedApps] = useState<PortalApp[]>([]);

  return (
    <Styles.TableContent ref={ref}>
      <ClientGrid<PortalApp>
        height={selectedApps.length === 0 ? height : height - 150}
        rowData={portalApps}
        enableCellTextSelection
        ensureDomOrder
        rowSelection="multiple"
        rowHeight={36}
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 80,
          defaultMaxWidth: 300,
        }}
        onRowSelected={(event) => {
          const selectedRows = event.api!.getSelectedRows();

          setSelectedApps(selectedRows);
        }}
        colDefs={[
          {
            field: "isActive",
            headerName: "Is Active",
            width: 80,
            cellRenderer: (
              params: CustomCellRendererProps<{
                isActive?: boolean;
                id: string;
              }>
            ) => {
              return (
                <Styles.CellWrapper key={`active-${params.data?.id}`}>
                  <Styles.Indicator active={params.data?.isActive} />
                </Styles.CellWrapper>
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
              params: CustomCellRendererProps<{
                contexts: ContextType[];
                id: string;
              }>
            ) => {
              return (
                <Styles.CellWrapper key={params.data?.id}>
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

      <ActionBar selection={selectedApps} />
    </Styles.TableContent>
  );
};
