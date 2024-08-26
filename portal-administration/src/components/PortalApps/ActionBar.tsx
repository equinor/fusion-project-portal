import styled from "styled-components";
import { PortalApp } from "../../types";
import { Button, Icon, Label, Typography } from "@equinor/eds-core-react";
import {
  useAddPortalApps,
  useRemovePortalApps,
} from "../../hooks/use-portal-apps";
import { usePortalContext } from "../../context/PortalContext";
import { add_circle_filled, edit, remove_outlined } from "@equinor/eds-icons";
import { ContextAppSideSheet } from "./ContextAppSideSheet";
import { useState } from "react";

const Styles = {
  Wrapper: styled.div`
    width: 100%;
    height: 150px;
    background-color: #fff;
    position: relative;
    flex: 1;
  `,
  Content: styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    height: min-content;
  `,
  Actions: styled.div`
    display: flex;
    gap: 1rem;
  `,
};

export const ActionBar = ({ selection }: { selection: PortalApp[] }) => {
  const { activePortalId } = usePortalContext();

  const { mutateAsync: addApps } = useAddPortalApps(activePortalId);
  const { mutateAsync: removeApps } = useRemovePortalApps(activePortalId);
  const [isOpen, setIsOpen] = useState(false);

  if (selection.length === 0) return null;
  return (
    <Styles.Wrapper>
      <ContextAppSideSheet
        onClose={() => {
          setIsOpen(false);
        }}
        selection={selection}
        isOpen={isOpen}
      />
      <Styles.Content>
        <Styles.Actions>
          {Boolean(selection.find((a) => !a.isActive)) && (
            <Button
              id="add-selected"
              variant="ghost"
              onClick={() => {
                addApps(selection.filter((a) => !a.isActive));
              }}
            >
              <Icon data={add_circle_filled} /> Activate Selected
            </Button>
          )}
          {Boolean(selection.find((a) => !a.isActive)) && (
            <Button
              id="add-selected-with-context"
              variant="ghost"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Icon data={add_circle_filled} /> Activate Selected with Context
            </Button>
          )}
          {Boolean(selection.find((a) => a.isActive)) && (
            <Button
              id="edit-selected"
              variant="ghost"
              onClick={() => {
                removeApps(selection.filter((a) => a.isActive));
              }}
            >
              <Icon data={edit} /> Edit Selected (
              {selection.filter((a) => a.isActive).length})
            </Button>
          )}
          {Boolean(selection.find((a) => a.isActive)) && (
            <Button
              id="remove-selected"
              variant="ghost"
              onClick={() => {
                removeApps(selection.filter((a) => a.isActive));
              }}
            >
              <Icon data={remove_outlined} /> Remove Selected
            </Button>
          )}
        </Styles.Actions>
        <Typography variant="h6">
          Selected applications ({selection.length})
        </Typography>
      </Styles.Content>
    </Styles.Wrapper>
  );
};
