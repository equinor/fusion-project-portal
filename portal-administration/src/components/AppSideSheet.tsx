import {
  Card,
  TextField,
  Autocomplete,
  Typography,
  Checkbox,
} from "@equinor/eds-core-react";

import { useAppModules } from "@equinor/fusion-framework-react-app";
import SideSheet from "@equinor/fusion-react-side-sheet";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Portal, PortalApp } from "../types";
import { useGetContextTypes } from "../hooks/use-context-type-query";

const Style = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  PadTop: styled(Typography)`
    padding-bottom: 1rem;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
  `,
};

export function AppSideSheet({
  app,
  onClose,
}: {
  app?: PortalApp;
  onClose: VoidFunction;
}) {
  const { data: contextTypes } = useGetContextTypes();
  console.log(app);
  if (!app) return null;
  return (
    <SideSheet
      isOpen={Boolean(app)}
      onClose={() => {
        onClose();
      }}
      isDismissable={true}
    >
      <SideSheet.Title title="Portal Application" />
      <SideSheet.SubTitle subTitle="Edit onboarded application information" />
      <SideSheet.Actions></SideSheet.Actions>
      <SideSheet.Content>
        <Style.Wrapper>
          <div>
            <Style.PadTop variant="h4">Context</Style.PadTop>
            <TextField
              id="app-name"
              readOnly
              value={app.name}
              label="App Name"
            ></TextField>
            <TextField
              id="app-name"
              readOnly
              value={app.appKey}
              label="AppKey"
            ></TextField>
            <TextField
              id="app-name"
              readOnly
              value={app.id}
              label="AppId"
            ></TextField>
            <Checkbox
              id="app-is-legacy"
              checked={app.isLegacy}
              label="Is Legacy"
            />
          </div>
          <div>
            <Style.PadTop variant="h4">Context Type</Style.PadTop>
            <Style.PadTop>
              This is the context types that the application supports
            </Style.PadTop>
            <Autocomplete
              id="app-context-types"
              multiple
              options={contextTypes || []}
              optionLabel={(contextTypes) => contextTypes.type}
              initialSelectedOptions={app.contexts}
              itemCompare={(item, compare) => {
                return item.type === compare.type;
              }}
              label="Context Types"
            />
          </div>
        </Style.Wrapper>
      </SideSheet.Content>
    </SideSheet>
  );
}
