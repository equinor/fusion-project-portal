import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import { CreatePortalForm } from "../components/CreatePortalForm";

const Style = {
  Background: styled.div`
    background-color: ${tokens.colors.ui.background__light.hex};
    display: block;
    padding: 1rem;
    height: calc(100% - 96px);
  `,
};
export const CreatePortal = ({ onClose }: { onClose: VoidFunction }) => {
  return (
    <Style.Background>
      <CreatePortalForm onClose={onClose} />
    </Style.Background>
  );
};
