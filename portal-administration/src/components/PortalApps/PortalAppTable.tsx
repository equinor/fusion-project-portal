import styled from "styled-components";

import { Chip } from "@equinor/eds-core-react";

import { ClientGrid } from "@equinor/workspace-ag-grid";

import { useRef, useState } from "react";
import { tokens } from "@equinor/eds-tokens";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { useResizeObserver } from "../../hooks/use-resise-observer";
import { PortalApp, ContextType } from "../../types";
import { ActionBar } from "./ActionBar";

const Styles = {
  TableContent: styled.div`
    position: relative;
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
  Indicator: styled.span<{ active?: string }>`
    display: block;
    height: 16px;
    width: 16px;
    background-color: ${({ active }) =>
      active === "true"
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
        height={selectedApps.length === 0 ? height : height - 250}
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
                appKey: string;
              }>
            ) => {
              return (
                <Styles.CellWrapper key={`active-${params.context?.appKey}`}>
                  <Styles.Indicator
                    active={params.data?.isActive?.toString()}
                  />
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
                contextTypes: string[];
                appKey: string;
              }>
            ) => {
              return (
                <Styles.CellWrapper key={`contexts-${params.context?.appKey}`}>
                  {params?.data?.contextTypes?.map((type) => {
                    return (
                      <Styles.Chip variant="default" key={type}>
                        {type}
                      </Styles.Chip>
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
