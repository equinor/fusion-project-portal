import styled from "styled-components";
import { PortalApp } from "../../types";
import { Button, Label, Typography } from "@equinor/eds-core-react";
import {
  useAddPortalApps,
  useRemovePortalApps,
} from "../../hooks/use-portal-apps";
import { usePortalContext } from "../../context/PortalContext";

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
  if (selection.length === 0) return null;

  const { mutateAsync: addApps } = useAddPortalApps(activePortalId);
  const { mutateAsync: removeApps } = useRemovePortalApps(activePortalId);

  return (
    <Styles.Wrapper>
      <Styles.Content>
        <Styles.Actions>
          {Boolean(selection.find((a) => !a.isActive)) && (
            <Button
              variant="outlined"
              onClick={() => {
                addApps(selection.filter((a) => !a.isActive));
              }}
            >
              Add Selected
            </Button>
          )}
          {Boolean(selection.find((a) => a.isActive)) && (
            <Button
              variant="outlined"
              onClick={() => {
                removeApps(selection.filter((a) => a.isActive));
              }}
            >
              Remove Selected
            </Button>
          )}
          {Boolean(selection.find((a) => !a.isActive)) && (
            <Button variant="outlined">Add Selected with Context</Button>
          )}
        </Styles.Actions>
        <Typography variant="h6">
          Selected applications ({selection.length})
        </Typography>
      </Styles.Content>
    </Styles.Wrapper>
  );
};
